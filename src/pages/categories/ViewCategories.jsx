import { useSelector } from "react-redux";
import Translation from "../../components/common/translation/Translation";
import DashboardTable from "../../components/common/table/ReusableTable";
import Cimg from "../../components/common/image/Cimg";
import SectionLayout from "../../components/layout/section/SectionLayout";
import { routes } from "../../routes/routes";
import { deleteCategory } from "../../services/catergoryService";

export default function ViewCategories() {
  const { categories } = useSelector((state) => state.generalData);

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
  ];

  return (
    <SectionLayout title="categories">
      <DashboardTable
        data={categories}
        columns={columns}
        addPath={routes.addCategory}
        onDelete={deleteCategory}
        editPath={routes.editGlobalCategory}
      />
    </SectionLayout>
  );
}
