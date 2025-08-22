import { routes } from "../../routes/routes";
import { useSelector } from "react-redux";
import SectionLayout from "../../components/layout/section/SectionLayout";
import Cimg from "../../components/common/image/Cimg";
import DashboardTable from "../../components/common/table/ReusableTable";
import { deleteSponsor } from "../../services/sponsors";

function ViewSponsors() {
  const { sponsors } = useSelector((state) => state.generalData);

  const columns = [
    {
      id: "name",
      label: "Name",
      render: (item) => item.name, // ✅ make sure it's a function
    },
    {
      id: "image",
      label: "Image",
      render: (item) => (
        <Cimg
          src={item.image}
          alt="media"
          style={{ width: 50, height: 50, borderRadius: 5 }}
        />
      ),
    },
  ];

  return (
    <SectionLayout title="sponsors">
      <DashboardTable
        data={sponsors}
        columns={columns}
        searchPath="name" // ✅ ensure search works
        editPath={routes.editGlobalSponsor}
        onDelete={deleteSponsor}
        addPath={routes.addSponsor}
      />
    </SectionLayout>
  );
}

export default ViewSponsors;
