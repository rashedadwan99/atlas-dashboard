import { Col, Row } from "react-bootstrap";

function HeaderFooterLayout({ children, isFooter = false }) {
  return (
    <Row
      className={`justify-content-center  ${isFooter ? "pt-5" : "header py-5"}`}
    >
      <Col xs={12} sm={12}>
        {children}
      </Col>
    </Row>
  );
}

export default HeaderFooterLayout;
