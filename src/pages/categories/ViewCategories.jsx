import { useSelector } from "react-redux";
import Translation from "../../components/common/translation/Translation";
import DashboardTable from "../../components/common/table/ReusableTable";
import Cimg from "../../components/common/image/Cimg";
import CButton from "../../components/common/button/CButton";
import SectionLayout from "../../components/layout/section/SectionLayout";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";

export default function ViewCategories() {
  const { categories } = useSelector((state) => state.generalData);
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

  return (
    <SectionLayout title="categories">
      <DashboardTable data={categories} columns={columns} />
    </SectionLayout>
  );
}
