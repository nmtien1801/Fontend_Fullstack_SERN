import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import appReducer from "./appReducer";
// import adminReducer from "./adminReducer";
import userReducer from "./userReducer";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

// làm cho mỗi trang admin đăng nhập
// const adminPersistConfig = {
//   ...persistCommonConfig,
//   key: "admin",
//   whitelist: ["isLoggedIn", "adminInfo"],
// };

// ai cũng có thể đang nhập
const userPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["isLoggedIn", "userInfo"],
};

const appPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["language"],  
};

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    // admin: persistReducer(adminPersistConfig, adminReducer),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig,appReducer),
  });
