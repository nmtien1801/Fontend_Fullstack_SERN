import React, { Component } from "react";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGE } from "../../../utils/constant";
// import "./DefaultClass.scss";
import { NumericFormat } from "react-number-format"; // format số tiền

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {}

  render() {
    return <div> this is default class</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
