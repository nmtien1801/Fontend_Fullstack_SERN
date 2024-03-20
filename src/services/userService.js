import customizeAxios from "../setup/customizeAxios";

const handleLoginApi = (valueLogin, password) => {
  return customizeAxios.post(`/api/v1/login`, { valueLogin, password });
};

const logoutUser = () => {
  return customizeAxios.post("/api/v1/logout");
};

const fetchAllUser = (page, limit) => {
  // dùng `` (temlate string) để nối chuỗi nhanh thay +
  return customizeAxios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
};

const fetchGroup = () => {
  return customizeAxios.get("/api/v1/group/read");
};

const createNewUser = (userData) => {
  return customizeAxios.post("/api/v1/user/create", {
    ...userData,
  });
};

const updateCurrentUser = (userData) => {
  return customizeAxios.put("/api/v1/user/update", {
    ...userData,
  });
};

const deleteUser = (user) => {
  return customizeAxios.delete("/api/v1/user/delete", {
    data: { id: user.id },
    // headers: { Authorization: "***" },
  });
};
export {
  handleLoginApi,
  fetchAllUser,
  fetchGroup,
  createNewUser,
  updateCurrentUser,
  deleteUser,
  logoutUser,
};
