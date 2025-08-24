import { API_BASE_URL } from "../config";
import { http } from "./httpService";

const apiEndpoint = API_BASE_URL + "/users";
export const tokenKey = "atlas_dashboard_token";
export const getUserToken = () => {
  return localStorage.getItem(tokenKey);
};
export const setUserToken = (api_token) => {
  return localStorage.setItem(tokenKey, api_token);
};
export const removeUserToken = () => {
  return localStorage.removeItem(tokenKey);
};

export const loginService = (data) => {
  return http.post(apiEndpoint + "/login", {}, { params: data });
};
export const registerService = (data) => {
  return http.get(apiEndpoint + "/register", { params: data });
};

export const getAllUsersService = () => {
  return http.get(apiEndpoint + "/all");
};
export const deleteUserService = (id) => {
  return http.delete(apiEndpoint + `/delete`, {
    params: { id, api_token: getUserToken() },
  });
};
export const activateUserService = (id) => {
  return http.put(
    apiEndpoint + `/activate`,
    {},
    {
      params: { id, api_token: getUserToken() },
    }
  );
};
export const deActivateUserService = (id) => {
  return http.put(
    apiEndpoint + `/de-activate`,
    {},
    {
      params: { id, api_token: getUserToken() },
    }
  );
};
export const getMyProfileService = () => {
  return http.get(apiEndpoint + "/getProfile", {
    params: { api_token: getUserToken() },
  });
};
