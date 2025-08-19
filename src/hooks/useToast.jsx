import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const useToast = () => {
  const { t } = useTranslation();

  const showToast = (status, messageKey, autoClose = 2000, onClick) => {
    return toast[status](t(messageKey), {
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

  return showToast;
};

export default useToast;
