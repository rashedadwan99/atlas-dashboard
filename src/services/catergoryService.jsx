import { API_BASE_URL } from "../config";
import { http } from "./httpService";

const apiEndpoint = API_BASE_URL + "/category";

export const getCategories = () => {
  return http.get(apiEndpoint);
};
export const addCategory = (data) => {
  return http.post(apiEndpoint, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updateCategory = (data, id) => {
  return http.put(apiEndpoint + `/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
