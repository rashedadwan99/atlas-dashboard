import React from "react";
import { routes } from "../../routes/routes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ViewSponsors() {
  const { sponsors } = useSelector((state) => state.generalData);
  const navigate = useNavigate();
  const goToEditForm = (id) => {
    navigate(routes.editGlobalCategory + `/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const columns = [
    {
      id: "name", // مفتاح عام، نستخدمه فقط كمعرف
      label: "Name",
      render: (item) => {
        return <Translation object={item} path="name" />;
      }, // عرض الاسم حسب اللغة
    },

    {
      id: "image",
      label: "Image",
      render: (item) =>
        item.image ? (
          <Cimg
            src={item.image}
            alt="media"
            style={{ width: 50, height: 50, borderRadius: 5 }}
          />
        ) : (
          "-"
        ),
    },
    {
      id: "edit",
      label: "Edit",
      render: (item) => (
        <CButton
          variant="contained"
          color="primary"
          onClick={() => goToEditForm(item._id)}
          label="edit"
        />
      ),
    },
  ];
  return <div>ViewSponsors</div>;
}

export default ViewSponsors;
