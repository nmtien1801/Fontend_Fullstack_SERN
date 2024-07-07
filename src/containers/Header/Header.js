import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { toast } from "react-toastify";
import { logoutUser } from "../../services/userService";
import { LANGUAGE, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }

  handleLogout = async () => {
    localStorage.removeItem("JWT"); // clear local storage
    let data = await logoutUser(); // clear cookies
    if (data && +data.EC === 0) {
      toast.success("logout success...");
      // redux tự đẩy về trang login
    } else {
      toast.error(data.EM);
    }
  };

  handleChangeLanguage = (language) => {
    this.props.changeLanguageApp(language);
  };

  componentDidMount() {
    // phân quyền menu
    console.log("check userInfo: ", this.props.userInfo);
    let menu = [];
    let { userInfo } = this.props;
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleID;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }

    this.setState({
      menuApp: menu,
    });
  }

  render() {
    const { processLogout, language, userInfo } = this.props;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className="language">
          <span className="welcome">
            <FormattedMessage id="home-header.welcome" />,
            {userInfo && userInfo.userName ? " " + userInfo.userName : ""}
          </span>
          <span
            className={
              language === LANGUAGE.VI ? "language-vi active" : "language-vi"
            }
            onClick={() => this.handleChangeLanguage(LANGUAGE.VI)}
          >
            VN
          </span>
          <span
            className={
              language === LANGUAGE.EN ? "language-en active" : "language-en"
            }
            onClick={() => this.handleChangeLanguage(LANGUAGE.EN)}
          >
            EN
          </span>

          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={() => {
              processLogout();
              this.handleLogout();
            }}
            title="Logout"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageApp: (language) => dispatch(actions.changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
