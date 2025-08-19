import { Col, Row } from "react-bootstrap";
import AosContainer from "../../common/aos/Aos";
import "./AuthLayout.css";
import { memo } from "react";
function AuthLayoutComponent({ children, className = "" }) {
  return (
    <AosContainer dataaos="fade-in">
      <Row
        className={`auth_page justify-content-center align-items-center ${className}`}
      >
        <Col xs={11} sm={11} lg={5} className="py-3 auth_form">
          {children}
        </Col>
      </Row>
    </AosContainer>
  );
}
const AuthLayout = memo(AuthLayoutComponent);
export default AuthLayout;
