import axios from "axios";
import { CToast } from "../components/common/toast/CToast";
import i18n from "../i18n"; // أو من أي مكان تستخدم فيه i18n

// 🟡 تحديد اللغة الحالية من i18n
export const getCurrentLang = () => i18n.language || "en";

// 🟢 Interceptor لتعديل كل الطلبات قبل الإرسال
axios.interceptors.request.use((config) => {
  const lang = getCurrentLang();

  // إذا كان POST أو PUT أو DELETE ضيف اللغة في البودي
  if (["post", "put", "delete"].includes(config.method)) {
    if (typeof config.data === "object") {
      config.data = {
        ...config.data,
        lang,
      };
    } else {
      config.data = { lang };
    }
  }

  // إذا GET ضيفها كـ query param
  if (config.method === "get") {
    config.params = {
      ...config.params,
      lang,
    };
  }

  return config;
});

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
