import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { fetchAllUser, deleteUser } from "../../../services/userService";
import ReactPaginate from "react-paginate";
import "../../../styles/userManage.scss";
import * as actions from "../../../store/actions";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import { LANGUAGE } from "../../../utils";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const mdParser = new MarkdownIt(); // convert từ text sang HTML

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      allDoctor: [],
    };
  }

  // MdEditor cần là props có sẵn: chuyền props không cần dùng arrow function
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    this.props.saveDetailDoctor({
      ...this.state,
      doctorID: this.state.selectedOption.value,
    });
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };
  handleOnChangeDesc = (e) => {
    this.setState({ description: e.target.value });
  };

  buildDataInputSelect = (inputData) => {
    let rs = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      let obj = {};
      inputData.map((item, index) => {
        // let labelVi = item.userName;
        // let labelEn = item.userName;
        // obj.label = language === LANGUAGE.VI ? labelVi : labelEn;
        obj = { value: item.id, label: item.userName };
        rs.push(obj);
      });
    }
    return rs;
  };

  componentDidMount() {
    this.props.fetchAllDoctor();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
      this.setState({ allDoctor: dataSelect });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
      this.setState({ allDoctor: dataSelect });
    }
  }

  render() {
    return (
      <>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">Tạo thêm thông tin doctor</div>
          <div className="more-info row">
            <div className="content-left form-group col-md-4">
              <label>Chọn bác sĩ: </label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.allDoctor}
              />
            </div>
            <div className="content-right col-md-8">
              <label>Thông tin giới thiệu: </label>
              <textarea
                className="form-control"
                rows="4"
                value={this.state.description}
                onChange={(event) => this.handleOnChangeDesc(event)}
              ></textarea>
            </div>
          </div>
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange} // chuyền props không cần dùng arrow function
            />
          </div>
          <button
            className="btn btn-warning save-content-doctor"
            onClick={() => this.handleSaveContentMarkdown()}
          >
            Lưu thông tin
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctor: state.admin.allDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
