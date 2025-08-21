import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import Dashboard from "../pages/dashboard/Dashboard";
import PageLayout from "../components/layout/PageLayout";
import { getAdsAction } from "../redux/actions/adActions";
import { getGeneralDataAction } from "../redux/actions/generalDataActions";
import { routes } from "./routes";
import { useEffect } from "react";
import AddCategories from "../pages/categories/CategoriesForms";
import ViewCategories from "../pages/categories/ViewCategories";
import AddSponsors from "../pages/sponsors/SponsorsForms";
import ViewSponsors from "../pages/sponsors/ViewSponsors";
import { getMyProfileAction } from "../redux/actions/userActions";
import { getUserToken } from "../services/userService";
import EditCategory from "../components/categories/EditCategory";
import CategoriesForms from "../pages/categories/CategoriesForms";
import SponsorsForms from "../pages/sponsors/SponsorsForms";
import ViewDirectories from "../pages/directories/ViewDirectories";
import DirectoryForms from "../pages/directories/DirectoryForms";
import ViewUsers from "../pages/users/ViewUsers";

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
            isAuth ? <CategoriesForms /> : <Navigate to={routes.loginRoute} />
          }
        />
        <Route
          path={routes.editCategory}
          element={
            isAuth ? <CategoriesForms /> : <Navigate to={routes.loginRoute} />
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
            isAuth ? <SponsorsForms /> : <Navigate to={routes.loginRoute} />
          }
        />
        <Route
          path={routes.editSponsor}
          element={
            isAuth ? <SponsorsForms /> : <Navigate to={routes.loginRoute} />
          }
        />
        <Route
          path={routes.viewSponsors}
          element={
            isAuth ? <ViewSponsors /> : <Navigate to={routes.loginRoute} />
          }
        />
        <Route
          path={routes.addDirectory}
          element={
            isAuth ? <DirectoryForms /> : <Navigate to={routes.loginRoute} />
          }
        />
        <Route
          path={routes.editDirectory}
          element={
            isAuth ? <DirectoryForms /> : <Navigate to={routes.loginRoute} />
          }
        />
        <Route
          path={routes.viewDirectorys}
          element={
            isAuth ? <ViewDirectories /> : <Navigate to={routes.loginRoute} />
          }
        />
        <Route
          path={routes.viewuserss}
          element={isAuth ? <ViewUsers /> : <Navigate to={routes.loginRoute} />}
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
