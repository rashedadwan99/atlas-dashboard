import axios from "axios";
import { CToast } from "../components/common/toast/CToast";

// Global error interceptor
axios.interceptors.response.use(
  (response) => response, // If successful, just return response
  (error) => {
    const { response } = error;

    // If error has a response from server
    if (response) {
      const { status, data } = response;

      // Show error message based on status
      if (status === 400 && data?.message) {
        CToast("error", data.message);
      } else if (status === 401) {
        CToast("error", "unauthorized");
      } else if (status === 403) {
        CToast("error", "forbidden");
      } else if (status === 404) {
        CToast("error", "notFound");
      } else if (status >= 500) {
        CToast("error", "serverError");
      } else if (data?.message) {
        CToast("error", data.message);
      } else {
        CToast("error", "unknown");
      }
    } else {
      CToast("error", "network");
    }

    return Promise.reject(error);
  }
);

// Exporting wrapped HTTP methods
export const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
