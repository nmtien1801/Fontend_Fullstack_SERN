import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom"; // điều hướng khi click vào home - giống history.push
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGE } from "../../utils/constant";
import { changeLanguage } from "../../store/actions"; // đường dẫn tắt

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageApp(language);
    // search: fire redux event action
  };
  returnToHome = () => {
    if (this.props.history) return this.props.history.push(`/home`); //  điều hướng khi click vào home - giống history.push
  };
  render() {
    // console.log("check props HomeHeader: ", this.props);
    let language = this.props.language;

    return (
      <>
        <div className="home-header-container p-md-1">
          <div className="home-header-content row ">
            <div className="left-content col-md-2">
              <i className="fa fa-bars" aria-hidden="true"></i>
              <div
                className="logo ms-md-2"
                onClick={() => this.returnToHome()}
              ></div>
            </div>
            <div className="center-content col-md-8 row">
              <div className="child-content col-md-3">
                <div>
                  <b className="subs-title">
                    <FormattedMessage id="home-header.specialty" />
                  </b>
                </div>
                <div>
                  <FormattedMessage id="home-header.search-doctor-by-specialty" />
                </div>
              </div>
              <div className="child-content col-md-3">
                <div>
                  <b className="subs-title">
                    <FormattedMessage id="home-header.health-facility" />
                  </b>
                </div>
                <div>
                  <FormattedMessage id="home-header.health-facility" />
                </div>
              </div>
              <div className="child-content col-md-3">
                <div>
                  <b className="subs-title">
                    <FormattedMessage id="home-header.doctor" />
                  </b>
                </div>
                <div>
                  <FormattedMessage id="home-header.select-doctor-better" />
                </div>
              </div>
              <div className="child-content col-md-3">
                <div>
                  <b className="subs-title">
                    <FormattedMessage id="home-header.fee" />
                  </b>
                </div>
                <div>
                  <FormattedMessage id="home-header.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content col-md-2 d-flex align-items-center">
              <div className="support">
                <i className="far fa-question-circle"></i>
                <FormattedMessage id="home-header.support" />
              </div>
              <div
                className={
                  language === LANGUAGE.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGE.VI)}>VN</span>
              </div>
              <div
                className={
                  language === LANGUAGE.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGE.EN)}>EN</span>
              </div>
            </div>
          </div>
        </div>
        {/* isShowBanner : chỉ hiện banner ở  HomePage chứ không hiện ở DetailDoctor*/}
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />{" "}
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search">
                <i className="fa fa-search" aria-hidden="true"></i>
                <input
                  type="text"
                  placeholder="Tìm bác sĩ, chuyên khoa, cơ sở y tế"
                />
              </div>
            </div>
            <div className="content-below px-md-5 ">
              <div className="options row">
                <div className="option-child col-md-2">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.Specialized-examination" />
                  </div>
                </div>
                <div className="option-child col-md-2">
                  <div className="icon-child">
                    <i className="fa fa-mobile" aria-hidden="true"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.Remote-examination" />
                  </div>
                </div>
                <div className="option-child col-md-2">
                  <div className="icon-child">
                    <i className="fa fa-medkit" aria-hidden="true"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.General-examination" />
                  </div>
                </div>
                <div className="option-child col-md-2">
                  <div className="icon-child">
                    <i className="fas fa-microscope"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.Medical-tests" />
                  </div>
                </div>
                <div className="option-child col-md-2">
                  <div className="icon-child">
                    <i className="fas fa-head-side-virus"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.Mental-health" />
                  </div>
                </div>
                <div className="option-child col-md-2">
                  <div className="icon-child">
                    <i className="fas fa-tooth"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.Dental-examination" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("state", state);
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  // search: this.props.dispatch is not a function
  return {
    changeLanguageApp: (language) => dispatch(changeLanguage(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
