import { API_BASE_URL } from "../config";
import { http } from "./httpService";
import { getUserToken } from "./userService";

const apiEndpoint = API_BASE_URL + "/ad";
export const addAd = async (data) => {
  return http.post(
    apiEndpoint,
    data,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export const getPendingAds = async () => {
  return http.get(apiEndpoint);
};
export const getApprovedAds = async () => {
  return http.get(apiEndpoint + "/approved");
};
export const approveAd = async (id) => {
  return http.put(
    apiEndpoint + `/approve/${id}`,
    {},
    {
      params: {
        api_token: getUserToken(),
      },
    }
  );
};
export const deleteAd = async (id) => {
  return http.delete(apiEndpoint + `/delete/${id}`, {
    params: {
      api_token: getUserToken(),
    },
  });
};
export const getMyAds = async () => {
  return http.post(apiEndpoint + "/my-ads", {
    api_token: getUserToken(),
  });
};
