import React, { Component } from "react";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import { connect } from "react-redux";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";
import { LANGUAGE } from "../../../utils/constant";
import "./DoctorExtraInfo.scss";
import { getExtraInfoDoctorById } from "../../../services/userService";
import { NumericFormat } from "react-number-format"; // format số tiền

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
      extraInfo: [],
    };
  }

  showHideDetailInfo = () => {
    this.setState({
      isShowDetailInfo: !this.state.isShowDetailInfo,
    });
  };

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
    }
    if (prevProps.doctorID !== this.props.doctorID) {
      let res = await getExtraInfoDoctorById(this.props.doctorID);
      if (res && res.EC === 0) {
        this.state = {
          extraInfo: res.DT,
        };
      } else {
        toast.error(res.EM);
      }
    }

    // vì props doctorID bên doctorDetail trước khi didmount là -1 nên setState extraInfo không chạy
    // bug: [intervention] slow network is detected. -> set state không ăn
    if (prevState.extraInfo !== this.state.extraInfo) {
      this.setState({
        extraInfo: this.state.extraInfo,
      });
    }
  }

  render() {
    let { isShowDetailInfo, extraInfo } = this.state;
    let { language } = this.props;
    console.log("state2: ", this.state);
    return (
      <>
        <div className="doctor-extra-info-container">
          <div className="content-up">
            <div className="text-address">
              <FormattedMessage id={"patient.extra-info-doctor.text-address"} />
            </div>
            <div className="name-clinic">
              {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
            </div>
            <div className="detail-address">
              {extraInfo && extraInfo.addressClinic
                ? extraInfo.addressClinic
                : ""}
            </div>
          </div>
          <div
            className={
              isShowDetailInfo === false
                ? "content-down d-flex gap-md-3"
                : "content-down "
            }
          >
            <div className="title-price">
              <FormattedMessage id={"patient.extra-info-doctor.price"} />
            </div>
            {isShowDetailInfo === true && (
              <>
                <div className="detail-info">
                  <div className="price">
                    <span className="left">
                      <FormattedMessage
                        id={"patient.extra-info-doctor.price"}
                      />
                    </span>
                    <span className="right">
                      {extraInfo && extraInfo.priceTypeData ? (
                        language === LANGUAGE.VI ? (
                          <NumericFormat
                            value={extraInfo.priceTypeData.valueVi} // 300 000 -> 300,000 VND
                            thousandSeparator=","
                            displayType="text"
                            renderText={(value) => <t>{`${value} VND`}</t>}
                          />
                        ) : (
                          <NumericFormat
                            value={extraInfo.priceTypeData.valueVi} // 300 000 -> 300,000 $
                            thousandSeparator=","
                            displayType="text"
                            renderText={(value) => <t>{`${value} $`}</t>}
                          />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div className="note">
                    {extraInfo && extraInfo.note ? extraInfo.note : ""}
                  </div>
                </div>
                <div className="payment">
                  <FormattedMessage id={"patient.extra-info-doctor.payment"} />
                  {extraInfo && extraInfo.paymentTypeData
                    ? language === LANGUAGE.VI
                      ? extraInfo.paymentTypeData.valueVi
                      : extraInfo.paymentTypeData.valueEn
                    : ""}
                </div>
              </>
            )}
            <div
              className="hide-price"
              onClick={() => this.showHideDetailInfo()}
            >
              {this.state.isShowDetailInfo === false ? (
                <div className="d-flex">
                  {extraInfo && extraInfo.priceTypeData ? (
                    language === LANGUAGE.VI ? (
                      <NumericFormat
                        value={extraInfo.priceTypeData.valueVi} // 300 000 -> 300,000 VND
                        thousandSeparator=","
                        displayType="text"
                        renderText={(value) => <span>{`${value} VND`}</span>}
                      />
                    ) : (
                      <NumericFormat
                        value={extraInfo.priceTypeData.valueVi} // 300 000 -> 300,000 $
                        thousandSeparator=","
                        displayType="text"
                        renderText={(value) => <span>{`${value} $`}</span>}
                      />
                    )
                  ) : (
                    ""
                  )}

                  <div className="short-info ms-2">
                    <FormattedMessage
                      id={"patient.extra-info-doctor.show-detail"}
                    />
                  </div>
                </div>
              ) : (
                <div className="short-info">
                  <FormattedMessage
                    id={"patient.extra-info-doctor.hide-detail"}
                  />
                </div>
              )}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
