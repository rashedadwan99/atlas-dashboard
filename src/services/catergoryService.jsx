import { API_BASE_URL } from "../config";
import { http } from "./httpService";

const apiEndpoint = API_BASE_URL + "/category";

export const getCategories = () => {
  return http.get(apiEndpoint);
};
