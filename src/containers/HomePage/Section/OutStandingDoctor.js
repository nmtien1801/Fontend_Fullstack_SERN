import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom"; // điều hướng khi click vào section - giống history.push
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGE } from "../../../utils/constant";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDoctor: [],
    };
  }

  handleViewDetailDoctor = (doctor) => {
    // search: How to get parameter value from query string?
    // search: react router navigate
    return this.props.history.push(`/detail-doctor/${doctor.id}`);
  };

  componentDidMount() {
    this.props.loadTopDoctor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctor !== this.props.topDoctor) {
      this.setState({
        dataDoctor: this.props.topDoctor,
      });
    }
  }

  render() {
    let { language } = this.props;
    let { dataDoctor } = this.state;
    console.log("dataDoctor", dataDoctor);
    // bể layout khi dùng npm băng chuyền
    // vì dataDoctor có ít phần tử nên vỡ layout, cần phải duplicate data
    dataDoctor = dataDoctor.concat(dataDoctor).concat(dataDoctor);
    return (
      <>
        <div className="section-share section-OutStandingDoctor">
          <div className="section-container">
            <div className="section-header">
              <span className="tittle-section">
                <FormattedMessage id={"homePage.outStanding-doctor"} />
              </span>
              <button type="button" className="btn-section btn btn-secondary">
                <FormattedMessage id={"homePage.more-info"} />
              </button>
            </div>

            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataDoctor &&
                  dataDoctor.length > 0 &&
                  dataDoctor.map((item, index) => {
                    //search : How to convert Buffer to base64 image in Node js
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    let nameVi = `${item.positionData.valueVi},${item.userName}`;
                    let nameEn = `${item.positionData.valueEn},${item.userName}`;
                    return (
                      <div
                        key={`doctor-${index}`}
                        className="section-customize OutStandingDoctor-customize"
                        onClick={() => {
                          this.handleViewDetailDoctor(item);
                        }}
                      >
                        <div className="outer-bg">
                          <div
                            className="bg-img bg-OutStandingDoctor"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                            }}
                          ></div>
                        </div>
                        <div className="position text-center">
                          <div>
                            {language === LANGUAGE.VI ? nameVi : nameEn}
                          </div>
                          <div>cơ xương khớp</div>
                        </div>
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
    topDoctor: state.admin.topDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
