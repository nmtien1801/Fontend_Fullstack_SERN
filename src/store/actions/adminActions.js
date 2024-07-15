import actionTypes from "./actionTypes";
import {
  getAllCode,
  createNewUser,
  fetchAllUser,
  deleteUser,
  updateCurrentUser,
  getTopDoctorHome,
  getAllDoctor,
  saveDetailDoctorService,
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });

      let res = await getAllCode("gender");
      if (res && res.EC === 0) {
        dispatch(fetchGenderSuccess(res.DT));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (error) {
      dispatch(fetchGenderFail());
      console.log("err: ", error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("position");
      if (res && res.EC === 0) {
        dispatch(fetchPositionSuccess(res.DT));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (error) {
      dispatch(fetchPositionFail());
      console.log("err: ", error);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("role");
      if (res && res.EC === 0) {
        dispatch(fetchRoleSuccess(res.DT));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (error) {
      dispatch(fetchRoleFail());
      console.log("err: ", error);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

export const createNewUserRedux = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUser(user);
      if (res && res.EC === 0) {
        dispatch(createUserSuccess());
        // load lại table khi thêm mới user
        dispatch(fetchAllUserStart(1, 2));
        toast.success(res.EM);
      } else {
        dispatch(createUserFail());
        toast.success(res.EM);
      }
    } catch (error) {
      dispatch(createUserFail());
      console.log("err: ", error);
    }
  };
};

export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFail = () => ({
  type: actionTypes.CREATE_USER_FAIL,
});

export const editUserRedux = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await updateCurrentUser(user);
      if (res && res.EC === 0) {
        dispatch(editUserSuccess());
        // load lại table khi thêm mới user
        dispatch(fetchAllUserStart(1, 2));
        toast.success(res.EM);
      } else {
        dispatch(editUserFail());
        toast.success(res.EM);
      }
    } catch (error) {
      dispatch(editUserFail());
      console.log("err: ", error);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFail = () => ({
  type: actionTypes.EDIT_USER_FAIL,
});

export const fetchAllUserStart = (currentPage, currentLimit) => {
  return async (dispatch, getState) => {
    try {
      let res = await fetchAllUser(currentPage, currentLimit);
      let res1 = await getTopDoctorHome(10);

      if (res && res.EC === 0) {
        dispatch(fetchAllUserSuccess(res.DT));
      } else {
        dispatch(fetchAllUserFail());
      }
    } catch (error) {
      dispatch(fetchAllUserFail());
      console.log("err fetchAllUser: ", error);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  user: data,
});

export const fetchAllUserFail = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAIL,
});

export const deleteUserRedux = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUser(user);
      if (res && res.EC === 0) {
        dispatch(deleteUserSuccess());
        // load lại table khi thêm mới user
        dispatch(fetchAllUserStart(1, 2));
        toast.success(res.EM);
      } else {
        dispatch(deleteUserFail());
        toast.error(res.EM);
      }
    } catch (error) {
      dispatch(deleteUserFail());
      console.log("err: ", error);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHome(10);
      if (res && res.EC === 0) {
        dispatch(fetchTopDoctorSuccess(res.DT));
      } else {
        dispatch(fetchTopDoctorFail());
      }
    } catch (error) {
      dispatch(fetchTopDoctorFail());
      console.log("err: ", error);
    }
  };
};

export const fetchTopDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
  dataDoctor: data,
});

export const fetchTopDoctorFail = () => ({
  type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
});

export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctor();
      if (res && res.EC === 0) {
        dispatch(fetchAllDoctorSuccess(res.DT));
      } else {
        dispatch(fetchAllDoctorFail());
      }
    } catch (error) {
      dispatch(fetchAllDoctorFail());
      console.log("err: ", error);
    }
  };
};

export const fetchAllDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
  dataDoctor: data,
});

export const fetchAllDoctorFail = () => ({
  type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
});

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.EC === 0) {
        dispatch(saveDetailDoctorSuccess());
        toast.success(res.EM);
      } else {
        dispatch(saveDetailDoctorFail());
        toast.error(res.EM);
      }
    } catch (error) {
      dispatch(saveDetailDoctorFail());
      console.log("err: ", error);
    }
  };
};

export const saveDetailDoctorSuccess = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
});

export const saveDetailDoctorFail = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
});

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("TIME");
      if (res && res.EC === 0) {
        dispatch(fetchAllScheduleTimeSuccess(res.DT));
        toast.success(res.EM);
      } else {
        dispatch(fetchAllScheduleTimeFail());
        toast.error(res.EM);
      }
    } catch (error) {
      dispatch(fetchAllScheduleTimeFail());
      console.log("err: ", error);
    }
  };
};

export const fetchAllScheduleTimeSuccess = (data) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
  dataTime: data,
});

export const fetchAllScheduleTimeFail = () => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL,
});

export const getAllRequireDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_START });

      let resPrice = await getAllCode("PRICE");
      let resProvince = await getAllCode("PROVINCE");
      let rePayment = await getAllCode("PAYMENT");

      if (
        resPrice &&
        resPrice.EC === 0 &&
        resProvince &&
        resProvince.EC === 0 &&
        rePayment &&
        rePayment.EC === 0
      ) {
        let data = {
          price: resPrice.DT,
          province: resProvince.DT,
          payment: rePayment.DT,
        };

        dispatch(getRequireDoctorInfoSuccess(data));
      } else {
        dispatch(getRequireDoctorInfoFail());
      }
    } catch (error) {
      dispatch(getRequireDoctorInfoFail());
      console.log("err: ", error);
    }
  };
};

export const getRequireDoctorInfoSuccess = (allRequireData) => ({
  type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS,
  allRequireData: allRequireData,
});

export const getRequireDoctorInfoFail = () => ({
  type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAIL,
});
