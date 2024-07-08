import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./ManageScheduleDoctor.scss";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import * as actions from "../../../store/actions";
import Select from "react-select"; // gợi ý select
import { getDetailInfoDoctor } from "../../../services/userService";
import { CRUD_ACTION, LANGUAGE } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker"; // ngày
import moment from "moment"; // format ngày tháng năm

class ManageScheduleDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDoctor: [],
      selectedDoctor: {}, // gồm: label, value
      currentDate: new Date(),
      rangeTime: [],
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

  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchAllScheduleTime();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
      this.setState({ allDoctor: dataSelect });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      this.setState({ rangeTime: this.props.allScheduleTime });
    }
  }
  render() {
    const { isLoggedIn, language } = this.props;
    let { rangeTime } = this.state;
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
                  selected={this.state.currentDate[0]}
                  minDate={new Date()}
                />
              </div>
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className="btn btn-schedule"
                      key={`scheduleTime-${index}`}
                    >
                      {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <button className="btn btn-primary btn-save-schedule">
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
