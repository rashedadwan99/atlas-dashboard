import SectionLayout from "../../components/layout/section/SectionLayout";
import DashboardTable from "../../components/common/table/ReusableTable";
import { useSelector } from "react-redux";
import CButton from "../../components/common/button/CButton";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { deleteDirectory } from "../../services/directoriesServices";

function ViewDirectories() {
  const { directories } = useSelector((state) => state.generalData);
  const navigate = useNavigate();
  const goToEditForm = (id) => {
    navigate(routes.editGlobaldirectory + `/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const columns = [
    {
      id: "country", // مفتاح عام، نستخدمه فقط كمعرف
      label: "country",
      render: (item) => {
        return item.country;
      }, // عرض الاسم حسب اللغة
    },
    {
      id: "address", // مفتاح عام، نستخدمه فقط كمعرف
      label: "address",
      render: (item) => {
        return item.address;
      }, // عرض الاسم حسب اللغة
    },
    {
      id: "phone", // مفتاح عام، نستخدمه فقط كمعرف
      label: "phone",
      render: (item) => {
        return item.phone;
      }, // عرض الاسم حسب اللغة
    },
  ];
  return (
    <SectionLayout title="p_dir">
      <DashboardTable
        data={directories}
        columns={columns}
        onEdit={goToEditForm}
        onDelete={deleteDirectory}
      />
    </SectionLayout>
  );
}

export default ViewDirectories;
