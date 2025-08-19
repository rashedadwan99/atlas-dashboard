import i18next from "i18next";
import { toast } from "react-toastify";

export const CToast = (status, message, autoClose = 4000, onClick) => {
  return toast[status](i18next.t(message), {
    position: "top-right",
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    onClick,
  });
};
