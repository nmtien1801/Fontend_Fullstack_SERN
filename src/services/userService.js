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

const getExtraInfoDoctorById = (id) => {
  return customizeAxios.get(`/api/get-extra-info-doctor-by-id?doctorID=${id}`);
};

const getProfileDoctorById = (id) => {
  return customizeAxios.get(`/api/get-profile-doctor-by-id?doctorID=${id}`);
};

const postPatientBookAppointment = (data) => {
  // lấy sau ?
  // search: react get url after question mark
  return customizeAxios.post(`/api/patient-book-appointment`, data);
};

const postVerifyBookAppointment = (data) => {
  return customizeAxios.post(`/api/verify-book-appointment`, data);
};

const createNewSpecialty = (data) => {
  return customizeAxios.post(`/api/create-new-specialty`, data);
};

const getAllSpecialty = () => {
  return customizeAxios.get(`/api/get-all-specialty`);
};

const getDetailSpecialtyById = (data) => {
  return customizeAxios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

const createNewClinic = (data) => {
  return customizeAxios.post(`/api/create-new-clinic`, data);
};

const getAllClinic = () => {
  return customizeAxios.get(`/api/get-all-clinic`); // dùng để map trên slider
};

const getDetailClinicById = (data) => {
  return customizeAxios.get(`/api/get-detail-clinic-by-id?id=${data.id}`); // dùng để show detail khi click vào slider
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
  getExtraInfoDoctorById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getDetailClinicById,
};
