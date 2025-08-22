// components/ads/AdStatus.js
import { Alert } from "react-bootstrap";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const AdStatus = ({ isApproved }) => {
  const { t } = useTranslation();

  return (
    <Alert
      variant={isApproved ? "success" : "primary"}
      className="d-flex align-items-center gap-2 py-2 px-3 rounded-3"
      style={{
        fontSize: "0.95rem",
        fontWeight: 500,
        backgroundColor: isApproved ? "#e6f4ea" : "#eaf1fb",
        color: isApproved ? "#2e7d32" : "#0d6efd",
        border: "none",
      }}
    >
      {isApproved ? (
        <>
          <FaCheckCircle style={{ marginRight: 6 }} />
          {t("approved")}
        </>
      ) : (
        <>
          <FaClock style={{ marginRight: 6 }} />
          {t("pending")}
        </>
      )}
    </Alert>
  );
};

export default AdStatus;
