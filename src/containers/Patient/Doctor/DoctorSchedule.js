import React, { Component } from "react";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import { connect } from "react-redux";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";
import { LANGUAGE } from "../../../utils/constant";
import "./DoctorSchedule.scss";
import { getScheduleDoctorByDate } from "../../../services/userService";
import moment from "moment"; // ngày tháng năm
import localization from "moment/locale/vi"; // ngôn ngữ việt nam vì moment không hỗ trợ vn -> chỉ cần import sẽ tự dùng
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [], // ngày đưa vào select
      allAvailableTime: [], // all time của ngày chọn từ select
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  // ngày tháng năm của select (thứ)
  getArrDays = (language) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGE.VI) {
        // vì moment không hiện chữ hôm nay nên ta cần format lại
        if (i === 0) {
          let labelVi2 = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${labelVi2}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi); // in hoa chứ đầu
        }
      } else {
        // vì moment không hiện chữ hôm nay nên ta cần format lại
        if (i === 0) {
          let labelEn = moment(new Date()).locale("en").format("DD/MM");
          let today = `Today - ${labelEn}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }

      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(object); //{label: 'thứ năm - 11/07', value: 1720630800000}
    }
    return arrDate;
  };

  // in hoá chứ đầu của moment (Thứ 3)
  // search : js uppercase first letter
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorID && this.props.doctorID !== -1) {
      let doctorID = this.props.doctorID; // props bên fetch detailDoctor
      let date = event.target.value;

      let res = await getScheduleDoctorByDate(doctorID, date);

      if (res && res.EC === 0) {
        this.setState({
          allAvailableTime: res.DT ? res.DT : [],
        });
      }
    }
  };

  handleClickScheduleTime = (time) => {
    this.setState({ isOpenModalBooking: true, dataScheduleTimeModal: time });
  };

  closeBookingModal = () => {
    this.setState({ isOpenModalBooking: false });
  };

  async componentDidMount() {
    let { language } = this.props;
    // console.log("moment vie: ", moment(new Date()).format("dddd - DD/MM")); // thứ - ngày/tháng
    // console.log(
    //   "moment en: ",
    //   moment(new Date()).locale("en").format("ddd - DD/MM") // vì import localization nên phải chuyển locale en nếu dùng en
    // );
    let allDays = this.getArrDays(language);
    if (allDays && allDays.length > 0) {
      this.setState({
        allDays: allDays,
      });
    }

    // hiển thị time chọn select của ngày hiện tại
    // mới vào không hiện -> do state props cha chưa được set Vì ban đầu render ch có data
    if (this.props.doctorID) {
      let allDays = this.getArrDays(this.props.language);

      // vừa vào là hiện time của ngày hiện tại
      // hôm nay
      let res = await getScheduleDoctorByDate(
        this.props.doctorID, // ID doctor đc lấy khi click vào detail doctor
        allDays[0].value // {label: 'Hôm nay - 26/07', value: 1721926800000}
      );
      this.setState({ allAvailableTime: res.DT ? res.DT : [] });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({ allDays: allDays }); // vừa vào là hiện thứ của ngày hiện tại
    }

    // hiển thị time chọn select của ngày hiện tại
    if (prevProps.doctorID !== this.props.doctorID) {
      let allDays = this.getArrDays(this.props.language);

      // vừa vào là hiện time của ngày hiện tại
      // hôm nay
      let res = await getScheduleDoctorByDate(
        this.props.doctorID, // ID doctor đc lấy khi click vào detail doctor
        allDays[0].value
      );
      this.setState({ allAvailableTime: res.DT ? res.DT : [] });
    }
  }

  render() {
    let {
      allDays,
      allAvailableTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
    } = this.state;
    // console.log("allAvailableTime: ", allAvailableTime);
    let { language } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((day, index) => {
                  return (
                    <option key={index} value={day.value}>
                      {day.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <span>
                <i className="fas fa-calendar-alt" />
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <>
                  <div className="time-content-btns">
                    {allAvailableTime.map((time, index) => {
                      let timeDisplay =
                        language === LANGUAGE.VI
                          ? time.timeTypeData.valueVi
                          : time.timeTypeData.valueEn;
                      return (
                        <button
                          key={index}
                          className={
                            language === LANGUAGE.VI
                              ? " btn btn-warning btn-vi"
                              : " btn btn-warning btn-en"
                          }
                          onClick={() => {
                            this.handleClickScheduleTime(time);
                          }}
                        >
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>

                  <div className="book-free">
                    <span>
                      <FormattedMessage id={"patient.detail-doctor.choose"} />
                      <i className="far fa-hand-point-up"></i>
                      <FormattedMessage
                        id={"patient.detail-doctor.book-free"}
                      />
                    </span>
                  </div>
                </>
              ) : (
                <div className="no-schedule">
                  <FormattedMessage id="patient.detail-doctor.dont-schedule" />
                </div>
              )}
            </div>
          </div>
        </div>

        <BookingModal
          isOpenModalBooking={isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
          dataScheduleTimeModal={dataScheduleTimeModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctor: state.admin.allDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
