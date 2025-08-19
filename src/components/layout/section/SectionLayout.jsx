import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AosContainer from "../../common/aos/Aos";
import "./sectionLayout.css";
function SectionLayout({ title, dataaos, children, id = "", ...rest }) {
  const { t } = useTranslation();
  return (
    <AosContainer dataaos={dataaos} {...rest}>
      {title ? (
        <Row className="justify-content-center mt-5 mb-3">
          <h3 className="section-header" id={id}>
            {t(title)}
          </h3>
        </Row>
      ) : (
        <></>
      )}
      <Row className="justify-content-center mb-3">{children}</Row>
    </AosContainer>
  );
}

export default SectionLayout;
