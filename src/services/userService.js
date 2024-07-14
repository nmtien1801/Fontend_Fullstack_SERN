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

const getAllCode = (inputData) => {
  return customizeAxios.get(`/api/allCode?type=${inputData}`);
};

const getTopDoctorHome = (limit) => {
  return customizeAxios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctor = () => {
  return customizeAxios.get(`/api/get-all-doctor`);
};

const saveDetailDoctorService = (data) => {
  return customizeAxios.post(`/api/save-info-doctor`, data);
};

const getDetailInfoDoctor = (id) => {
  return customizeAxios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
  return customizeAxios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDate = (id, date) => {
  return customizeAxios.get(
    `/api/get-schedule-doctor-by-date?doctorID=${id}&date=${date}`
  );
};

export {
  handleLoginApi,
  fetchAllUser,
  fetchGroup,
  createNewUser,
  updateCurrentUser,
  deleteUser,
  logoutUser,
  getAllCode,
  getTopDoctorHome,
  getAllDoctor,
  saveDetailDoctorService,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
};
