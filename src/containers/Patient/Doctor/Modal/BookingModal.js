import React, { Component } from "react";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { LANGUAGE } from "../../../../utils/constant";
import "./BookingModal.scss";
import { Modal, Button, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import moment from "moment"; // format ngày tháng năm
import Select from "react-select";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      genders: "", // chọn giới tính -> vì là choonse select nên cần {label và value}
      selectedGender: "", // lưu giới tính chọn
      doctorID: "",
      timeType: "",
    };
  }

  handleOnChange = (e, type) => {
    let value = e.target.value;
    let stateCopy = { ...this.state };
    stateCopy[type] = value; // tạo biến lưu lại state
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({ birthday: date[0] });
  };

  // giới tính
  // vì là select nên cần built -> label và value
  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGE.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  handleConformBooking = async () => {
    let date = new Date(this.state.birthday).getTime(); // ngày -> fortmat 32566033 để
    let res = await postPatientBookAppointment({
      doctorID: this.state.doctorID,
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      selectedGender: this.state.selectedGender.value,
      timeType: this.state.timeType,
    });

    if (res && res.EC === 0) {
      toast.success(res.EM);
      this.props.closeBookingModal();
    } else {
      toast.error(res.EM);
    }
  };

  handleChangeSelect = (selected) => {
    this.setState({ selectedGender: selected });
  };

  async componentDidMount() {
    this.props.getGenderStart();
    this.setState({
      doctorID: this.props.dataScheduleTimeModal.doctorID,
      timeType: this.props.dataScheduleTimeModal.timeType,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    // để kh lỗi khi gender khi đổi language
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genderRedux),
      });
    }

    if (this.props.genderRedux !== prevProps.genderRedux) {
      this.setState({
        genders: this.buildDataGender(this.props.genderRedux),
      });
    }

    if (this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal) {
      let doctorID =
        !this.props.dataScheduleTimeModal &&
        _.isEmpty(this.props.dataScheduleTimeModal)
          ? ""
          : this.props.dataScheduleTimeModal.doctorID;
      this.setState({
        doctorID: doctorID,
        timeType: this.props.dataScheduleTimeModal.timeType,
      });
    }
  }

  render() {
    let { isOpenModalBooking, closeBookingModal, dataScheduleTimeModal } =
      this.props;
    let doctorID =
      !dataScheduleTimeModal && _.isEmpty(dataScheduleTimeModal)
        ? ""
        : dataScheduleTimeModal.doctorID;
    let yesterday = moment().subtract(1, "day").toDate(); //chọn được ngày hiện tại
    console.log("state: ", this.state);
    return (
      <div>
        <Modal
          isOpen={isOpenModalBooking}
          //  toggle={() => setOpen(false)}
          size="lg"
          centered
          className="booking-modal-container"
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">
                <FormattedMessage id={"patient.booking-modal.title"} />
              </span>
              <span className="right" onClick={closeBookingModal}>
                <i className="fas fa-times"></i>
              </span>
            </div>

            <div className="booking-modal-body">
              {/* hiện toàn bộ object -> chuyển về string */}
              {/* {JSON.stringify(dataScheduleTimeModal)} */}
              <div className="doctor-info">
                <ProfileDoctor
                  doctorID={doctorID}
                  isShowDescDoctor={false}
                  dataScheduleTimeModal={dataScheduleTimeModal}
                />
              </div>

              <div className="row">
                <div className="form-group col-md-6">
                  <label>
                    <FormattedMessage id={"patient.booking-modal.fullName"} />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.fullName}
                    onChange={(e) => this.handleOnChange(e, "fullName")}
                  ></input>
                </div>
                <div className="form-group col-md-6">
                  <label>
                    <FormattedMessage
                      id={"patient.booking-modal.phoneNumber"}
                    />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.phoneNumber}
                    onChange={(e) => this.handleOnChange(e, "phoneNumber")}
                  ></input>
                </div>
                <div className="form-group col-md-6">
                  <label>
                    <FormattedMessage id={"patient.booking-modal.email"} />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.email}
                    onChange={(e) => this.handleOnChange(e, "email")}
                  ></input>
                </div>
                <div className="form-group col-md-6">
                  <label>
                    <FormattedMessage id={"patient.booking-modal.address"} />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.address}
                    onChange={(e) => this.handleOnChange(e, "address")}
                  ></input>
                </div>
                <div className="form-group col-12">
                  <label>
                    <FormattedMessage id={"patient.booking-modal.reason"} />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.reason}
                    onChange={(e) => this.handleOnChange(e, "reason")}
                  ></input>
                </div>
                <div className="form-group col-md-6">
                  <label>
                    <FormattedMessage id={"patient.booking-modal.birthDay"} />
                  </label>
                  <DatePicker // input chọn ngày
                    onChange={this.handleOnChangeDatePicker} // vì là props nên kh ()
                    className="form-control"
                    selected={this.state.birthday} // đây giống như value bên input , có thể thay selected thành value
                    //search: js get yesterday date
                    // fix bug : không chọn ngày hôm nay
                    // set chọn ngày hiện tại
                    minDate={yesterday}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>
                    <FormattedMessage id={"patient.booking-modal.gender"} />
                  </label>
                  <Select
                    value={this.state.selectedGender}
                    onChange={this.handleChangeSelect} // đây là hàm built sẵn -> truyền props
                    options={this.state.genders}
                    // placeholder={
                    // <FormattedMessage
                    // id={"admin.manage-doctor.select-doctor"}
                    // />
                    // }
                  />
                </div>
              </div>
            </div>

            <div className="booking-modal-footer">
              <button
                className="btn-booking-confirm btn btn-warning"
                onClick={() => this.handleConformBooking()}
              >
                <FormattedMessage id={"patient.booking-modal.btn-confirm"} />
              </button>
              <button
                className="btn-booking-cancel btn btn-danger"
                onClick={closeBookingModal}
              >
                <FormattedMessage id={"patient.booking-modal.btn-cancel"} />
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
