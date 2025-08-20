import SectionLayout from "../../components/layout/section/SectionLayout";
import CategoryForm from "../../components/categories/CategoryForm";
import { Col } from "react-bootstrap";

function AddCategories() {
  return (
    <SectionLayout title="add_categories">
      <Col xs={12} sm={10} md={9} lg={8}>
        <CategoryForm />
      </Col>
    </SectionLayout>
  );
}

export default AddCategories;
