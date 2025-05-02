import React from "react";
import { useTheme } from "@mui/material/styles";
import { ResponsiveBar } from "@nivo/bar";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Stack,
  Box,
  Button,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Launch as LaunchIcon,
  ArrowUpward as ArrowUpwardIcon,
  Warning as WarningIcon,
  MonetizationOn as MonetizationOnIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material";

const BudgetActualChart = () => {
  const theme = useTheme();

  // Data for last 6 months with actual cost values
  const monthlyData = [
    { month: "Nov 24", cost: 5.23, color: theme.palette.error.light },
    { month: "Dec 24", cost: 8.15, color: theme.palette.primary.light },
    { month: "Jan 25", cost: 10.67, color: theme.palette.primary.main },
    { month: "Feb 25", cost: 15.89, color: theme.palette.primary.dark },
    { month: "Mar 25", cost: 12.34, color: theme.palette.primary.main },
    { month: "Apr 25", cost: 12.43, color: theme.palette.primary.dark },
  ];

  // Transform data for Nivo Bar
  const nivoData = monthlyData.map((item) => ({
    month: item.month,
    cost: item.cost,
  }));

  // Calculate max cost for Y-axis scaling
  const maxCost = Math.ceil(Math.max(...monthlyData.map((item) => item.cost)));

  return (
    <Card
      sx={{
        borderRadius: 3,
        height: { lg: "350px", xl: "400px" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            <AttachMoneyIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Cost Analysis"
        subheader="Last 6 months"
        sx={{
          "& .MuiCardHeader-title": {
            fontWeight: 600,
            fontSize: "1.125rem",
          },
          "& .MuiCardHeader-subheader": {
            color: theme.palette.text.secondary,
          },
          pt: 2,
          pb: 0,
          px: 2,
        }}
      />
      <CardContent
        sx={{
          py: 0,
          px: 2,
          height: {
            xs: "200px",
            sm: "250px",
            md: "300px",
            lg: "230px",
            xl: "280px",
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Current Month Costs */}
        <Box sx={{ mt: 1 }}>
          <Typography variant="body1" color="text.primary" fontWeight="bold">
            Current month costs: ${monthlyData[monthlyData.length - 1].cost}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ mt: 1 }}
          >
            <ArrowUpwardIcon color="primary" fontSize="small" />
            <Typography variant="caption" color="text.main">
              13,711% compared to last month for same period
            </Typography>
          </Stack>
        </Box>

        {/* Nivo Bar Chart */}
        <Box sx={{ flex: 1, height: { lg: "180px", xl: "230px" }, mt: 2 }}>
          <ResponsiveBar
            data={nivoData}
            keys={["cost"]}
            indexBy="month"
            margin={{ top: 10, right: 20, bottom: 60, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={(datum) =>
              monthlyData.find((item) => item.month === datum.indexValue).color
            }
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              tickValues: [
                0,
                Math.round(maxCost * 0.25),
                Math.round(maxCost * 0.5),
                Math.round(maxCost * 0.75),
                maxCost,
              ],
              renderTick: ({ x, y, value }) => (
                <g transform={`translate(${x},${y})`}>
                  <line
                    x2="-10"
                    stroke={theme.palette.text.secondary}
                    strokeWidth={1}
                    strokeDasharray="3,3"
                  />
                  <text
                    x="-15"
                    y="3"
                    textAnchor="end"
                    fill={theme.palette.text.secondary}
                    fontSize={12}
                  >
                    {value}
                  </text>
                </g>
              ),
            }}
            enableLabel={false}
            tooltip={({ id, value, indexValue }) => (
              <Box
                sx={{
                  backgroundColor: "rgba(97, 97, 97, 0.7)",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                <Typography variant="caption">
                  {indexValue}: ${value}
                </Typography>
              </Box>
            )}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fill: theme.palette.text.secondary,
                    fontSize: 12,
                  },
                },
              },
              grid: {
                line: {
                  stroke: theme.palette.text.secondary,
                  strokeWidth: 1,
                  strokeDasharray: "3,3",
                },
              },
              tooltip: {
                container: {
                  background: "transparent",
                  boxShadow: "none",
                },
              },
            }}
            gridYValues={[
              0,
              Math.round(maxCost * 0.25),
              Math.round(maxCost * 0.5),
              Math.round(maxCost * 0.75),
              maxCost,
            ]}
          />
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ p: 2 }}>
        <Button
          size="small"
          endIcon={<LaunchIcon fontSize="small" />}
          sx={{ textTransform: "none" }}
        >
          View detailed cost analysis
        </Button>
      </CardActions>
    </Card>
  );
};

export default BudgetActualChart;
