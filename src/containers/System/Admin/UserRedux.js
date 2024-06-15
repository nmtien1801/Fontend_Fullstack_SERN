import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { toast } from "react-toastify";
import _ from "lodash"; // react hook not merge state
import { fetchGroup, getAllCode } from "../../../services/userService";
import { LANGUAGE } from "../../../utils";
import * as actions from "../../../store/actions";

let validInputsDefault = {
  email: true,
  phone: true,
  userName: true,
  password: true,
  address: true,
  sex: true,
  group: true,
};

let defaultUserData = {
  email: "",
  phone: "",
  userName: "",
  password: "", //passWord
  address: "",
  sex: "",
  groupID: "",
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
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }

    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        positionArr: this.props.positionRedux,
      });
    }

    if (prevProps.RoleRedux !== this.props.RoleRedux) {
      this.setState({
        roleArr: this.props.RoleRedux,
      });
    }
  }

  checkValidInput = () => {
    // update user
    // if (props.action === "UPDATE") return true;
    // create user
    this.setState({ validInput: validInputsDefault });
    let arr = ["email", "phone", "password", "group"];
    let check = true;
    let regexEmail = /\S+@\S+\.\S+/;
    let regexPhone = /0([0-9]{9})/;
    let regexPassword = /^.{4,}$}/;
    for (let i = 0; i < arr.length; i++) {
      if (!this.userData[arr[i]]) {
        let _validInput = _.cloneDeep(validInputsDefault);
        _validInput[arr[i]] = false;
        this.setState({ validInput: _validInput });

        toast.error(`empty input ${arr[i]}`);
        check = false;
        break;
      }
      if (!regexEmail.test(this.userData["email"])) {
        let _validInput = _.cloneDeep(validInputsDefault);
        _validInput["email"] = false;
        this.setState({ validInput: _validInput });

        toast.error(`regexEmail error ${"email"}`);
        check = false;
        break;
      }
      if (!regexPhone.test(this.userData["phone"])) {
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
          userData: { ...defaultUserData, groupID: defaultGroup[0].id },
        });
      }
    } else {
      toast.error(res.EM);
    }
  };

  handleOnChangeInput(value, name) {
    let _userData = _.cloneDeep(this.state.userData); // sao chép lại userData
    _userData[name] = value;

    this.setState({
      userData: _userData,
    });
  }

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
                  type="number"
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
                        <option
                          key={`gender-${index}`}
                          value={
                            language === LANGUAGE.VI
                              ? item.valueVi
                              : item.valueEn
                          }
                        >
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
                    validInput.group ? "form-select" : "form-select is-invalid"
                  }
                  value={userData.group}
                  onChange={(event) => {
                    this.handleOnChangeInput(event.target.value, "group");
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
                        <option
                          key={`position-${index}`}
                          value={
                            language === LANGUAGE.VI
                              ? item.valueVi
                              : item.valueEn
                          }
                        >
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
                  {" "}
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
                        <option
                          key={`role-${index}`}
                          value={
                            language === LANGUAGE.VI
                              ? item.valueVi
                              : item.valueEn
                          }
                        >
                          {language === LANGUAGE.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                  {/* <option defaultValue={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                  <option value={"Other"}>Other</option> */}
                </select>
              </div>
              <div className="col-4 col-sm-4 form-group">
                <label>
                  <FormattedMessage id="manage-user.image"></FormattedMessage>
                </label>
                <input
                  className={
                    validInput.address
                      ? "form-control "
                      : "form-control is-invalid"
                  }
                  type="text"
                  value={userData.image}
                  onChange={(event) => {
                    this.handleOnChangeInput(event.target.value, "image");
                  }}
                />
              </div>
              <div className="col-12 col-sm-12">
                <button className="btn btn-primary">
                  <FormattedMessage id="manage-user.save"></FormattedMessage>
                </button>
              </div>
            </div>
          </div>
        </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
