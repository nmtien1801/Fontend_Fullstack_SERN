import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { toast } from "react-toastify";
import _ from "lodash"; // react hook not merge state
import { fetchGroup, getAllCode } from "../../../services/userService";
import { LANGUAGE } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

let validInputsDefault = {
  email: true,
  phone: true,
  userName: true,
  password: true,
  address: true,
  sex: true,
  groupID: true,
  position: true,
  role: true,
  avatar: true,
};

let defaultUserData = {
  email: "",
  phone: "",
  userName: "",
  password: "", //passWord
  address: "",
  sex: "",
  groupID: "",
  position: "",
  role: "",
  avatar: "",
};

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: defaultUserData,
      validInput: validInputsDefault,
      userGroup: [],
      genderArr: [],
      roleArr: [],
      positionArr: [],
    };
  }

  componentDidMount() {
    this.props.getGenderStart();
    this.props.getRoleStart();
    this.props.getPositionStart();

    try {
      this.getGroup();
    } catch (error) {
      console.log("error user redux: ", error);
    }
  }

  // did update: so sánh hiện tại và trước đó
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: arrGender,
        userData:
          arrGender && arrGender.length > 0
            ? { ...this.state.userData, sex: arrGender[0].key }
            : { ...this.state.userData },
      });
    }

    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        userData:
          arrPosition && arrPosition.length > 0
            ? { ...this.state.userData, position: arrPosition[0].key }
            : { ...this.state.userData },
      });
    }

    if (prevProps.RoleRedux !== this.props.RoleRedux) {
      let arrRole = this.props.RoleRedux;
      this.setState({
        roleArr: arrRole,
        userData:
          arrRole && arrRole.length > 0
            ? { ...this.state.userData, role: arrRole[0].key }
            : { ...this.state.userData },
      });
    }
  }

  checkValidInput = () => {
    this.setState({ validInput: validInputsDefault });
    let arr = ["email", "phone", "password", "groupID"];
    let check = true;
    let regexEmail = /\S+@\S+\.\S+/;
    let regexPhone = /0([0-9]{9})/;
    let regexPassword = /^.{4,}$}/;
    for (let i = 0; i < arr.length; i++) {
      if (!this.state.userData[arr[i]]) {
        let _validInput = _.cloneDeep(validInputsDefault);
        _validInput[arr[i]] = false;
        this.setState({ validInput: _validInput });

        toast.error(`empty input ${arr[i]}`);
        check = false;
        break;
      }

      if (!regexEmail.test(this.state.userData["email"])) {
        let _validInput = _.cloneDeep(validInputsDefault);
        _validInput["email"] = false;
        this.setState({ validInput: _validInput });

        toast.error(`regexEmail error ${"email"}`);
        check = false;
        break;
      }

      if (!regexPhone.test(this.state.userData["phone"])) {
        let _validInput = _.cloneDeep(validInputsDefault);
        _validInput["phone"] = false;
        this.setState({ validInput: _validInput });

        toast.error(`regexPhone error ${"phone"}`);
        check = false;
        break;
      }
    }
    return check;
  };

  getGroup = async () => {
    let res = await fetchGroup();
    if (res && res.EC === 0) {
      this.setState({ userGroup: res.DT });

      // gán mặc định group là select đầu tiên và kiểu là id cho trùng db
      if (res.DT && res.DT.length > 0) {
        let defaultGroup = res.DT;
        this.setState({
          userData: { ...this.state.userData, groupID: defaultGroup[0].id },
        });
      }
    } else {
      toast.error(res.EM);
    }
  };

  handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(this.state.userData); // sao chép lại userData
    _userData[name] = value;

    this.setState({
      userData: _userData,
    });
  };

  handleOnChangeImage = (event) => {
    let data = event;
    let file = data[0];
    if (file) {
      let objectURL = URL.createObjectURL(file);
      this.setState({
        userData: { ...this.state.userData, avatar: objectURL },
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.userData.avatar) return;
    this.setState({ isOpen: true });
  };

  handleSaveUser = () => {
    let valid = this.checkValidInput();
    if (valid) {
      let { userData } = this.state;
      this.props.createNewUser(userData);
    }
  };

  render() {
    let { validInput, userData, userGroup, genderArr, roleArr, positionArr } =
      this.state;
    let { language, genderRedux, RoleRedux, positionRedux } = this.props;
    return (
      <div className="user-redux-container">
        <div className="title">user redux</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="content-body row ">
              <div className="col-12">
                <FormattedMessage id="manage-user.add"></FormattedMessage>
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  <FormattedMessage id="manage-user.email"></FormattedMessage>(
                  <span className="red">*</span>)
                </label>
                <input
                  className={
                    validInput.email
                      ? "form-control "
                      : "form-control is-invalid"
                  }
                  type="email"
                  value={userData.email}
                  onChange={(event) => {
                    this.handleOnChangeInput(event.target.value, "email");
                  }}
                />
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  <FormattedMessage id="manage-user.phone"></FormattedMessage>(
                  <span className="red">*</span>)
                </label>
                <input
                  className={
                    validInput.phone
                      ? "form-control "
                      : "form-control is-invalid"
                  }
                  type="text"
                  value={userData.phone}
                  onChange={(event) => {
                    this.handleOnChangeInput(event.target.value, "phone");
                  }}
                />
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  <FormattedMessage id="manage-user.userName"></FormattedMessage>
                  (<span className="red">*</span>)
                </label>
                <input
                  className={
                    validInput.userName
                      ? "form-control "
                      : "form-control is-invalid"
                  }
                  type="text"
                  value={userData.userName}
                  onChange={(event) => {
                    this.handleOnChangeInput(event.target.value, "userName");
                  }}
                />
              </div>
              <div className="col-12 col-sm-6 form-group">
                <>
                  <label>
                    <FormattedMessage id="manage-user.password"></FormattedMessage>{" "}
                    (<span className="red">*</span>)
                  </label>
                  <input
                    className={
                      validInput.password
                        ? "form-control "
                        : "form-control is-invalid"
                    }
                    type="password"
                    value={userData.password}
                    onChange={(event) => {
                      this.handleOnChangeInput(event.target.value, "password");
                    }}
                  />
                </>
              </div>
              <div className="col-12 col-sm-12 form-group">
                <label>
                  <FormattedMessage id="manage-user.address"></FormattedMessage>
                </label>
                <input
                  className={
                    validInput.address
                      ? "form-control "
                      : "form-control is-invalid"
                  }
                  type="text"
                  value={userData.address}
                  onChange={(event) => {
                    this.handleOnChangeInput(event.target.value, "address");
                  }}
                />
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label htmlFor="GenderSelect">
                  <FormattedMessage id="manage-user.gender"></FormattedMessage>
                </label>
                <select
                  id="GenderSelect"
                  className="form-select"
                  value={userData.sex}
                  onChange={(event) => {
                    this.handleOnChangeInput(event.target.value, "sex");
                  }}
                >
                  {genderArr &&
                    genderArr.length > 0 &&
                    genderArr.map((item, index) => {
                      return (
                        <option key={`gender-${index}`} value={item.key}>
                          {language === LANGUAGE.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label htmlFor="GroupSelect">
                  <FormattedMessage id="manage-user.group"></FormattedMessage> (
                  <span className="red">*</span>)
                </label>
                <select
                  id="GroupSelect"
                  className={
                    validInput.groupID
                      ? "form-select"
                      : "form-select is-invalid"
                  }
                  value={userData.groupID}
                  onChange={(event) => {
                    this.handleOnChangeInput(event.target.value, "groupID");
                  }}
                >
                  {userGroup &&
                    userGroup.length > 0 &&
                    userGroup.map((item, index) => {
                      return (
                        <option key={`group-${index}`} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 col-sm-4 form-group">
                <label htmlFor="PositionSelect">
                  <FormattedMessage id="manage-user.position"></FormattedMessage>
                </label>
                <select
                  id="PositionSelect"
                  className="form-select"
                  value={userData.position}
                  onChange={(event) => {
                    this.handleOnChangeInput(event.target.value, "position");
                  }}
                >
                  {positionArr &&
                    positionArr.length > 0 &&
                    positionArr.map((item, index) => {
                      return (
                        <option key={`position-${index}`} value={item.key}>
                          {language === LANGUAGE.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 col-sm-4 form-group">
                <label htmlFor="RoleIDSelect">
                  <FormattedMessage id="manage-user.role"></FormattedMessage>
                </label>
                <select
                  id="RoleIDSelect"
                  className="form-select"
                  value={userData.role}
                  onChange={(event) => {
                    this.handleOnChangeInput(event.target.value, "role");
                  }}
                >
                  {roleArr &&
                    roleArr.length > 0 &&
                    roleArr.map((item, index) => {
                      return (
                        <option key={`role-${index}`} value={item.key}>
                          {language === LANGUAGE.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 col-sm-4 form-group">
                <label>
                  <FormattedMessage id="manage-user.image"></FormattedMessage>
                </label>
                <div className="preview-img-container">
                  <input
                    id="preview-img"
                    hidden
                    // className={
                    //   validInput.avatar
                    //     ? "form-control "
                    //     : "form-control is-invalid"
                    // }
                    type="file"
                    // value={userData.avatar}
                    onChange={(event) => {
                      this.handleOnChangeImage(event.target.files);
                    }}
                  />

                  <label
                    className="label-upload btn btn-secondary"
                    htmlFor="preview-img"
                  >
                    Tải ảnh
                    <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.userData.avatar})`,
                    }}
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>
              <div className="col-12 col-sm-12">
                <button
                  className="btn btn-primary mt-1"
                  onClick={() => {
                    this.handleSaveUser();
                  }}
                >
                  <FormattedMessage id="manage-user.save"></FormattedMessage>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* thư viện phóng to ảnh chọn khi click vào */}
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.userData.avatar}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    RoleRedux: state.admin.roles,
    positionRedux: state.admin.position,

    isLoadingGender: state.admin.isLoadingGender,
    isLoadingRoles: state.admin.isLoadingRoles,
    isLoadingPosition: state.admin.isLoadingPosition,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changeLanguageApp: (language) => dispatch(actions.changeLanguage(language)),
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    createNewUser: (user) => dispatch(actions.createNewUserRedux(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
