import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import Medical_facilities from "./Section/Medical_facilities";
import "./HomePage.scss";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HandBook from "./Section/HandBook";
class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4, // số lượng slide hiển thị
      slidesToScroll: 1, // số lượng slide di chuyển
    };
    return (
      <div>
        <HomeHeader />
        <Specialty settings={settings} />
        <Medical_facilities settings={settings} />
        <OutStandingDoctor settings={settings} />
        <HandBook settings={settings} />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
