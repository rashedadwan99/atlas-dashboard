import { useDispatch, useSelector } from "react-redux";
import SectionLayout from "../../components/layout/section/SectionLayout";
import DashboardTable from "../../components/common/table/ReusableTable";
import {
  activateUserService,
  deActivateUserService,
  deleteUserService,
} from "../../services/userService";
import { useLocation } from "react-router-dom";
import { routes } from "../../routes/routes";
import CButton from "../../components/common/button/CButton";
import { getGeneralDataAction } from "../../redux/actions/generalDataActions";
import { useState } from "react";

function ViewUsers() {
  const { users } = useSelector((state) => state.generalData);
  const defaultUsers = users?.filter((u) => !u.isAdmin);
  const admins = users?.filter((u) => u.isAdmin);
  const { pathname } = useLocation();
  const isAdminsPage = pathname === routes.viewadmins;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handledeActivate = async (item) => {
    try {
      setLoading(true);
      await deActivateUserService(item._id);
      dispatch(getGeneralDataAction());
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleActivate = async (item) => {
    try {
      setLoading(true);
      await activateUserService(item._id);
      setLoading(false);
      dispatch(getGeneralDataAction());
    } catch (error) {
      setLoading(false);
    }
  };
  const columns = [
    {
      id: "email", // مفتاح عام، نستخدمه فقط كمعرف
      label: "email",
      render: (item) => {
        return item.email;
      },
    },
    {
      id: "name", // مفتاح عام، نستخدمه فقط كمعرف
      label: "Name",
      render: (item) => {
        return item.name;
      },
    },
    {
      id: "phone", // مفتاح عام، نستخدمه فقط كمعرف
      label: "phone",
      render: (item) => {
        return item.phone;
      },
    },
    {
      id: "phone2", // مفتاح عام، نستخدمه فقط كمعرف
      label: "phone2",
      render: (item) => {
        return item.phone2;
      },
    },
    !isAdminsPage
      ? {
          id: "de-activate", // مفتاح عام، نستخدمه فقط كمعرف
          label: "de-activate",
          render: (item) => {
            return item?.isActive ? (
              <CButton
                label="de-activate"
                color="error"
                variant="contained"
                onClick={() => handledeActivate(item)}
                disabled={loading}
              />
            ) : (
              <CButton
                label="activate"
                color="info"
                variant="contained"
                onClick={() => handleActivate(item)}
                disabled={loading}
              />
            );
          },
        }
      : {},
  ].filter((col) => col.render);
  return (
    <SectionLayout title={!isAdminsPage ? "users" : "admins"}>
      <DashboardTable
        data={isAdminsPage ? admins : defaultUsers}
        columns={columns}
        searchPath="name"
      />
    </SectionLayout>
  );
}

export default ViewUsers;
