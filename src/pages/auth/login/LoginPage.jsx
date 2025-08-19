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

function LoginPage() {
  const { t } = useTranslation();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const doSubmit = async () => {
    try {
      setIsLoading(true);
      const { data: user } = await loginService(data);
      dispatch(toggleAuthAction());
      setUserToken(user.api_token);
      setIsLoading(false);
      CToast("success", t("login-message")); // ترجمة رسالة النجاح
    } catch (ex) {
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();
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
