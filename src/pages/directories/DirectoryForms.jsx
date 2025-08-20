import { Col } from "react-bootstrap";
import SectionLayout from "../../components/layout/section/SectionLayout";
import DirectoryForm from "./DirectoryForm";
import { useParams } from "react-router-dom";

function DirectoryForms() {
  const { id } = useParams();
  return (
    <SectionLayout title={!id ? "a_p_dir" : "edit"}>
      <Col xs={12} sm={10} md={9} lg={8}>
        <DirectoryForm />
      </Col>
    </SectionLayout>
  );
}

export default DirectoryForms;
