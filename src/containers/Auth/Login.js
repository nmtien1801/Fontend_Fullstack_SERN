import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { handleLoginApi } from "../../services/userService";
import { toast } from "react-toastify";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueLogin: "",
      password: "",
      isShowPassword: false,
      isValidValueLogin: true,
      isValidPassword: true,
      errMessage: "",
    };
  }
  setValueLogin = (event) => {
    this.setState({
      valueLogin: event.target.value,
    });
  };
  setPassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    let res = await handleLoginApi(this.state.valueLogin, this.state.password);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      this.props.userLoginSuccess(res.DT);
    } else {
      toast.error(res.EM);
      this.setState({
        errMessage: res.EM,
      });
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  // search: press ENTER: react on keypress
  handlePressEnter = (event) => {
    if (event.key === "Enter" && event.charCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="container">
          <div className="row px-3 px-ms-0">
            <div className="content-left col-12 d-none col-sm-7 d-sm-block">
              <div className="brand">
                <Link to="/">
                  <span>this is logo</span>
                </Link>
              </div>
              <div className="detail">This is detail</div>
            </div>
            <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 my-3 ">
              <div className="brand d-sm-none">This is logo</div>
              <input
                className={
                  this.state.isValidValueLogin
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                placeholder="Email addrest or phone number"
                value={this.state.valueLogin}
                onChange={(event) => {
                  this.setValueLogin(event);
                }}
              />
              <div className="custom-input-password">
                <input
                  className={
                    this.state.isValidPassword
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder="Password"
                  value={this.password}
                  onKeyPress={(event) => {
                    this.handlePressEnter(event);
                  }}
                  onChange={(event) => {
                    this.setPassword(event);
                  }}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fas fa-eye-slash"
                        : "far fa-eye"
                    }
                  ></i>
                </span>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <button
                className="btn btn-primary login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
              <span className="forgot-password">
                <a href="#" className="">
                  forgot your password ?
                </a>
                <span className="mx-5"></span>
                <span className="social-login">
                  <i className="fab fa-google-plus-g google"></i>
                  <i className="fab fa-facebook-f facebook"></i>
                </span>
              </span>

              <div className="btn-createAccount">
                <button
                  className="btn btn-success"
                  // onClick={() => this.handleCreateNewAccount()}
                >
                  Create New Acount
                </button>

                <div className="mt-3 return">
                  <Link to="/">
                    <i className="fa fa-arrow-circle-left "></i>
                    <span title="return to home page">Return To HomePage</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  return {
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) =>dispatch(actions.adminLoginSuccess(adminInfo)),
    // adminLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: () => dispatch(actions.userLoginSuccess()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
