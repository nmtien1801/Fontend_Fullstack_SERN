import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class HandBook extends Component {
  render() {
    return (
      <>
        <div className="section-share section-about">about us</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
