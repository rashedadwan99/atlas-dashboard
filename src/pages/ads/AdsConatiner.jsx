import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import AdDetails from "./AdDetails";

function AdsContainer({ data }) {
  const { isArabic } = useSelector((state) => state.language);
  const { t } = useTranslation();

  return (
    <div
      className="container pb-5"
      style={{ direction: isArabic ? "rtl" : "ltr" }}
    >
      <Row className="justify-content-center">
        {data?.length ? (
          data?.map((a) => {
            return (
              <Col key={a._id} xs={12} sm={12} md={11} lg={12}>
                <AdDetails ad={a} />
              </Col>
            );
          })
        ) : (
          <p style={{ textAlign: "center", textTransform: "capitalize" }}>
            {t("no-ads")}
          </p>
        )}
      </Row>
    </div>
  );
}

export default AdsContainer;
