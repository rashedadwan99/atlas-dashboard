// directories;
import { API_BASE_URL } from "../config";
import { http } from "./httpService";
import { getUserToken } from "./userService";

const apiEndpoint = API_BASE_URL + "/directories";

export const getDirectories = () => {
  return http.get(apiEndpoint);
};
export const addDirectory = (data) => {
  return http.post(apiEndpoint, { ...data, api_token: getUserToken() });
};
export const updateDirectory = (data, id) => {
  return http.put(apiEndpoint + `/${id}`, {
    ...data,
    api_token: getUserToken(),
  });
};
export const deleteDirectory = (id) => {
  return http.delete(apiEndpoint + `/${id}`, {
    params: {
      api_token: getUserToken(),
    },
  });
};
