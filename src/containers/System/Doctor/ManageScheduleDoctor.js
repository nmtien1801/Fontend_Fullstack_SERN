import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

class ManageScheduleDoctor extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <>
        <div>schedule doctor</div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageScheduleDoctor);
