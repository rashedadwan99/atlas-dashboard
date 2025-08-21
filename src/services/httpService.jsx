import axios from "axios";
import { CToast } from "../components/common/toast/CToast";
import i18n from "../i18n"; // أو من أي مكان تستخدم فيه i18n
import { removeUserToken } from "./userService";
import { routes } from "../routes/routes";

// 🟡 تحديد اللغة الحالية من i18n
export const getCurrentLang = () => i18n.language || "en";

// 🔴 Interceptor للأخطاء
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      const { status, data } = response;

      if (status === 400 && data?.message) {
        CToast("error", data.message);
      } else if (status === 401) {
        removeUserToken();
        window.location.href = routes.loginRoute;
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

// ✅ تصدير الطرق
export const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
