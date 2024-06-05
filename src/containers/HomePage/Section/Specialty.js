import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4, // số lượng slide hiển thị
      slidesToScroll: 1, // số lượng slide di chuyển
    };
    return (
      <>
        <div className="section-specialty">
          <div className="specialty-container">
            <div className="specialty-header">
              <span className="tittle-section">Chuyên khoa phổ biến</span>
              <button type="button" className="btn-section btn btn-secondary">
                Xem thêm
              </button>
            </div>

            <div className="specialty-body">
              <Slider {...settings}>
                <div className="specialty-customize">
                  {/* dùng div chèn ảnh phải set height và width */}
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="specialty-customize">
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
  console.log("state", state);
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
