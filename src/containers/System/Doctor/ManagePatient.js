import React, { Component } from "react";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGE } from "../../../utils";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment"; // format ngày tháng năm
import { getAllPatientForDoctor } from "../../../services/userService";
import _ from "lodash";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // lấy ngày hiện tại -> phải dùng value(in <Select>) mới hiển thị được
      currentDate: moment(new Date()).startOf("day").valueOf(), // chỉ lấy ngày không lấy giờ
      dataPatient: [],
    };
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      }, // callback: khi chọn ngày sẽ gọi lên các patient của bác sĩ đó trong ngày
      () => {
        // có thể làm ở componentDidUpdate khi currentDate thay đổi
        let currentDate = new Date(this.state.currentDate).getTime();
        this.getDataPatient(this.props.userInfo, currentDate);
      }
    );
  };

  getDataPatient = async (userInfo, formatDate) => {
    let res = await getAllPatientForDoctor({
      doctorID: userInfo._id, // khi login bác sĩ này sẽ xem có những patient nào đã booking
      date: formatDate,
    });
    if (res && res.EC === 0) {
      this.setState({
        dataPatient: res.DT,
      });
    }

    console.log("res: ", res);
  };

  handleBtnConfirm = (item) => {};

  handleBtnRemedy = (item) => {};

  async componentDidMount() {
    let { userInfo } = this.props;
    // không lưu props -> userInfo vì khi refresh userInfo = null -> nên lỗi
    if (userInfo && !_.isEmpty(userInfo)) {
      let currentDate = new Date(this.state.currentDate).getTime();
      this.getDataPatient(userInfo, currentDate);
    }
  }

  async componentDidUpdate(prevProps, prevState) {}

  render() {
    let { dataPatient } = this.state;
    let { language } = this.props;
    return (
      <div className="manage-patient-container">
        <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>

        <div className="manage-patient-body row">
          <div className="col-md-4 form-group">
            <label>Chọn ngày khám</label>
            <DatePicker // ngày input chọn
              onChange={this.handleOnChangeDatePicker} // vì là props nên kh ()
              className="form-control mt-2"
              value={this.state.currentDate} // đây giống như value bên input , có thể thay selected thành value
            />
          </div>

          <div className="col-12 mt-4">
            <table className="table table-striped table-bordered table-hover">
              <thead className="green">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Thời gian</th>
                  <th scope="col">Họ và tên</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Giới tính</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataPatient && dataPatient.length ? (
                  <>
                    {dataPatient.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>{index + 1}</td>
                          <td>
                            {language === LANGUAGE.VI
                              ? item.timeTypeDataPatient.valueVi
                              : item.timeTypeDataPatient.valueEn}
                          </td>
                          <td>{item.patientData.userName}</td>
                          <td>{item.patientData.address}</td>
                          <td>
                            {language === LANGUAGE.VI
                              ? item.patientData.genderData.valueVi
                              : item.patientData.genderData.valueEn}
                          </td>
                          <td>
                            <button
                              className="btn btn-primary mp-btn-confirm me-3"
                              onClick={() => {
                                this.handleBtnConfirm(item);
                              }}
                            >
                              Xác nhận
                            </button>
                            <button
                              className="btn btn-warning btn-send-bill"
                              onClick={() => {
                                this.handleBtnRemedy(item);
                              }}
                            >
                              Gửi hoá đơn
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>not found user</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
