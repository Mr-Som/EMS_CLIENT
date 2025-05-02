import * as React from "react";
import { styled } from "@mui/material/styles";

import { Paper, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Components
import MainChart from "./MainChart";
import MyTable from "./MyTable";
import DeviceStatus from "./DeviceStatus";
import EnergyStatistics from "./EnergyStatistics";
import BudgetActualChart from "./BudgetActualChart";
import Project from "./Project";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const AppContent = () => {
  return (
    <Box
      sx={{
        width: "100%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
      }}
    >
      <Grid container spacing={1}>
        <Grid size={{ lg: 5, xl: 3 }}>
          <EnergyStatistics />
        </Grid>
        <Grid size={{ lg: 7, xl: 6 }}>
          <MainChart />
        </Grid>
        <Grid size={{ lg: 5, xl: 3 }}>
          <Project />
        </Grid>
        <Grid size={{ lg: 5, xl: 3 }}>
          <BudgetActualChart />
        </Grid>
        <Grid size={{ lg: 7, xl: 6 }}>
          <MyTable />
        </Grid>
        <Grid size={{ lg: 5, xl: 3 }}>
          <DeviceStatus />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppContent;
