import { useState } from "react";
import AuthLayout from "../../../components/layout/auth/AuthLayout";
import { routes } from "../../../routes/routes";
import CForm from "../../../components/common/form/CForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginService, setUserToken } from "../../../services/userService";
import { toggleAuthAction } from "../../../redux/actions/userActions";
import "./loginPage.css";
import { CToast } from "../../../components/common/toast/CToast";
import { useTranslation } from "react-i18next";
import { getAdsAction } from "../../../redux/actions/adActions";
import { getGeneralDataAction } from "../../../redux/actions/generalDataActions";

function LoginPage() {
  const { t } = useTranslation();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doSubmit = async () => {
    try {
      setIsLoading(true);
      const { data: user } = await loginService(data);
      if (user.isAdmin) {
        setUserToken(user.api_token);
        setIsLoading(false);
        dispatch(toggleAuthAction());
        CToast("success", t("login-message"));
      } else {
        const err = new Error("Unauthorized access");
        err.status = 401;
        throw err;
      }
    } catch (ex) {
      setIsLoading(false);
    }
  };
  const fields = [
    {
      label: "email",
      type: "email",
      name: "email",
      required: true,
    },
    {
      label: "password",
      type: "password",
      name: "password",
      required: true,
    },
    {
      buttons: [
        {
          sm: 12,
          label: "login",
          type: "submit",
          variant: "contained",
        },
      ],
    },
  ];

  return (
    <AuthLayout className="loginForm">
      {/* العنوان الرئيسي فوق الفورم */}

      {/* فورم الدخول مع عنوان داخلي */}
      <CForm
        fields={fields}
        data={data}
        setData={setData}
        title="atlas_acacia_system"
        loading={isLoading}
        doSubmit={doSubmit}
      />
    </AuthLayout>
  );
}

export default LoginPage;
