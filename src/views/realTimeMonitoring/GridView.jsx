import React from "react";
import {
  useTheme,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import {
  SignalCellular4Bar as SignalCellular4BarIcon,
  SignalCellularOff as SignalCellularOffIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import GridViewData from "./GridViewData";

export default function GridView() {
  const theme = useTheme();
  const [meters, setMeters] = React.useState([]);
  const [selectedMeter, setSelectedMeter] = React.useState(null);
  const [detailedData, setDetailedData] = React.useState([]);

  const fetchGridData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/api/real-time-monitoring/grid`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const text = await response.text();
      //console.log("Raw grid response:", text);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = JSON.parse(text);
      if (data.success) {
        setMeters(data.data);
      } else {
        console.error("API error:", data.error);
        setMeters([]);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      setMeters([]);
    }
  };

  const fetchMeterDetails = async (meterId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/api/real-time-monitoring/meter/${meterId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const text = await response.text();
      console.log("Raw meter details response:", text);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = JSON.parse(text);
      if (data.success) {
        setDetailedData(data.data);
      } else {
        console.error("API error:", data.error);
        setDetailedData([]);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      setDetailedData([]);
    }
  };

  const handleDetailsClick = (meter) => {
    setSelectedMeter(meter);
    fetchMeterDetails(meter.id);
  };

  const handleBackClick = () => {
    setSelectedMeter(null);
    setDetailedData([]);
  };

  React.useEffect(() => {
    fetchGridData(); // Initial fetch

    // Auto-fetch every 10 seconds
    const intervalId = setInterval(fetchGridData, 10000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  if (selectedMeter) {
    return (
      <GridViewData
        selectedMeter={selectedMeter}
        detailedData={detailedData}
        handleBackClick={handleBackClick}
      />
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
        {meters.map((meter) => (
          <Card key={meter.id} sx={{ minWidth: 345, maxWidth: 400, mb: 2 }}>
            <CardContent sx={{ padding: 1 }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography gutterBottom variant="subtitle1" component="div">
                  {meter.name}
                </Typography>
                <Stack
                  direction="row"
                  spacing={0}
                  sx={{ alignItems: "center" }}
                >
                  <IconButton size="small">
                    {meter.online ? (
                      <SignalCellular4BarIcon
                        fontSize="small"
                        sx={{ color: theme.palette.primary.main }}
                      />
                    ) : (
                      <SignalCellularOffIcon
                        fontSize="small"
                        sx={{ color: theme.palette.secondary.light }}
                      />
                    )}
                  </IconButton>
                  <IconButton size="small">
                    <SettingsIcon sx={{ color: theme.palette.primary.main }} />
                  </IconButton>
                </Stack>
              </Box>
              <Stack direction="column" spacing={1}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Device Id: {meter.deviceId}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Device Type: {meter.deviceType}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Device Location: {meter.location}
                </Typography>
              </Stack>
            </CardContent>
            <Divider />
            <CardActions
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Stack direction="row" spacing={0} sx={{ alignItems: "center" }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Last Seen:
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {meter.lastSeen}
                </Typography>
              </Stack>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDetailsClick(meter)}
              >
                Details
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
