import SectionLayout from "../layout/section/SectionLayout";
import { Col } from "react-bootstrap";
import CategoryForm from "./CategoryForm";
import { useParams } from "react-router-dom";

function EditCategory() {
  const { id } = useParams();
  return (
    <SectionLayout title={id ? "add_categories" : "edit"}>
      <Col xs={12} sm={10} md={7} lg={8}>
        <CategoryForm />
      </Col>
    </SectionLayout>
  );
}

export default EditCategory;
