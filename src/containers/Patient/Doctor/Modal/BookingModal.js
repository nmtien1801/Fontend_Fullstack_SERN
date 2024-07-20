import React, { Component } from "react";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { LANGUAGE } from "../../../../utils/constant";
import "./BookingModal.scss";
import { NumericFormat } from "react-number-format"; // format số tiền
import { Modal, Button, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {}

  render() {
    let { isOpenModalBooking, closeBookingModal, dataScheduleTimeModal } =
      this.props;
    let doctorID =
      !dataScheduleTimeModal && _.isEmpty(dataScheduleTimeModal)
        ? ""
        : dataScheduleTimeModal.doctorID;
    // console.log("props: ", this.props);
    return (
      <div>
        <Modal
          isOpen={isOpenModalBooking}
          //  toggle={() => setOpen(false)}
          size="lg"
          centered
          className="booking-modal-container"
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">Thông tin đặt lịch khám bệnh</span>
              <span className="right" onClick={closeBookingModal}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body">
              {/* hiện toàn bộ object -> chuyển về string */}
              {/* {JSON.stringify(dataScheduleTimeModal)} */}
              <div className="doctor-info">
                <ProfileDoctor
                  doctorID={doctorID}
                  isShowDescDoctor={false}
                  dataScheduleTimeModal={dataScheduleTimeModal}
                />
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Họ tên</label>
                  <input className="form-control"></input>
                </div>
                <div className="form-group col-md-6">
                  <label>Số điện thoại</label>
                  <input className="form-control"></input>
                </div>
                <div className="form-group col-md-6">
                  <label>Địa chỉ email</label>
                  <input className="form-control"></input>
                </div>
                <div className="form-group col-md-6">
                  <label>Địa chỉ liên hệ</label>
                  <input className="form-control"></input>
                </div>
                <div className="form-group col-12">
                  <label>Lý do khám</label>
                  <input className="form-control"></input>
                </div>
                <div className="form-group col-md-6">
                  <label>Đặt cho ai</label>
                  <input className="form-control"></input>
                </div>
                <div className="form-group col-md-6">
                  <label>Giới tính</label>
                  <input className="form-control"></input>
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button className="btn-booking-confirm btn btn-warning">
                Xác nhận
              </button>
              <button
                className="btn-booking-cancel btn btn-danger"
                onClick={closeBookingModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
