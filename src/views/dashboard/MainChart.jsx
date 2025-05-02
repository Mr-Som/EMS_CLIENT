import * as React from "react";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import {
  Avatar,
  Button,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import {
  InsightsOutlined as InsightsOutlinedIcon,
  MoreVert as MoreVertIcon,
  Launch as LaunchIcon,
} from "@mui/icons-material";

const MainChart = () => {
  const theme = useTheme();

  // Sample data for kW, kVA, and kVR consumption for last 3 hours at 15-minute intervals
  const data = [
    {
      id: "kW",
      color: theme.palette.primary.dark,
      data: [
        { x: "18:00", y: 50.2 },
        { x: "18:15", y: 51.5 },
        { x: "18:30", y: 52.8 },
        { x: "18:45", y: 54.1 },
        { x: "19:00", y: 55.7 },
        { x: "19:15", y: 57.2 },
        { x: "19:30", y: 58.9 },
        { x: "19:45", y: 60.4 },
        { x: "20:00", y: 62.3 },
        { x: "20:15", y: 63.8 },
        { x: "20:30", y: 65.4 },
        { x: "20:45", y: 64.9 },
      ],
    },
    {
      id: "kVA",
      color: theme.palette.primary.light,
      data: [
        { x: "18:00", y: 52.5 },
        { x: "18:15", y: 53.8 },
        { x: "18:30", y: 55.1 },
        { x: "18:45", y: 56.4 },
        { x: "19:00", y: 58.0 },
        { x: "19:15", y: 59.5 },
        { x: "19:30", y: 61.2 },
        { x: "19:45", y: 62.7 },
        { x: "20:00", y: 64.7 },
        { x: "20:15", y: 66.2 },
        { x: "20:30", y: 67.8 },
        { x: "20:45", y: 67.3 },
      ],
    },
    {
      id: "kVR",
      color: theme.palette.error.light,
      data: [
        { x: "18:00", y: 15.3 },
        { x: "18:15", y: 15.8 },
        { x: "18:30", y: 16.4 },
        { x: "18:45", y: 17.0 },
        { x: "19:00", y: 17.7 },
        { x: "19:15", y: 18.4 },
        { x: "19:30", y: 19.2 },
        { x: "19:45", y: 20.0 },
        { x: "20:00", y: 20.9 },
        { x: "20:15", y: 21.7 },
        { x: "20:30", y: 22.5 },
        { x: "20:45", y: 22.2 },
      ],
    },
  ];

  // Calculate max value for Y-axis scaling
  const maxValue = Math.ceil(
    Math.max(...data.flatMap((series) => series.data.map((point) => point.y)))
  );

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
            <InsightsOutlinedIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Energy Trends"
        subheader="Today"
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
        <Box sx={{ flex: 1, height: { lg: "180px", xl: "230px" }, mt: 2 }}>
          <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: 0,
              max: maxValue,
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Time",
              legendOffset: 36,
              legendPosition: "middle",
              truncateTickAt: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Consumption (kW/kVA/kVR)",
              legendOffset: -40,
              legendPosition: "middle",
              truncateTickAt: 0,
              tickValues: [
                0,
                Math.round(maxValue * 0.25),
                Math.round(maxValue * 0.5),
                Math.round(maxValue * 0.75),
                maxValue,
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
            pointSize={2}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabel="data.yFormatted"
            pointLabelYOffset={-12}
            enableCrosshair={false}
            enableTouchCrosshair={true}
            useMesh={true}
            curve="monotoneX"
            colors={(d) => d.color}
            tooltip={({ point }) => (
              <Box
                sx={{
                  backgroundColor: "rgba(97, 97, 97, 0.7)",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                <Typography variant="caption">
                  {point.serieId}: {point.data.yFormatted}
                </Typography>
              </Box>
            )}
            legends={[
              {
                anchor: "top",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: -40,
                itemsSpacing: 20,
                itemDirection: "right-to-left",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fill: theme.palette.text.secondary,
                    fontSize: 12,
                  },
                },
                legend: {
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
              Math.round(maxValue * 0.25),
              Math.round(maxValue * 0.5),
              Math.round(maxValue * 0.75),
              maxValue,
            ]}
            gridXValues={[]}
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
          View detailed Trend analysis
        </Button>
      </CardActions>
    </Card>
  );
};

// PropTypes for type checking
MainChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          y: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default MainChart;
