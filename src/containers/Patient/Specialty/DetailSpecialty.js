import React, { Component } from "react";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGE } from "../../../utils/constant";
import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDetailSpecialtyById,
  getAllCode,
} from "../../../services/userService";
import _, { create } from "lodash";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorID: [], //dùng để show nhiều doctor khi click vào -> dùng map để show
      dataDetailSpecialty: {}, // dùng để show chuyên ngành trên cùng
      listProvince: [],
    };
  }

  handleOneChangeSelect = async (e) => {
    if (this.props && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      let location = e.target.value;
      let res = await getDetailSpecialtyById({ id, location });
      let resProvince = await getAllCode("PROVINCE");

      if (res && res.EC === 0) {
        let data = res.DT;
        let arrDoctorID = [];

        if (data && !_.isEmpty(data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arrDoctorID = arr.map((item) => {
              return item.doctorID;
            });
          }
        }
        this.setState({
          dataDetailSpecialty: res.DT,
          arrDoctorID: arrDoctorID,
        });
      }
    }
  };

  async componentDidMount() {
    // lấy id phía sau /
    if (this.props && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      let location = "ALL"; // mới vào lấy tất cả
      let res = await getDetailSpecialtyById({ id, location });
      let resProvince = await getAllCode("PROVINCE");

      if (res && res.EC === 0 && resProvince && resProvince.EC === 0) {
        let data = res.DT;
        let arrDoctorID = [];

        if (data && !_.isEmpty(data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arrDoctorID = arr.map((item) => {
              return item.doctorID;
            });
          }
        }

        let dataProvince = resProvince.DT;
        // gán thêm giá trị All vào tỉnh thành để lọc location = ALL
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.push({
            createAt: null,
            keyMap: "ALL",
            valueVi: "Toàn quốc",
            valueEn: "All",
          });
        }

        this.setState({
          dataDetailSpecialty: res.DT,
          arrDoctorID: arrDoctorID,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {}

  render() {
    let { arrDoctorID, dataDetailSpecialty, listProvince } = this.state;
    let { language } = this.props;
    console.log("state", this.state);

    return (
      <>
        <div className="detail-specialty-container">
          <HomeHeader />
          <div className="detail-specialty-body">
            <div className="description-specialty">
              {/* search: react html dangerous -> dùng markdown
               chuyển html thành dạng text từ markdown */}
              {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailSpecialty.descriptionHTML,
                  }}
                ></div>
              )}
            </div>

            <div className="search-sp-doctor">
              <select onChange={(e) => this.handleOneChangeSelect(e)}>
                {listProvince &&
                  listProvince.length > 0 &&
                  listProvince.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                      </option>
                    );
                  })}
              </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
