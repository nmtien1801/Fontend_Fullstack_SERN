import React, { Component } from "react";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGE } from "../../../utils/constant";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Lightbox from "react-image-lightbox"; // thư viện phóng to ảnh
import { CommonUtils } from "../../../utils"; // config base64
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(); // convert từ text sang HTML

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "", // để lưu ảnh db
      previewIMG: "", // để xem và get ảnh từ db (blop để phóng to)
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }

  // search : react PreviewImage
  // ảnh
  handleOnChangeImage = async (event) => {
    let data = event;
    let file = data[0];
    if (file) {
      let objectURL = URL.createObjectURL(file); // FE đọc được file blop
      let base64 = await CommonUtils.getBase64(file); // chuyển file ảnh(blop) sang base64 (blob) để lưu db

      // search: react read file to base 64 -> how to convert
      this.setState({
        imageBase64: base64,
        previewIMG: objectURL,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewIMG) return;
    this.setState({ isOpen: true });
  };

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({ ...stateCopy });
  };

  // MdEditor cần là props có sẵn: chuyền props không cần dùng arrow function
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };

  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialty(this.state);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      // xoá trắng
      this.setState({
        name: "",
        imageBase64: "",
        previewIMG: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error(res.EM);
      console.log("error handleSaveNewSpecialty", res);
    }
  };

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {}

  render() {
    let { previewIMG } = this.state;
    return (
      <>
        <div className="manage-specialty-container">
          <div className="ms-title">Quản lý chuyên khoa</div>

          <div className="add-new-specialty row">
            <div className="col-md-6 form-group">
              <label htmlFor="specialtyName">Tên chuyên khoa</label>
              <input
                type="text"
                className="form-control"
                id="specialtyName"
                value={this.state.name}
                onChange={(event) => this.handleOnChangeInput(event, "name")}
                // placeholder="Enter specialty name"
              />
            </div>
            <div className="col-md-6 form-group">
              <div className="preview-img-container">
                <input
                  id="specialtyImage"
                  hidden
                  type="file"
                  onChange={(event) => {
                    this.handleOnChangeImage(event.target.files);
                  }}
                />

                <label htmlFor="specialtyImage" className="label-upload ">
                  Ảnh chuyên khoa
                  <i className="fas fa-upload"></i>
                </label>
                <div
                  className="preview-image form-control"
                  style={{
                    backgroundImage: `url(${previewIMG})`,
                  }}
                  onClick={() => this.openPreviewImage()}
                ></div>
              </div>
            </div>

            {/* markdown */}
            <div className="col-12">
              <MdEditor
                style={{ height: "300px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange} // chuyền props không cần dùng arrow function
                value={this.state.descriptionMarkdown}
              />
            </div>

            <div className="btn-save-specialty">
              <button
                className="btn btn-primary"
                onClick={() => this.handleSaveNewSpecialty()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        {/* thư viện phóng to ảnh chọn khi click vào */}
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewIMG}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
