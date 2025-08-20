// directories;
import { API_BASE_URL } from "../config";
import { http } from "./httpService";
import { getUserToken } from "./userService";

const apiEndpoint = API_BASE_URL + "/directories";

export const getDirectories = () => {
  return http.get(apiEndpoint);
};
export const addDirectory = () => {
  return http.post(apiEndpoint, { ...data, api_toke: getUserToken() });
};
export const updateDirectory = (data) => {
  return http.put(apiEndpoint + `${data._id}`, {
    ...data,
    api_toke: getUserToken(),
  });
};
export const deleteDirectory = (data) => {
  return http.delete(apiEndpoint + `${data._id}`, {
    ...data,
    api_toke: getUserToken(),
  });
};
