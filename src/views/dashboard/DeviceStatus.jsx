import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
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
  Chip,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ResponsivePie } from "@nivo/pie";
import {
  MoreVert as MoreVertIcon,
  Launch as LaunchIcon,
  Devices as DevicesIcon,
} from "@mui/icons-material";
import axios from "axios";

// Save the original console.error
const originalConsoleError = console.error;

const DeviceStatus = ({ data: initialData }) => {
  const theme = useTheme();
  const [legendData, setLegendData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Override console.error to suppress @nivo transform errors
  useEffect(() => {
    console.error = (...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("<g> attribute transform: Expected ')'")
      ) {
        return;
      }
      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_API_URL}/api/meters/status`,
          { withCredentials: true }
        );
        console.log("API Response:", response.data);

        // Access metrics from response.data.data
        const result = response.data.data || response.data;
        const metrics = result.metrics || {
          onlineDevices: 0,
          offlineDevices: 0,
          errorDevices: 0,
        };
        console.log("Extracted Metrics:", metrics);

        const transformedData = [
          {
            id: "Online",
            value: metrics.onlineDevices || 0,
            color: theme.palette.primary.main,
          },
          {
            id: "Offline",
            value: metrics.offlineDevices || 0,
            color: theme.palette.error.dark,
          },
          {
            id: "Error",
            value: metrics.errorDevices || 0,
            color: theme.palette.warning.light,
          },
        ];

        const totalValue = transformedData.reduce(
          (sum, item) => sum + item.value,
          0
        );
        console.log(
          "Transformed Data:",
          transformedData,
          "Initial Total Value:",
          totalValue
        );

        // Ensure totalValue is never 0 to avoid division-by-zero
        if (totalValue === 0) {
          transformedData.forEach((item) => {
            item.value = item.value || 0.1; // Assign minimal value if all are 0
          });
          totalValue = transformedData.reduce(
            (sum, item) => sum + item.value,
            0
          );
        }

        console.log(
          "Adjusted Transformed Data:",
          transformedData,
          "Adjusted Total Value:",
          totalValue
        );

        setChartData(transformedData);

        const legend = transformedData.map((item) => ({
          id: item.id,
          value:
            item.value === 0.1 &&
            metrics[item.id.toLowerCase() + "Devices"] === 0
              ? 0
              : item.value,
          percentage:
            totalValue > 0 ? ((item.value / totalValue) * 100).toFixed(2) : 0,
          color: item.color,
        }));
        setLegendData(legend);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch data");
        console.error("Error fetching meter status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  console.log("Render Chart Data:", chartData);

  return (
    <Card sx={{ borderRadius: 3, height: { lg: "350px", xl: "400px" } }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            <DevicesIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Devices Status"
        subheader={`Total: ${totalValue} devices`}
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
            lg: "250px",
            xl: "280px",
          },
          alignItems: "center",
          justifyContent: "middle",
          display: "flex",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            size={{ lg: 6, xl: 7 }}
            sx={{
              minHeight: { lg: "180px", xl: "280px" },
            }}
          >
            <Box sx={{ height: { lg: "180px", xl: "280px" } }}>
              <ResponsivePie
                data={chartData}
                margin={{ top: 0, right: 10, bottom: 0, left: 10 }}
                innerRadius={0.6}
                padAngle={2}
                activeOuterRadiusOffset={8}
                colors={(d) => d.data.color || getColorForId(d.id)}
                borderWidth={1}
                borderColor={{
                  from: "color",
                  modifiers: [["darker", 0.2]],
                }}
                enableArcLinkLabels={false}
                enableArcLabels={false}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                  from: "color",
                  modifiers: [["darker", 2]],
                }}
                tooltip={({ datum }) => (
                  <Box
                    sx={{
                      padding: 1,
                      color: theme.palette.common.white,
                      backgroundColor: "rgba(51, 51, 51, 0.8)",
                      borderRadius: 1,
                      boxShadow: theme.shadows[2],
                    }}
                  >
                    <Typography variant="body2">
                      {datum.id}: {datum.value}
                    </Typography>
                  </Box>
                )}
              />
            </Box>
          </Grid>
          <Grid
            size={{ lg: 6, xl: 5 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack spacing={2} sx={{ p: 1 }}>
              {legendData.map((item) => (
                <Box key={item.id}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 0.5 }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box
                        sx={{
                          width: 14,
                          height: 14,
                          bgcolor: item.color,
                          borderRadius: "50%",
                        }}
                      />
                      <Typography variant="body1" fontWeight="medium">
                        {item.id}
                      </Typography>
                    </Stack>
                    <Chip
                      label={`${item.percentage}%`}
                      size="small"
                      sx={{
                        bgcolor: theme.palette.action.selected,
                        fontWeight: 500,
                      }}
                    />
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 3 }}
                  >
                    {item.value} devices
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ p: 2 }}>
        <Button
          size="small"
          endIcon={<LaunchIcon fontSize="small" />}
          sx={{ textTransform: "none" }}
        >
          Go to Device Management
        </Button>
      </CardActions>
    </Card>
  );
};

DeviceStatus.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
};

export default DeviceStatus;
