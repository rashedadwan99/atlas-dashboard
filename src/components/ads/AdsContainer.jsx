import { Col, Row, Card, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Cimg from "../common/image/Cimg";
import Translation from "../common/translation/Translation";
import { NavLink } from "react-router-dom";
import { routes } from "../../routes/routes";
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
        {data.length ? (
          data?.map((a) => {
            return (
              <Col key={a._id}>
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
