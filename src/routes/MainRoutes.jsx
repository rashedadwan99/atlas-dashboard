import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import Dashboard from "../pages/dashboard/Dashboard";
import PageLayout from "../components/layout/PageLayout";
import { getAdsAction } from "../redux/actions/adActions";
import { getGeneralDataAction } from "../redux/actions/generalDataActions";
import { routes } from "./routes";
import { useEffect } from "react";

function MainRoutes() {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdsAction());
    dispatch(getGeneralDataAction());
  }, [isAuth, dispatch]);

  return (
    <Routes>
      {/* مسار الصفحة الرئيسية بعد تسجيل الدخول */}
      <Route
        path={routes.dashboardRoute}
        element={isAuth ? <PageLayout /> : <Navigate to={routes.loginRoute} />}
      >
        {/* هنا يمكن تضع المزيد من المسارات الفرعية */}
        <Route
          path=""
          element={isAuth ? <Dashboard /> : <Navigate to={routes.loginRoute} />}
        />
      </Route>

      {/* مسار تسجيل الدخول */}

      {/* مسار افتراضي لأي رابط غير معروف */}
      <Route
        path="*"
        element={
          <Navigate to={isAuth ? routes.dashboardRoute : routes.loginRoute} />
        }
      />
      <Route
        path={routes.loginRoute}
        element={
          !isAuth ? <LoginPage /> : <Navigate to={routes.dashboardRoute} />
        }
      />
    </Routes>
  );
}

export default MainRoutes;
