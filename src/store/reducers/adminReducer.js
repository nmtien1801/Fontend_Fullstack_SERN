import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  isLoadingPosition: false,
  isLoadingRoles: false,
  genders: [],
  roles: [],
  position: [],

  listUser: [],
  totalPage: 1,

  topDoctor: [],
  allDoctor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      // console.log("start: ", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.isLoadingGender = false;
      state.genders = action.data;
      // console.log("success: ", action);

      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      state.isLoadingGender = false;
      state.genders = [];
      console.log("fail: ", action);

      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      state.isLoadingPosition = false;
      state.position = action.data;
      // console.log("success: ", action);

      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      state.isLoadingPosition = false;
      state.position = [];
      console.log("fail: ", action);

      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      state.isLoadingRoles = false;
      state.roles = action.data;
      // console.log("success: ", action);

      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      state.isLoadingRoles = false;
      state.roles = [];
      console.log("fail: ", action);

      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.listUser = action.user.users; // giảm dần: .reverse()
      state.totalPage = action.user.totalPage;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAIL:
      state.listUser = [];
      state.totalPage = 0;

      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctor = action.dataDoctor;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAIL:
      state.topDoctor = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctor = action.dataDoctor;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAIL:
      state.allDoctor = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
