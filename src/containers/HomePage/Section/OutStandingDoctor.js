import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class Specialty extends Component {
  render() {
    return (
      <>
        <div className="section-share section-OutStandingDoctor">
          <div className="section-container">
            <div className="section-header">
              <span className="tittle-section">Bác sĩ nổi bật tuần qua</span>
              <button type="button" className="btn-section btn btn-secondary">
                Xem thêm
              </button>
            </div>

            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-customize OutStandingDoctor-customize">
                  {/* dùng div chèn ảnh phải set height và width */}
                  <div className="outer-bg">
                    <div className="bg-img bg-OutStandingDoctor img1"> </div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ </div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
                <div className="section-customize OutStandingDoctor-customize">
                  <div className="outer-bg">
                    <div className="bg-img bg-OutStandingDoctor img2"> </div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ </div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
                <div className="section-customize OutStandingDoctor-customize">
                  <div className="outer-bg">
                    <div className="bg-img bg-OutStandingDoctor"> </div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ </div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
                <div className="section-customize OutStandingDoctor-customize">
                  <div className="outer-bg">
                    <div className="bg-img bg-OutStandingDoctor"> </div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ </div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
                <div className="section-customize OutStandingDoctor-customize">
                  <div className="outer-bg">
                    <div className="bg-img bg-OutStandingDoctor"> </div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ </div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
                <div className="section-customize OutStandingDoctor-customize">
                  <div className="outer-bg">
                    <div className="bg-img bg-OutStandingDoctor"> </div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ </div>
                    <div>Cơ xương khớp</div>
                  </div>
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
