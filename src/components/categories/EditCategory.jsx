import SectionLayout from "../layout/section/SectionLayout";
import { Col } from "react-bootstrap";
import CategoryForm from "./CategoryForm";

function EditCategory() {
  return (
    <SectionLayout title="add_categories">
      <Col xs={12} sm={10} md={7} lg={8}>
        <CategoryForm />
      </Col>
    </SectionLayout>
  );
}

export default EditCategory;
