import customizeAxios from "../setup/customizeAxios";

const handleLoginApi = (valueLogin, password) => {
  return customizeAxios.post(`/api/v1/login`, { valueLogin, password });
};

export { handleLoginApi };
