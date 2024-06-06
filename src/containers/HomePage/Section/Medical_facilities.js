import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";

class Medical_facilities extends Component {
  render() {
    return (
      <>
        <div className="section-share section-MedicalFacilities">
          <div className="section-container">
            <div className="section-header">
              <span className="tittle-section">Cơ sở y tế nổi bật</span>
              <button type="button" className="btn-section btn btn-secondary">
                Xem thêm
              </button>
            </div>

            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-customize MedicalFacilities-customize">
                  {/* dùng div chèn ảnh phải set height và width */}
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="section-customize MedicalFacilities-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="section-customize MedicalFacilities-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="section-customize MedicalFacilities-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="section-customize MedicalFacilities-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="section-customize MedicalFacilities-customize">
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
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Medical_facilities);
