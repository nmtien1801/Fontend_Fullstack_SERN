import React, { Component } from "react";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
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
import { CRUD_ACTION, LANGUAGE } from "../../../utils";
import { getDetailInfoDoctor } from "../../../services/userService";

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
      // save to doctor_markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "", // biến chứa chọn trong select
      description: "",
      allDoctor: [],
      hasOldData: false, // đã có dữ liệu hay chưa

      // save to doctor_info table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
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
    let { hasOldData } = this.state;

    this.props.saveDetailDoctor({
      ...this.state,
      doctorID: this.state.selectedOption.value,
      action: hasOldData === false ? CRUD_ACTION.CREATE : CRUD_ACTION.EDIT,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    // search: react-markdown-editor-lite set default value
    this.setState({ selectedOption });

    let res = await getDetailInfoDoctor(selectedOption.value);
    console.log("res: ", res);
    if (res && res.EC === 0 && res.DT && res.DT.Markdown) {
      let markdown = res.DT.Markdown;
      this.setState({
        contentMarkdown: markdown.contentMarkdown,
        contentHTML: markdown.contentHTML,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
        hasOldData: false,
      });
    }
  };

  handleOnChangeDesc = (e) => {
    this.setState({ description: e.target.value });
  };

  buildDataInputSelect = (inputData, type) => {
    let rs = [];
    let { language } = this.props;

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let obj = {};
        let labelVi = type === "USER" ? item.userName : item.valueVi;
        let labelEn = type === "USER" ? item.userName : item.valueEn;
        obj.label = language === LANGUAGE.VI ? labelVi : labelEn;
        obj.value = item.id;
        rs.push(obj);
      });
    }

    return rs;
  };

  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.getAllRequireDoctorInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor, "USER");
      this.setState({ allDoctor: dataSelect });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor, "USER");
      this.setState({ allDoctor: dataSelect });
    }
    if (prevProps.allRequireDoctorInfo !== this.props.allRequireDoctorInfo) {
      let { price, payment, province } = this.props.allRequireDoctorInfo;

      let dataSelectPrice = this.buildDataInputSelect(price, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(payment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(province, "PROVINCE");
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  render() {
    let { hasOldData, listPrice, listPayment, listProvince } = this.state;
    let { allRequireDoctorInfo } = this.props;
    // console.log("state: ", this.state);
    return (
      <>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">
            <FormattedMessage id={"admin.manage-doctor.title"} />
          </div>
          <div className="more-info row">
            <div className="content-left form-group col-md-4">
              <label>
                <FormattedMessage id={"admin.manage-doctor.select-doctor"} />
              </label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.allDoctor}
                placeholder="Chọn bác sĩ"
              />
            </div>
            <div className="content-right col-md-8">
              <label>
                <FormattedMessage id={"admin.manage-doctor.intro"} />
              </label>
              <textarea
                className="form-control"
                // rows="1"
                value={this.state.description}
                onChange={(event) => this.handleOnChangeDesc(event)}
              ></textarea>
            </div>
          </div>
          <div className="more-info-extra row">
            <div className="col-md-4 form-group">
              <label>Chọn giá:</label>
              <Select
                value={this.state.selectedPrice}
                onChange={this.handleChangeSelect}
                options={this.state.listPrice}
                placeholder="Chọn giá"
              />
            </div>

            <div className="col-md-4 form-group">
              <label>Phương thức thanh toán:</label>
              <Select
                value={this.state.selectedPayment}
                onChange={this.handleChangeSelect}
                options={this.state.listPayment}
                placeholder="chọn phương thức thanh toán"
              />
            </div>

            <div className="col-md-4 form-group">
              <label>Chọn tỉnh thành:</label>
              <Select
                value={this.state.selectedProvince}
                onChange={this.handleChangeSelect}
                options={this.state.listProvince}
                placeholder="Chọn tỉnh thành"
              />
            </div>
          </div>

          <div className="more-info-extra row">
            <div className="col-md-4 form-group">
              <label>Tên phòng khám:</label>
              <input className="form-control" />
            </div>

            <div className="col-md-4 form-group">
              <label>Địa chỉ phòng khám:</label>
              <input className="form-control" />
            </div>

            <div className="col-md-4 form-group">
              <label>Note:</label>
              <input className="form-control" />
            </div>
          </div>

          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange} // chuyền props không cần dùng arrow function
              value={this.state.contentMarkdown}
            />
          </div>
          <button
            className={
              hasOldData === true
                ? "btn btn-warning save-content-doctor"
                : "btn btn-primary create-content-doctor"
            }
            onClick={() => this.handleSaveContentMarkdown()}
          >
            {hasOldData === true ? (
              <span>
                <FormattedMessage id={"admin.manage-doctor.save"} />
              </span>
            ) : (
              <span>
                <FormattedMessage id={"admin.manage-doctor.add"} />
              </span>
            )}
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
    allRequireDoctorInfo: state.admin.allRequireDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    getAllRequireDoctorInfo: () => dispatch(actions.getAllRequireDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
