import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import { useTranslation } from "react-i18next";

// استخدام ألوان من :root
const COLORS = ["var(--dark-blue)", "var(--light-blue)"];

function Dashboard() {
  const { categories } = useSelector((state) => state.generalData);
  const { allAds } = useSelector((state) => state.ads);
  const { value: user } = useSelector((state) => state.user);
  const { t } = useTranslation();

  const adsCount = allAds?.length || 0;
  const categoriesCount = categories?.length || 0;

  const data = [
    {
      name: t("ads"),
      value: adsCount,
      fill: COLORS[0],
    },
    {
      name: t("categories"),
      value: categoriesCount,
      fill: COLORS[1],
    },
  ];

  return (
    <>
      {/* الترحيب */}
      <Row className="mb-4">
        <Col>
          <h2 className="text-dark fs-4  text-center">
            👋 {t("welcome")} {user?.name || t("welcome_default")}
          </h2>
          <p className="text-muted small  text-center">
            {t("dashboard_overview")}
          </p>
        </Col>
      </Row>

      {/* Bar Chart */}
      <Row>
        <Col xs={12}>
          <h6 className="fw-bold text-dark text-center">
            {t("bar_chart_title")}
          </h6>
          <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                  <LabelList dataKey="value" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
