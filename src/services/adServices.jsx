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
export const getAds = async () => {
  return http.get(apiEndpoint);
};
export const getMyAds = async () => {
  return http.post(apiEndpoint + "/my-ads", {
    api_token: getUserToken(),
  });
};
