import SectionLayout from "../../components/layout/section/SectionLayout";
import CategoryForm from "../../components/categories/CategoryForm";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

function CategoriesForms() {
  const { id } = useParams();

  return (
    <SectionLayout title={id ? "add_categories" : "edit"}>
      <Col xs={12} sm={10} md={9} lg={8}>
        <CategoryForm />
      </Col>
    </SectionLayout>
  );
}

export default CategoriesForms;
