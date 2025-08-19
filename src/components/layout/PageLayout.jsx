import { Outlet } from "react-router-dom";
import Sidebar from "../header/Sidebar";
import { Row } from "react-bootstrap";
export default function PageLayout() {
  return (
    <>
      <Sidebar />
      <Row className="mt-2">
        <Outlet />
      </Row>
    </>
  );
}
