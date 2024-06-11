import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class Specialty extends Component {
  render() {
    return (
      <>
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="tittle-section">Chuyên khoa phổ biến</span>
              <button type="button" className="btn-section btn btn-secondary">
                Xem thêm
              </button>
            </div>

            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-customize specialty-customize">
                  {/* dùng div chèn ảnh phải set height và width */}
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="section-customize specialty-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="section-customize specialty-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="section-customize specialty-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="section-customize specialty-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="section-customize specialty-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
