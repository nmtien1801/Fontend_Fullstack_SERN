import { useEffect, useState, useContext } from "react";
import "./register.scss";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userService";
import _ from "lodash";
import * as actions from "../../store/actions";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaulValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaulValidInput);

  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };

  // đẩy ra khi đã có người dùng này
  useEffect(() => {
    let { userInfo } = props;
    if (userInfo && !_.isEmpty(userInfo)) {
      history.push("/");
    }
  }, []);

  const isValidInput = () => {
    setObjCheckInput(defaulValidInput);
    if (!email) {
      toast.error("email is require");
      setObjCheckInput({ ...defaulValidInput, isValidEmail: false });
      return false;
    }
    let regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      setObjCheckInput({ ...defaulValidInput, isValidEmail: false });
      toast.error("please enter a valid email address");
      return false;
    }
    if (!phone) {
      toast.error("phone is require");
      setObjCheckInput({ ...defaulValidInput, isValidPhone: false });
      return false;
    }
    if (!userName) {
      toast.error("userName is require");
      return false;
    }
    if (!password) {
      toast.error("password is require");
      setObjCheckInput({ ...defaulValidInput, isValidPassword: false });
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("your password is not the same");
      setObjCheckInput({ ...defaulValidInput, isValidConfirmPassword: false });
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    let check = isValidInput();
    if (check === true) {
      let res = await registerNewUser(email, phone, userName, password);
      let serviceData = res;
      // +: convert number -> String
      if (+serviceData.EC === 0) {
        toast.success(serviceData.EM);
        history.push("/login");
      } else {
        toast.error(serviceData.EM);
        if (serviceData.DT === "email") {
          // bôi đỏ lại input bị sai
          setObjCheckInput({ ...defaulValidInput, isValidEmail: false });
        }
      }
    }
  };

  // press ENTER: react on keypress
  const handlePressEnter = (event) => {
    if (event.key === "Enter" && event.charCode === 13) {
      handleRegister();
    }
  };

  return (
    <div className="register-container">
      <div className="container">
        <div className="row px-3 px-ms-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">
              <Link to="/">
                <span title="Return to homePage">this is logo</span>
              </Link>
            </div>
            <div className="detail">This is detail</div>
          </div>
          <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 my-3 ">
            <div className="brand d-sm-none">This is logo</div>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                className={
                  objCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                id="Email"
                type="text"
                placeholder="Email addrest or phone number"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="SDT">SDT</label>
              <input
                className={
                  objCheckInput.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
                id="SDT"
                type="number"
                placeholder="số điện thoại"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userName">User Name</label>
              <input
                className="form-control "
                id="userName"
                type="text"
                placeholder="user Name"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className={
                  objCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Re_Password">Re-Enter Password</label>
              <input
                className={
                  objCheckInput.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                id="Re_Password"
                type="password"
                placeholder="Re-Enter Password"
                value={confirmPassword}
                onKeyPress={(event) => {
                  handlePressEnter(event);
                }}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Register
            </button>

            <div className="btn-createAccount">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already've an account. Login
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
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};
export default Register;
