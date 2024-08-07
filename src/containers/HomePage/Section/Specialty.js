import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from "react-router"; // điều hướng khi click vào section - giống history.push

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  handleViewDetailSpecialty = (item) => {
    // search: How to get parameter value from query string?
    // search: react router navigate
    return this.props.history.push(`/detail-specialty/${item.id}`);
  };

  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.EC === 0) {
      this.setState({
        dataSpecialty: res.DT ? res.DT : [],
      });
    }
  }

  render() {
    let { dataSpecialty } = this.state;
    return (
      <>
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="tittle-section">
                <FormattedMessage id={"homePage.specialty-popular"} />
              </span>
              <button type="button" className="btn-section btn btn-secondary">
                <FormattedMessage id={"homePage.more-info"} />
              </button>
            </div>

            <div className="section-body">
              <Slider {...this.props.settings}>
                {/* dùng div chèn ảnh phải set height và width -> dùng style */}
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
                    return (
                      <div
                        className="section-customize specialty-customize"
                        key={index}
                        onClick={() => this.handleViewDetailSpecialty(item)}
                      >
                        <div
                          className="bg-img"
                          style={{
                            backgroundImage: `url(${item.image})`,
                          }}
                        ></div>
                        <div className="specialty-name">{item.name}</div>
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
  // console.log("state", state);
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
