import React, { Component } from "react";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import { connect } from "react-redux";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";
import { LANGUAGE } from "../../../utils/constant";
import { Redirect } from "react-router-dom"; // điều hướng khi click vào secsion
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInfoDoctor } from "../../../services/userService";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorID: -1,
    };
  }

  async componentDidMount() {
    // lấy id phía sau /
    if (this.props && this.props.match.params && this.props.match.params.id) {
      this.setState({
        currentDoctorID: this.props.match.params.id, // chuyền props để mới vào deltailDoctor hiện lịch trong ng
      });

      let res = await getDetailInfoDoctor(this.props.match.params.id);
      // console.log("res: ", res);
      if (res && res.EC === 0) {
        this.setState({
          detailDoctor: res.DT,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    // console.log("currentDoctorID: ", this.state.currentDoctorID);
    let { detailDoctor } = this.state;
    let { language } = this.props;
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi} , ${detailDoctor.userName}`;
      nameEn = `${detailDoctor.positionData.valueEn} , ${detailDoctor.userName}`;
    }

    // fix bug render currentDoctorID = -1 khi mới run
    let currentDoctorID = this.state.currentDoctorID; // lấy giá trị cuối cùng từ setState
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              // chèn ảnh từ BE
              //![]()
              //![img](https://github.com/....jpg?raw=true)
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGE.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>{detailDoctor.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorID={currentDoctorID} />
            </div>
            <div className="content-right">
              <DoctorExtraInfo doctorID={currentDoctorID} />
            </div>
          </div>
          <div className="detail-info-doctor">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                //search: react html dangerous
                // chuyển html thành dạng text từ markdown
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
