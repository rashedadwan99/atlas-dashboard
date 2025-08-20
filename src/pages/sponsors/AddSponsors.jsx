import { Col } from "react-bootstrap";
import SectionLayout from "../../components/layout/section/SectionLayout";
import SponsorsForm from "./SponsorsForm";

function AddSponsors() {
  return (
    <SectionLayout title="add_sponsors">
      <Col xs={12} sm={10} md={9} lg={8}>
        <SponsorsForm />
      </Col>
    </SectionLayout>
  );
}

export default AddSponsors;
