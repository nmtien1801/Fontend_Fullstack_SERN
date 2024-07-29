import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router"; // điều hướng khi click vào section - giống history.push

class Medical_facilities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }

  handleViewDetailClinic = (clinic) => {
    // search: How to get parameter value from query string?
    // search: react router navigate
    return this.props.history.push(`/detail-clinic/${clinic.id}`);
  };

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.EC === 0) {
      this.setState({
        dataClinic: res.DT,
      });
    }
  }

  render() {
    let { dataClinic } = this.state;
    console.log("state: ", this.state);
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
                {dataClinic &&
                  dataClinic.length > 0 &&
                  dataClinic.map((item, index) => {
                    return (
                      <div
                        className="section-customize MedicalFacilities-customize "
                        key={index}
                        onClick={() => this.handleViewDetailClinic(item)}
                      >
                        {/* dùng div chèn ảnh phải set height và width -> dùng style */}
                        <div
                          className="bg-img"
                          style={{
                            backgroundImage: `url(${item.image})`,
                          }}
                        ></div>
                        <div className="clinic-name">{item.name}</div>
                      </div>
                    );
                  })}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Medical_facilities)
);
