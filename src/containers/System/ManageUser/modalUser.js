import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import {
  fetchGroup,
  createNewUser,
  updateCurrentUser,
} from "../../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash"; // react hook not merge state
import "../../../styles/userManage.scss";

const ModalUser = (props) => {
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const [address, setAddress] = useState("");
  // const [sex, setSex] = useState("");
  // const [group, setGroup] = useState("");

  const defaultUserData = {
    email: "",
    phone: "",
    userName: "",
    password: "", //passWord
    address: "",
    sex: "",
    group: "", //groupID
  };
  const validInputsDefault = {
    email: true,
    phone: true,
    userName: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  const [userData, setUserData] = useState(defaultUserData);
  const [validInput, setValidInput] = useState(validInputsDefault);
  const [userGroup, setUserGroup] = useState([]);

  useEffect(() => {
    getGroup();
  }, []);

  useEffect(() => {
    if (props.action === "UPDATE") {
      setUserData({
        ...props.dataModal,
        group: props.dataModal.Group ? props.dataModal.Group.id : "",
      });
    }
  }, [props.dataModal]);

  // fix lỗi valid group khi từ edit chuyển sang create
  useEffect(() => {
    if (props.action === "CREATE") {
      if (userGroup && userGroup.length > 0) {
        setUserData({ ...userData, group: userGroup[0].id });
      }
    }
  }, [props.action]);

  const getGroup = async () => {
    let res = await fetchGroup();
    if (res && res.EC === 0) {
      setUserGroup(res.DT);
      // gán mặc định group là select đầu tiên và kiểu là id cho trùng db
      if (res.DT && res.DT.length > 0) {
        let defaultGroup = res.DT;
        setUserData({ ...defaultUserData, group: defaultGroup[0].id });
      }
    } else {
      toast.error(res.EM);
    }
  };

  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData); // sao chép lại userData
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidInput = () => {
    //update user
    if (props.action === "UPDATE") return true;
    // create user
    setValidInput(validInputsDefault);
    let arr = ["email", "phone", "password", "group"];
    let check = true;
    let regexEmail = /\S+@\S+\.\S+/;
    let regexPhone = /0([0-9]{9})/;
    let regexPassword = /^.{4,}$}/;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInput = _.cloneDeep(validInputsDefault);
        _validInput[arr[i]] = false;
        setValidInput(_validInput);

        toast.error(`empty input ${arr[i]}`);
        check = false;
        break;
      }
      if (!regexEmail.test(userData["email"])) {
        let _validInput = _.cloneDeep(validInputsDefault);
        _validInput["email"] = false;
        setValidInput(_validInput);

        toast.error(`regexEmail error ${"email"}`);
        check = false;
        break;
      }
      if (!regexPhone.test(userData["phone"])) {
        let _validInput = _.cloneDeep(validInputsDefault);
        _validInput["phone"] = false;
        setValidInput(_validInput);

        toast.error(`regexPhone error ${"phone"}`);
        check = false;
        break;
      }
    }
    return check;
  };

  const handleConfirmUser = async () => {
    let check = checkValidInput();
    if (check === true) {
      let res =
        props.action === "CREATE"
          ? await createNewUser({
              ...userData,
              // passWord: userData["password"], // thay vì đổi group thành groupId ta chèn mới
              groupID: userData["group"],
            })
          : await updateCurrentUser({
              ...userData,
              groupID: userData["group"],
            });
      if (res && res.EC === 0) {
        props.onHideModalUser();
        // refesh thì group bị lỗi valid(mất giá trị mặc định) nên cần set lại kiểu id trùng với db
        setUserData({
          ...defaultUserData,
          group: userGroup && userGroup.length > 0 ? userGroup[0].id : "",
        });
      } else {
        toast.error(res.EM);
        let _validInput = _.cloneDeep(validInputsDefault);
        _validInput[res.DT] = false;
        setValidInput(_validInput);
      }
    }
  };

  const handleCloseModalUser = () => {
    props.onHideModalUser();
    setUserData(defaultUserData);
    setValidInput(validInputsDefault);
  };

  return (
    <>
      <Modal
        show={props.show}
        size="lg"
        onHide={() => {
          handleCloseModalUser();
        }}
        animation={true}
        className="modal-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {props.action === "CREATE" ? "CREATE NEW USER" : "EDIT USER"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row ">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email address (<span className="red">*</span>) :
              </label>
              <input
                disabled={props.action === "CREATE" ? false : true}
                className={
                  validInput.email ? "form-control " : "form-control is-invalid"
                }
                type="email"
                value={userData.email}
                onChange={(event) => {
                  handleOnChangeInput(event.target.value, "email");
                }}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number (<span className="red">*</span>) :
              </label>
              <input
                disabled={props.action === "CREATE" ? false : true}
                className={
                  validInput.phone ? "form-control " : "form-control is-invalid"
                }
                type="number"
                value={userData.phone}
                onChange={(event) => {
                  handleOnChangeInput(event.target.value, "phone");
                }}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                User name (<span className="red">*</span>) :
              </label>
              <input
                className={
                  validInput.userName
                    ? "form-control "
                    : "form-control is-invalid"
                }
                type="text"
                value={userData.userName}
                onChange={(event) => {
                  handleOnChangeInput(event.target.value, "userName");
                }}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              {props.action === "CREATE" && (
                <>
                  <label>
                    Password (<span className="red">*</span>) :
                  </label>
                  <input
                    className={
                      validInput.password
                        ? "form-control "
                        : "form-control is-invalid"
                    }
                    type="password"
                    value={userData.password}
                    onChange={(event) => {
                      handleOnChangeInput(event.target.value, "password");
                    }}
                  />
                </>
              )}
            </div>
            <div className="col-12 col-sm-12 form-group">
              <label>Address:</label>
              <input
                className={
                  validInput.address
                    ? "form-control "
                    : "form-control is-invalid"
                }
                type="text"
                value={userData.address}
                onChange={(event) => {
                  handleOnChangeInput(event.target.value, "address");
                }}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="GenderSelect">Gender :</label>
              <select
                id="GenderSelect"
                className="form-select"
                value={userData.sex}
                onChange={(event) => {
                  handleOnChangeInput(event.target.value, "sex");
                }}
              >
                <option defaultValue={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
                <option value={"Other"}>Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="GroupSelect">
                Group (<span className="red">*</span>) :
              </label>
              <select
                id="GroupSelect"
                className={
                  validInput.group ? "form-select" : "form-select is-invalid"
                }
                value={userData.group}
                onChange={(event) => {
                  handleOnChangeInput(event.target.value, "group");
                }}
              >
                {userGroup &&
                  userGroup.length > 0 &&
                  userGroup.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleCloseModalUser();
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleConfirmUser();
            }}
          >
            {props.action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
