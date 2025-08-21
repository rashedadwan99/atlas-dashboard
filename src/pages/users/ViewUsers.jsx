import React from "react";
import { routes } from "../../routes/routes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SectionLayout from "../../components/layout/section/SectionLayout";
import DashboardTable from "../../components/common/table/ReusableTable";
import CButton from "../../components/common/button/CButton";
import Cimg from "../../components/common/image/Cimg";

function ViewUsers() {
  const { users } = useSelector((state) => state.generalData);
  const navigate = useNavigate();
  const goToEditForm = (id) => {
    navigate(routes.editGlobalSponsor + `/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

    // {
    //   id: "image",
    //   label: "Image",
    //   render: (item) =>
    //     item.image ? (
    //       <Cimg
    //         src={item.image}
    //         alt="media"
    //         style={{ width: 50, height: 50, borderRadius: 5 }}
    //       />
    //     ) : (
    //       "-"
    //     ),
    // },
    // {
    //   id: "edit",
    //   label: "Edit",
    //   render: (item) => (
    //     <CButton
    //       variant="contained"
    //       color="primary"
    //       onClick={() => goToEditForm(item._id)}
    //       label="edit"
    //     />
    //   ),
    // },
  ];
  return (
    <SectionLayout title="users">
      <DashboardTable data={users} columns={columns} searchPath="name" />
    </SectionLayout>
  );
}

export default ViewUsers;
