import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
  render() {
    return (
      <>
        <div className="home-footer">
          {/* search: html copyright */}
          <p>
            &copy; 2024 NguyenMinhTien.
            <a href="#">More information, please visit my youtobe channel.</a>
            <a target="_blank" href="https://www.facebook.com/">
              &#8594; Click here &#8592;
            </a>
          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
