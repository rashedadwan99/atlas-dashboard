// App.jsx
import { Container } from "react-bootstrap";
import MainRoutes from "./routes/MainRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Container fluid className="app-container">
      <ToastContainer />
      <MainRoutes />
    </Container>
  );
}

export default App;
