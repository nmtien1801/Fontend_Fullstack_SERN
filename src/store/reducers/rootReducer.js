import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";

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
// nơi đây là cấu hình localStorage cho FE
// persist:user
const userPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["isLoggedIn", "userInfo"],
};

// bug: bị thay đổi state redux khi dùng 2 redux khác nhau
const appPersistConfig = {
  ...persistCommonConfig,
  key: "app",
  whitelist: ["language"],
};

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    // admin: persistReducer(adminPersistConfig, adminReducer),
    user: persistReducer(userPersistConfig, userReducer), // lưu trong localStorage
    app: persistReducer(appPersistConfig, appReducer),
    admin: adminReducer, // không lưu trong localStorage
  });
