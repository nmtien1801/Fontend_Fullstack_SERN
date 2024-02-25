import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
  }

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
                //     className={
                //       objvalidInput.isValidValueLogin
                //         ? "form-control"
                //         : "form-control is-invalid"
                //     }
                type="text"
                placeholder="Email addrest or phone number"
                //     value={valueLogin}
                //     onChange={(event) => {
                //       setValueLogin(event.target.value);
                //     }}
              />
              <input
                //     className={
                //       objvalidInput.isValidPassword
                //         ? "form-control"
                //         : "form-control is-invalid"
                //     }
                type="password"
                placeholder="Password"
                //     value={password}
                //     onKeyPress={(event) => {
                //       handlePressEnter(event);
                //     }}
                //     onChange={(event) => {
                //       setPassword(event.target.value);
                //     }}
              />
              <button
                className="btn btn-primary login"
                onClick={() => {
                  // handleLogin();
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
                  // onClick={() => handleCreateNewAccount()}
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
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
