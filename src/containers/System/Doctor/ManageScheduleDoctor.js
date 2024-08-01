import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./ManageScheduleDoctor.scss";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import * as actions from "../../../store/actions";
import Select from "react-select"; // gợi ý select
import { saveBulkScheduleDoctor } from "../../../services/userService";
import { CRUD_ACTION, LANGUAGE, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker"; // ngày
import moment from "moment"; // format ngày tháng năm
import { toast } from "react-toastify";
import _ from "lodash";

class ManageScheduleDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDoctor: [],
      selectedDoctor: {}, // gồm: label, value -> bác sĩ chọn trên select
      currentDate: [new Date()],
      rangeTime: [], // thời gian lấy từ DB lưu vào đây
      isSelected: false, // hiện màu xanh khi chọn
    };
  }

  handleOnChangeDatePicker = (date) => {
    this.setState({ currentDate: date[0] });
  };

  buildDataInputSelect = (inputData) => {
    let rs = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      let obj = {};
      inputData.map((item, index) => {
        // let labelVi = item.userName;
        // let labelEn = item.userName;
        // obj.label = language === LANGUAGE.VI ? labelVi : labelEn;
        obj = { value: item.id, label: item.userName };
        rs.push(obj);
      });
    }
    return rs;
  };

  handleChangeSelect = async (selectedDoctor) => {
    // search: react-markdown-editor-lite set default value
    this.setState({ selectedDoctor });
  };

  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected; // chuyển đổi trạng thái khi click
        return item;
      });
      this.setState({ rangeTime: rangeTime });
    }
  };

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    let formatDate = new Date(currentDate).getTime(); // ngày convert lưu db 123165(FE) -> dd/MM/yyyy(BE)

    if (!currentDate) {
      toast.error("Please choose date");
      return; // return để báo từng lỗi nếu h nó check 2 if
    }
    if (!selectedDoctor || _.isEmpty(selectedDoctor)) {
      toast.error("Please choose doctor");
      return;
    }

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true); // duyệt từng phần tử có điều kiện

      if (selectedTime.length > 0) {
        selectedTime.map((item) => {
          let object = {};
          object.doctorID = selectedDoctor.value;
          object.date = formatDate;
          object.timeType = item.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Please choose time");
        return;
      }
    }

    let res = await saveBulkScheduleDoctor({
      arraySchedule: result,
      doctorID: selectedDoctor.value, // dùng để phân biệt đã tạo chưa tránh bị trùng do tạo nhiều
      date: formatDate, // dùng để phân biệt đã tạo chưa tránh bị trùng do tạo nhiều
    });
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchAllScheduleTime();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
      this.setState({ allDoctor: dataSelect });
    }
    // allScheduleTime để hiển thị vì mới vào allScheduleTime = []
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data.map((item) => ({ ...item, isSelected: false })); // thêm isSelected vào data lấy từ DB
      }
      this.setState({ rangeTime: data });
    }
  }
  render() {
    const { isLoggedIn, language } = this.props;
    let { rangeTime } = this.state;
    console.log("currentDate", this.state.currentDate);
    let yesterday = moment().subtract(1, "day").toDate(); //chọn được ngày hiện tại
    return (
      <>
        <div className="manage-schedule-container">
          <div className="m-s-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-doctor"></FormattedMessage>
                </label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleChangeSelect}
                  options={this.state.allDoctor}
                />
              </div>
              <div className="col-md-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-date"></FormattedMessage>
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker} // vì là props nên kh ()
                  className="form-control"
                  selected={this.state.currentDate}
                  //search: js get yesterday date
                  // fix bug : không chọn ngày hôm nay
                  // set chọn ngày hiện tại
                  minDate={yesterday}
                />
              </div>
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected === true
                          ? "btn btn-schedule active"
                          : "btn btn-schedule"
                      }
                      key={`scheduleTime-${index}`}
                      onClick={() => {
                        this.handleClickBtnTime(item);
                      }}
                    >
                      {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <button
              className="btn btn-primary btn-save-schedule"
              onClick={() => this.handleSaveSchedule()}
            >
              <FormattedMessage id="manage-schedule.save"></FormattedMessage>
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctor: state.admin.allDoctor,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageScheduleDoctor);
