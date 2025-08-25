import { useSelector } from "react-redux";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const { categories, users } = useSelector((state) => state.generalData);
  const { approvedAds } = useSelector((state) => state.ads);
  const { value: user } = useSelector((state) => state.user);
  const { t } = useTranslation();

  const adsCount = approvedAds?.length || 0;
  const categoriesCount = categories?.length || 0;
  const usersCount = users?.length || 0;

  const data = [
    { name: t("ads"), value: adsCount },
    { name: t("categories"), value: categoriesCount },
    { name: t("users"), value: usersCount },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      {/* الترحيب */}
      <Typography variant="h4" align="center" gutterBottom>
        👋 {t("welcome")} {user?.name || t("welcome_default")}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        gutterBottom
      >
        {t("dashboard_overview")}
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
        {data.map(({ name, value }) => (
          <Grid item xs={12} sm={6} md={4} key={name}>
            <Card
              sx={{
                height: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {name}
                </Typography>
                <Typography variant="h3" component="div" mb={2}>
                  {value}
                </Typography>
                <Box sx={{ height: 100 }}>
                  <BarChart
                    series={[{ data: [value] }]}
                    categories={[""]}
                    height={100}
                    width={200}
                    sx={{ flexGrow: 1 }}
                    colors={["var(--light-blue)"]}
                    // valueaxisformat={(val) => val.toString()}
                    xaxisvisible="false"
                    yaxisvisible="false"
                    animation="true"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
