import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class HandBook extends Component {
  render() {
    return (
      <>
        <div className="section-share section-handBook">
          <div className="section-container">
            <div className="section-header">
              <span className="tittle-section">Cẩm nang</span>
              <button type="button" className="btn-section btn btn-secondary">
                Xem thêm
              </button>
            </div>

            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-customize handBook-customize">
                  {/* dùng div chèn ảnh phải set height và width */}
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="section-customize handBook-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="section-customize handBook-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="section-customize handBook-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="section-customize handBook-customize">
                  <div className="bg-img"> </div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="section-customize handBook-customize">
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
