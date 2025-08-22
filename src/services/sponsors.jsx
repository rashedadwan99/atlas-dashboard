import { API_BASE_URL } from "../config";
import { http } from "./httpService";
import { getUserToken } from "./userService";
const apiEndpoint = API_BASE_URL + "/sponsor";
export const getSponsors = () => {
  return http.get(apiEndpoint);
};
export const addSponsor = (data) => {
  return http.post(apiEndpoint, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updateSponsor = (data, id) => {
  return http.put(apiEndpoint + `/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteSponsor = (id) => {
  return http.delete(apiEndpoint + `/${id}`, {
    params: { api_token: getUserToken() },
  });
};
