import React, { Component } from "react";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGE } from "../../../utils/constant";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getDetailClinicById } from "../../../services/userService";
import _, { create } from "lodash";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorID: [], //dùng để show nhiều doctor khi click vào -> dùng map để show
      dataDetailClinic: {}, // dùng để show chuyên ngành trên cùng
    };
  }

  async componentDidMount() {
    // lấy id phía sau /
    if (this.props && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      let res = await getDetailClinicById({ id });

      if (res && res.EC === 0) {
        let data = res.DT;
        let arrDoctorID = [];

        if (data && !_.isEmpty(data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arrDoctorID = arr.map((item) => {
              return item.doctorID;
            });
          }
        }

        this.setState({
          dataDetailClinic: res.DT,
          arrDoctorID: arrDoctorID,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {}

  render() {
    let { arrDoctorID, dataDetailClinic } = this.state;
    let { language } = this.props;
    console.log("state", this.state);

    return (
      <>
        <div className="detail-Clinic-container">
          <HomeHeader />
          <div className="detail-Clinic-body">
            <div className="description-Clinic">
              {/* search: react html dangerous -> dùng markdown
               chuyển html thành dạng text từ markdown */}
              {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                <>
                  <div>{dataDetailClinic.name}</div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataDetailClinic.descriptionHTML,
                    }}
                  ></div>
                </>
              )}
            </div>

            {arrDoctorID &&
              arrDoctorID.length > 0 &&
              arrDoctorID.map((item, index) => {
                // Each child in a list should have a unique "key" prop. -> đưa key lên div cha
                return (
                  <div className="each-doctor" key={index}>
                    <div className="dt-content-left">
                      <div className="profile-doctor">
                        <ProfileDoctor
                          doctorID={item}
                          isShowDescDoctor={true} // không show "13:00 - 14:00 - thứ bảy - 27/07/2024"
                          isShowPrice={false} // không show 300.000đ
                          isShowLinkDetail={true} // show "xem thêm"
                        />
                      </div>
                    </div>

                    {/*  bể layout hàng dọc -> tạo các div con cho mỗi component  */}
                    <div className="dt-content-right">
                      <div className="doctor-schedule">
                        <DoctorSchedule doctorID={item} />
                      </div>
                      <div className="doctor-extra-info">
                        <DoctorExtraInfo doctorID={item} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
