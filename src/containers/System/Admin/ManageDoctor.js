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
      selectedOption: "", // biến chứa chọn trong select doctor {label: "", value: ""}
      description: "",
      allDoctor: [],
      hasOldData: false, // đã có dữ liệu hay chưa

      // save to doctor_info table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],

      selectedPrice: "", //{label: "", value: ""}
      selectedPayment: "",
      selectedProvince: "",
      selectClinic: "",
      selectSpecialty: "",

      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicID: "",
      specialtyID: "",
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
      doctorID: this.state.selectedOption.value, // chỉ lấy id (value) không lấy label
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,

      action: hasOldData === false ? CRUD_ACTION.CREATE : CRUD_ACTION.EDIT,

      clinicID:
        this.state.selectClinic && this.state.selectClinic.value
          ? this.state.selectClinic.value
          : "",
      specialtyID:
        this.state.selectSpecialty && this.state.selectSpecialty.value
          ? this.state.selectSpecialty.value
          : "",
    });
  };

  handleChangeSelect = async (selectedOption) => {
    // search: react-markdown-editor-lite set default value
    // hàm để lấy id và set ND vào các input
    // để set ND vào select thì phải có dạng {label: "", value: ""}
    this.setState({ selectedOption });
    let res = await getDetailInfoDoctor(selectedOption.value);

    if (
      res &&
      res.EC === 0 &&
      res.DT &&
      res.DT.Markdown &&
      res.DT.Doctor_Info
    ) {
      let markdown = res.DT.Markdown;
      let Doctor_Info = res.DT.Doctor_Info;

      // để set ND vào select thì phải có dạng {label: "", value: ""}
      let { listPrice, listPayment, listProvince, listSpecialty, listClinic } =
        this.state;

      let findItemPayment = listPayment.find(
        (item) => item.value === Doctor_Info.paymentID // get Doctor_Info có dạng là id nên cần find về select
      );
      let findItemProvince = listProvince.find(
        (item) => item.value === Doctor_Info.provinceID
      );
      let findItemPrice = listPrice.find(
        (item) => item.value === Doctor_Info.priceID
      );
      let findItemSpecialty = listSpecialty.find(
        (item) => item.value === Doctor_Info.specialtyID
      );
      let findItemClinic = listClinic.find(
        (item) => item.value === Doctor_Info.clinicID
      );

      this.setState({
        contentMarkdown: markdown.contentMarkdown,
        contentHTML: markdown.contentHTML,
        description: markdown.description,
        hasOldData: true,

        selectedPrice: findItemPrice,
        selectedPayment: findItemPayment,
        selectedProvince: findItemProvince,
        nameClinic: Doctor_Info.nameClinic,
        addressClinic: Doctor_Info.addressClinic,
        note: Doctor_Info.note,

        selectClinic: findItemClinic,
        selectSpecialty: findItemSpecialty,
      });
    }
    // xoá trắng nếu không có dữ liệu
    else {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
        hasOldData: false,

        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
        nameClinic: "",
        addressClinic: "",
        note: "",
        selectClinic: "",
        selectSpecialty: "",
      });
    }
  };

  handleOnChangeText = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({ ...copyState });
  };

  buildDataInputSelect = (inputData, type) => {
    let rs = [];
    let { language } = this.props;

    if (inputData && inputData.length > 0) {
      if (type === "USER") {
        inputData.map((item, index) => {
          let obj = {};
          obj.label = item.userName;
          obj.value = item.id;
          rs.push(obj);
        });
      }
      // price phải format giá tiền nên không thể dùng chung với payment và province
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let obj = {};
          let labelVi = item.valueVi;
          let labelEn = `${item.valueEn} USD`;
          obj.label = language === LANGUAGE.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          rs.push(obj);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let obj = {};
          let labelVi = item.valueVi;
          let labelEn = item.valueEn;
          obj.label = language === LANGUAGE.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          rs.push(obj);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let obj = {};

          obj.label = item.name;
          obj.value = item.id;
          rs.push(obj);
        });
      }
      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let obj = {};

          obj.label = item.name;
          obj.value = item.id;
          rs.push(obj);
        });
      }
    }

    return rs;
  };

  handleChangeSelectDoctorInfo = (selectedOption, name) => {
    // console.log("selectedOption: ", selectedOption);
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;

    this.setState({ ...stateCopy });
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
      let { price, payment, province, specialty } =
        this.props.allRequireDoctorInfo;
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor, "USER");
      let dataSelectPrice = this.buildDataInputSelect(price, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(payment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(province, "PROVINCE");
      let dataSelectSpecialty = this.buildDataInputSelect(
        specialty,
        "SPECIALTY"
      );

      this.setState({
        allDoctor: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
      });
    }
    if (prevProps.allRequireDoctorInfo !== this.props.allRequireDoctorInfo) {
      let { price, payment, province, specialty, clinic } =
        this.props.allRequireDoctorInfo;

      let dataSelectPrice = this.buildDataInputSelect(price, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(payment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(province, "PROVINCE");
      let dataSelectSpecialty = this.buildDataInputSelect(
        specialty,
        "SPECIALTY"
      );
      let dataSelectClinic = this.buildDataInputSelect(clinic, "CLINIC");

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
  }

  render() {
    let { hasOldData, listPrice, listPayment, listProvince, listSpecialty } =
      this.state;
    let { allRequireDoctorInfo } = this.props;
    console.log("state1: ", this.state);
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
                placeholder={
                  <FormattedMessage id={"admin.manage-doctor.select-doctor"} />
                }
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
                onChange={(event) =>
                  this.handleOnChangeText(event, "description")
                }
              ></textarea>
            </div>
          </div>

          <div className="more-info-extra row">
            <div className="col-md-4 form-group">
              <label>
                <FormattedMessage id={"admin.manage-doctor.price"} />
              </label>
              <Select
                value={this.state.selectedPrice}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listPrice}
                placeholder={
                  <FormattedMessage id={"admin.manage-doctor.price"} />
                }
                name="selectedPrice"
              />
            </div>

            <div className="col-md-4 form-group">
              <label>
                <FormattedMessage id={"admin.manage-doctor.payment"} />
              </label>
              <Select
                value={this.state.selectedPayment}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listPayment}
                placeholder={
                  <FormattedMessage id={"admin.manage-doctor.payment"} />
                }
                name="selectedPayment"
              />
            </div>

            <div className="col-md-4 form-group">
              <FormattedMessage id={"admin.manage-doctor.province"} />
              <Select
                value={this.state.selectedProvince}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listProvince}
                placeholder={
                  <FormattedMessage id={"admin.manage-doctor.province"} />
                }
                name="selectedProvince"
              />
            </div>
          </div>

          <div className="more-info-extra row">
            <div className="col-md-4 form-group">
              <label>
                <FormattedMessage id={"admin.manage-doctor.nameClinic"} />
              </label>
              <input
                className="form-control"
                onChange={(event) =>
                  this.handleOnChangeText(event, "nameClinic")
                }
                value={this.state.nameClinic}
              />
            </div>

            <div className="col-md-4 form-group">
              <label>
                <FormattedMessage id={"admin.manage-doctor.addressClinic"} />
              </label>
              <input
                className="form-control"
                onChange={(event) =>
                  this.handleOnChangeText(event, "addressClinic")
                }
                value={this.state.addressClinic}
              />
            </div>

            <div className="col-md-4 form-group">
              <label>
                <FormattedMessage id={"admin.manage-doctor.note"} />
              </label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeText(event, "note")}
                value={this.state.note}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 form-group">
              <label>
                <FormattedMessage id={"admin.manage-doctor.specialty"} />
              </label>
              <Select
                value={this.state.selectSpecialty}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listSpecialty}
                placeholder={
                  <FormattedMessage id={"admin.manage-doctor.specialty"} />
                }
                name="selectSpecialty"
              />
            </div>

            <div className="col-md-4 form-group">
              <label>
                <FormattedMessage id={"admin.manage-doctor.clinic"} />
              </label>
              <Select
                value={this.state.selectClinic}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listClinic}
                placeholder={
                  <FormattedMessage id={"admin.manage-doctor.clinic"} />
                }
                name="selectClinic"
              />
            </div>
          </div>

          {/* markDown */}
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "300px" }}
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
