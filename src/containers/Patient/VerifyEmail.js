import React, { Component } from "react";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { LANGUAGE } from "../../utils/constant";
import "./VerifyEmail.scss";
import { NumericFormat } from "react-number-format"; // format số tiền
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      const urlParams = new URLSearchParams(this.props.location.search);
      let doctorID = urlParams.get("doctorID");
      let token = urlParams.get("token");

      let res = await postVerifyBookAppointment({ doctorID, token });
      if (res && res.EC === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.EC,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.EC ? res.EC : -1,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {}

  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="verify-email-container">
          {statusVerify === false ? (
            <div>loading data...</div>
          ) : (
            <div>
              {+errCode === 0 ? (
                <div className="info-booking">Xác nhận lịch hẹn thành công</div>
              ) : (
                <div className="info-booking">
                  Lịch hẹn không tồn tại hoặc đã được xác nhận
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
