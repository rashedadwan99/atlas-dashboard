import { Outlet } from "react-router-dom";
import Sidebar from "../header/Sidebar";
import { Container } from "react-bootstrap";
export default function PageLayout() {
  return (
    <>
      <Sidebar />
      <Container fluid className="mt-5">
        <Outlet />
      </Container>
    </>
  );
}
