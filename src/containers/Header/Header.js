import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { toast } from "react-toastify";
import { logoutUser } from "../../services/userService";

class Header extends Component {
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

  render() {
    const { processLogout } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>

        {/* nút logout */}
        <div
          className="btn btn-logout"
          onClick={() => {
            processLogout();
            this.handleLogout();
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
