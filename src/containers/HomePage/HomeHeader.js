import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";

class HomeHeader extends Component {
  render() {
    return (
      <>
        <div className="home-header-container p-md-1">
          <div className="home-header-content row ">
            <div className="left-content col-md-2">
              <i className="fa fa-bars" aria-hidden="true"></i>
              <div className="logo ms-md-2"></div>
            </div>
            <div className="center-content col-md-8 row">
              <div className="child-content col-md-3">
                <div>
                  <b className="subs-title">Chuyên khoa</b>
                </div>
                <div>Tìm bác sĩ theo chuyên khoa</div>
              </div>
              <div className="child-content col-md-3">
                <div>
                  <b className="subs-title">Cơ sở y tế</b>
                </div>
                <div>Chọn bệnh viện phòng khám</div>
              </div>
              <div className="child-content col-md-3">
                <div>
                  <b className="subs-title">Bác sĩ</b>
                </div>
                <div>Chọn bác sĩ giỏi</div>
              </div>
              <div className="child-content col-md-3">
                <div>
                  <b className="subs-title">Gói khám</b>
                </div>
                <div>Khám sức khoẻ tổng quát</div>
              </div>
            </div>
            <div className="right-content col-md-2 d-flex align-items-center">
              <div className="support">
                <i className="far fa-question-circle"></i>Hỗ trợ
              </div>
              <div className="language-vn">VN</div>
              <div className="language-en">EN</div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="content-up">
            <div className="title1">NỀN TẢNG Y TẾ</div>
            <div className="title2">CHĂM SÓC SỨC KHOẺ TOÀN DIỆN</div>
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
                <div className="text-child">Khám chuyên khoa</div>
              </div>
              <div className="option-child col-md-2">
                <div className="icon-child">
                  <i className="fa fa-mobile" aria-hidden="true"></i>
                </div>
                <div className="text-child">Khám từ xa</div>
              </div>
              <div className="option-child col-md-2">
                <div className="icon-child">
                  <i className="fa fa-medkit" aria-hidden="true"></i>
                </div>
                <div className="text-child">Khám tổng quát</div>
              </div>
              <div className="option-child col-md-2">
                <div className="icon-child">
                  <i className="fas fa-microscope"></i>
                </div>
                <div className="text-child">Xét nghiệm y học</div>
              </div>
              <div className="option-child col-md-2">
                <div className="icon-child">
                  <i className="fas fa-head-side-virus"></i>
                </div>
                <div className="text-child">Sức khoẻ tinh thần</div>
              </div>
              <div className="option-child col-md-2">
                <div className="icon-child">
                  <i className="fas fa-tooth"></i>
                </div>
                <div className="text-child">Khám nha khoa</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
