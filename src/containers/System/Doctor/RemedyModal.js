// phương thuốc
import React, { Component } from "react";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import { connect } from "react-redux";
// import "./RemedyModal.scss";
import { Modal, Button, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils"; // config base64

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }

  handleOnChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  // search : react PreviewImage
  // ảnh
  // NOTE: không phóng tó ảnh
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file); // chuyển file ảnh(blop) sang base64 (blob) để lưu db

      // search: react read file to base 64 -> how to convert
      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  render() {
    let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;
    let { email } = this.state;
    return (
      <div>
        <Modal
          isOpen={isOpenModal}
          //  toggle={() => setOpen(false)}
          size="lg"
          centered
          className="modal-container"
        >
          <div className="modal-content">
            <div className="modal-header">
              <span className="left">Gửi hoá đơn khám bệnh thành công</span>
              <span className="right" onClick={closeRemedyModal}>
                <i className="fas fa-times"></i>
              </span>
            </div>

            <div className="model-body">
              <div className="row m-3">
                <div className="col-md-6 form-group">
                  <label>Email bệnh nhân</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email || ""}
                    onChange={(e) => this.handleOnChangeEmail(e)}
                  />
                </div>

                <div className="col-md-6 form-group">
                  <label>Chọn file đơn thuốc</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => this.handleOnChangeImage(e)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-confirm btn btn-warning"
                onClick={() => this.handleSendRemedy()}
              >
                Send
              </button>
              <button
                className="btn-cancel btn btn-danger"
                onClick={closeRemedyModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
