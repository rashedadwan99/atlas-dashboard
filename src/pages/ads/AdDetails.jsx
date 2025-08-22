// components/ads/AdDetails.js
import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import MediaCarousel from "../../components/common/carousel/MediaCarousel";
import AdStatus from "./AdStatus";
import Translation from "../../components/common/translation/Translation";

const AdDetails = ({ ad }) => {
  const { isArabic } = useSelector((state) => state.language);
  const { t } = useTranslation();

  return (
    <div
      className="container"
      style={{
        direction: isArabic ? "rtl" : "ltr",
        color: "#333",
      }}
    >
      <Row
        className="mb-5 align-items-center shadow-lg p-4 rounded-4"
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Col
          xs={12}
          md={5}
          className="mb-3 mb-md-0"
          style={{ borderRadius: 16, overflow: "hidden" }}
        >
          <MediaCarousel images={ad.images} video={ad.video} height={300} />
        </Col>

        <Col xs={12} md={7}>
          {/* ✅ حالة الإعلان */}
          <div className="mt-3">
            <AdStatus isApproved={ad?.isApproved} />
          </div>
          <h2
            className="fw-bold mb-3"
            style={{ fontSize: "1.6rem", color: "var(--dark-blue)" }}
          >
            {ad.title}
          </h2>

          <div className="d-flex align-items-center gap-3 mb-4">
            <h4
              className="text-success fw-bold mb-0"
              style={{ fontSize: "1.3rem" }}
            >
              {ad.price}{" "}
              <Badge
                bg="light"
                text="dark"
                className="fs-7"
                style={{ padding: "0.3em 0.6em", borderRadius: "12px" }}
              >
                {ad.currency}
              </Badge>
            </h4>
          </div>

          <hr />

          <div className="mb-4" style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
            <h5
              className="text-muted mb-2"
              style={{ fontWeight: "600", fontSize: "1.1rem" }}
            >
              {t("description")}
            </h5>
            <p style={{ whiteSpace: "pre-wrap" }}>{ad.description}</p>
          </div>

          <hr />

          <div style={{ fontSize: "0.9rem", lineHeight: 1.5, color: "#555" }}>
            <p className="mb-2">
              <strong>{t("category")}: </strong>
              <span style={{ color: "#0d6efd" }}>
                <Translation object={ad?.category} path="name" />
              </span>{" "}
              /{" "}
              <span style={{ color: "#0d6efd" }}>
                <Translation object={ad?.sub_category} path="name" />
              </span>
            </p>

            <p className="mb-2">
              <strong>{t("country")}: </strong>
              <span>{ad?.country?.name}</span>
            </p>

            <p className="mb-2">
              <strong>{t("posted-by")}: </strong>
              <span>{ad?.user?.name}</span>
            </p>

            <p className="mb-0">
              <strong>{t("phone")}: </strong>
              <span>{ad?.user?.phone}</span>
            </p>
            <p className="mb-0">
              <strong>{t("phone2")}: </strong>
              <span>{ad?.user?.phone2}</span>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdDetails;
