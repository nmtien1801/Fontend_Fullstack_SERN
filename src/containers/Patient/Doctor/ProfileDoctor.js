import React, { Component } from "react";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGE } from "../../../utils/constant";
import "./ProfileDoctor.scss";
import { NumericFormat } from "react-number-format"; // format số tiền
import { Modal, Button, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { getProfileDoctorById } from "../../../services/userService";
import _ from "lodash";
import moment from "moment";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  getInfoDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.EC === 0) {
        result = res.DT;
      }
    }
    return result;
  };

  renderTimeBooking(dataTime) {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGE.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      // convert ngày tháng năm -> input: 32566033
      let date =
        language === LANGUAGE.VI
          ? moment(dataTime.date).format("dddd - DD/MM/YYYY")
          : // vì moment không hiện chữ hôm nay nên ta cần format lại
            moment(dataTime.date).locale("en").format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>
            <FormattedMessage id={"patient.booking-modal.priceBooking"} />
          </div>
        </>
      );
    }
    return <></>;
  }

  async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorID);
    this.setState({
      dataProfile: data,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    // để dataProfile được cập nhật
    if (this.props.doctorID !== prevProps.doctorID) {
      // this.setState({
      //   dataProfile: data,
      // });
    }
  }

  render() {
    let {
      isOpenModalBooking,
      closeBookingModal,
      dataScheduleTimeModal,
      language,
      isShowDescDoctor,
    } = this.props;
    let { dataProfile } = this.state;
    let nameVi = "",
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi} , ${dataProfile.userName}`;
      nameEn = `${dataProfile.positionData.valueEn} , ${dataProfile.userName}`;
    }

    // console.log("dataProfile: ", dataProfile);
    // console.log("dataScheduleTimeModal: ", dataScheduleTimeModal);
    return (
      <>
        <div className="profile-doctor-container">
          <div className="intro-doctor">
            <div
              // chèn ảnh từ BE
              //![]()
              //![img](https://github.com/....jpg?raw=true)
              className="content-left"
              style={{
                backgroundImage: `url(${
                  dataProfile && dataProfile.image ? dataProfile.image : ""
                })`,
              }}
            ></div>

            <div className="content-right">
              <div className="up">
                {language === LANGUAGE.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {isShowDescDoctor === true ? (
                  <>
                    {dataProfile &&
                      dataProfile.Markdown &&
                      dataProfile.Markdown.description && (
                        <span>{dataProfile.Markdown.description}</span>
                      )}
                  </>
                ) : (
                  <>{this.renderTimeBooking(dataScheduleTimeModal)}</>
                )}
              </div>
            </div>
          </div>

          <div className="price">
            {dataProfile && dataProfile.Doctor_Info ? (
              language === LANGUAGE.VI ? (
                <NumericFormat
                  value={dataProfile.Doctor_Info.priceTypeData.valueVi} // 300 000 -> 300,000 VND
                  thousandSeparator=","
                  displayType="text"
                  renderText={(value) => (
                    <span>
                      <FormattedMessage id={"patient.booking-modal.price"} />
                      {`${value} VND`}
                    </span>
                  )}
                />
              ) : (
                <NumericFormat
                  value={dataProfile.Doctor_Info.priceTypeData.valueEn} // 300 000 -> 300,000 $
                  thousandSeparator=","
                  displayType="text"
                  renderText={(value) => (
                    <span>
                      <FormattedMessage id={"patient.booking-modal.price"} />
                      {`${value} $`}
                    </span>
                  )}
                />
              )
            ) : (
              ""
            )}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
