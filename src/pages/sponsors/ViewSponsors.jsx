// src/pages/sponsors/ViewSponsors.jsx
import { routes } from "../../routes/routes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SectionLayout from "../../components/layout/section/SectionLayout";
import Cimg from "../../components/common/image/Cimg";
import DashboardTable from "../../components/common/table/ReusableTable";
import { deleteSponsor } from "../../services/sponsors";

function ViewSponsors() {
  const { sponsors } = useSelector((state) => state.generalData);
  const navigate = useNavigate();

  const goToEditForm = (id) => {
    navigate(routes.editGlobalSponsor + `/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        onEdit={(item) => goToEditForm(item._id)}
        onDelete={deleteSponsor}
        addPath={routes.addSponsor}
      />
    </SectionLayout>
  );
}

export default ViewSponsors;
