import SectionLayout from "../../components/layout/section/SectionLayout";
import DashboardTable from "../../components/common/table/ReusableTable";
import { useSelector } from "react-redux";
import { routes } from "../../routes/routes";
import { deleteDirectory } from "../../services/directoriesServices";
import Translation from "../../components/common/translation/Translation";

function ViewDirectories() {
  const { directories } = useSelector((state) => state.generalData);

  const columns = [
    {
      id: "category", // مفتاح عام، نستخدمه فقط كمعرف
      label: "category",
      render: (item) => {
        return <Translation object={item.category} path="name" />;
      }, // عرض الاسم حسب اللغة
    },
    {
      id: "country", // مفتاح عام، نستخدمه فقط كمعرف
      label: "country",
      render: (item) => {
        return item.country.name;
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
    {
      id: "notes", // مفتاح عام، نستخدمه فقط كمعرف
      label: "notes",
      render: (item) => {
        return item.notes;
      }, // عرض الاسم حسب اللغة
    },
  ];
  return (
    <SectionLayout title="p_dir">
      <DashboardTable
        addPath={routes.addDirectory}
        data={directories}
        columns={columns}
        editPath={routes.editGlobaldirectory}
        onDelete={deleteDirectory}
      />
    </SectionLayout>
  );
}

export default ViewDirectories;
