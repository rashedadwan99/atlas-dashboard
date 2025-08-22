import { useSelector } from "react-redux";
import SectionLayout from "../../components/layout/section/SectionLayout";
import DashboardTable from "../../components/common/table/ReusableTable";
import { deleteUserService } from "../../services/userService";

function ViewUsers() {
  const { users } = useSelector((state) => state.generalData);

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
  ];
  return (
    <SectionLayout title="users">
      <DashboardTable
        data={users}
        columns={columns}
        searchPath="name"
        onDelete={deleteUserService}
      />
    </SectionLayout>
  );
}

export default ViewUsers;
