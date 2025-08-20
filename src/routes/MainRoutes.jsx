import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import Dashboard from "../pages/dashboard/Dashboard";
import PageLayout from "../components/layout/PageLayout";
import { getAdsAction } from "../redux/actions/adActions";
import { getGeneralDataAction } from "../redux/actions/generalDataActions";
import { routes } from "./routes";
import { useEffect } from "react";
import AddCategories from "../pages/categories/AddCategories";
import ViewCategories from "../pages/categories/ViewCategories";
import AddSponsors from "../pages/sponsors/AddSponsors";
import ViewSponsors from "../pages/sponsors/ViewSponsors";
import { getMyProfileAction } from "../redux/actions/userActions";
import { getUserToken } from "../services/userService";
import EditCategory from "../pages/categories/EditCategory";

function MainRoutes() {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (getUserToken()) {
      dispatch(getMyProfileAction());
    }
    dispatch(getAdsAction());
    dispatch(getGeneralDataAction());
  }, [getUserToken()]);

  return (
    <Routes>
      {/* مسار الصفحة الرئيسية بعد تسجيل الدخول */}
      <Route
        path={routes.dashboardRoute}
        element={isAuth ? <PageLayout /> : <Navigate to={routes.loginRoute} />}
      >
        {/* هنا يمكن تضع المزيد من المسارات الفرعية */}
        <Route
          path={routes.dashboardRoute}
          element={isAuth ? <Dashboard /> : <Navigate to={routes.loginRoute} />}
        />
        <Route
          path={routes.addCategory}
          element={
            isAuth ? <AddCategories /> : <Navigate to={routes.loginRoute} />
          }
        />
        <Route
          path={routes.editCategory}
          element={
            isAuth ? <EditCategory /> : <Navigate to={routes.loginRoute} />
          }
        />
        <Route
          path={routes.viewCategories}
          element={
            isAuth ? <ViewCategories /> : <Navigate to={routes.loginRoute} />
          }
        />
        <Route
          path={routes.addSponsor}
          element={
            isAuth ? <AddSponsors /> : <Navigate to={routes.loginRoute} />
          }
        />
        <Route
          path={routes.viewSponsors}
          element={
            isAuth ? <ViewSponsors /> : <Navigate to={routes.loginRoute} />
          }
        />
      </Route>

      {/* مسار تسجيل الدخول */}

      {/* مسار افتراضي لأي رابط غير معروف */}
      {/* <Route
        path="*"
        element={
          <Navigate to={isAuth ? routes.dashboardRoute : routes.loginRoute} />
        }
      /> */}
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
