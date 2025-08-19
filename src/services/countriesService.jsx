import { API_BASE_URL } from "../config";
import { http } from "./httpService";
const apiEndpoint = API_BASE_URL + "/countries";

export const getCountries = () => {
  return http.get(apiEndpoint);
};
