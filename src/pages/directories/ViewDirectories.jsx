import SectionLayout from "../../components/layout/section/SectionLayout";
import DashboardTable from "../../components/common/table/ReusableTable";
import { useSelector } from "react-redux";
import { routes } from "../../routes/routes";
import { deleteDirectory } from "../../services/directoriesServices";

function ViewDirectories() {
  const { directories } = useSelector((state) => state.generalData);

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
        editPath={routes.editGlobaldirectory}
        onDelete={deleteDirectory}
      />
    </SectionLayout>
  );
}

export default ViewDirectories;
