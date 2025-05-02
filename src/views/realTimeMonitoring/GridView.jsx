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
<<<<<<< HEAD
=======
import { io } from "socket.io-client";
>>>>>>> 300b991 (version - 1.0.12)
import GridViewData from "./GridViewData";

export default function GridView() {
  const theme = useTheme();
  const [meters, setMeters] = React.useState([]);
  const [selectedMeter, setSelectedMeter] = React.useState(null);
<<<<<<< HEAD
  const [detailedData, setDetailedData] = React.useState([]);
=======
  const socketRef = React.useRef(null);
>>>>>>> 300b991 (version - 1.0.12)

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

<<<<<<< HEAD
      const text = await response.text();
      //console.log("Raw grid response:", text);

=======
>>>>>>> 300b991 (version - 1.0.12)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

<<<<<<< HEAD
      const data = JSON.parse(text);
      if (data.success) {
        setMeters(data.data);
=======
      const data = await response.json();
      if (data.success) {
        const mappedMeters = data.data.map((meter) => ({
          ...meter,
          lastDataReceived: meter.last_seen,
          data_frequency: meter.data_frequency || 5,
          online: meter.online,
          lastSeen: formatTimestamp(meter.last_seen),
        }));
        setMeters(mappedMeters);
>>>>>>> 300b991 (version - 1.0.12)
      } else {
        console.error("API error:", data.error);
        setMeters([]);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      setMeters([]);
    }
  };

<<<<<<< HEAD
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
=======
  // Format timestamp to DD-MM-YYYY HH:MM:SS
  const formatTimestamp = (date) => {
    if (!date || date === "Unknown") return "Unknown";
    const d = new Date(date);
    if (isNaN(d)) return "Unknown";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
>>>>>>> 300b991 (version - 1.0.12)
  };

  const handleDetailsClick = (meter) => {
    setSelectedMeter(meter);
<<<<<<< HEAD
    fetchMeterDetails(meter.id);
=======
>>>>>>> 300b991 (version - 1.0.12)
  };

  const handleBackClick = () => {
    setSelectedMeter(null);
<<<<<<< HEAD
    setDetailedData([]);
=======
  };

  // Determine if meter is online based on last data received and data_frequency
  const isMeterOnline = (lastDataReceived, dataFrequency) => {
    if (!lastDataReceived || !dataFrequency) return false;
    const now = new Date();
    const lastReceived = new Date(lastDataReceived);
    if (isNaN(lastReceived)) return false;
    const diffMs = now - lastReceived;
    const diffMins = diffMs / (1000 * 60);
    return diffMins <= dataFrequency;
>>>>>>> 300b991 (version - 1.0.12)
  };

  React.useEffect(() => {
    fetchGridData(); // Initial fetch

<<<<<<< HEAD
    // Auto-fetch every 10 seconds
    const intervalId = setInterval(fetchGridData, 10000);

    // Cleanup on unmount
=======
    // Connect to Socket.IO
    socketRef.current = io(import.meta.env.VITE_SERVER_API_URL, {
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to Socket.IO");
    });

    socketRef.current.on("meterUpdate", (payload) => {
      setMeters((prevMeters) =>
        prevMeters.map((meter) =>
          meter.id === payload.meter_id
            ? {
                ...meter,
                lastSeen: formatTimestamp(payload.created_at),
                lastDataReceived: payload.created_at,
                online: isMeterOnline(
                  payload.created_at,
                  meter.data_frequency || 5
                ),
              }
            : meter
        )
      );
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Socket.IO connection error:", err.message);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Subscribe/unsubscribe to meter IDs when meters change
  React.useEffect(() => {
    const meterIds = meters.map((meter) => meter.id);
    meterIds.forEach((meterId) => {
      socketRef.current.emit("subscribe", meterId);
    });

    return () => {
      meterIds.forEach((meterId) => {
        socketRef.current.emit("unsubscribe", meterId);
      });
    };
  }, [meters]);

  // Periodic check for online status
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setMeters((prevMeters) =>
        prevMeters.map((meter) => ({
          ...meter,
          online: isMeterOnline(
            meter.lastDataReceived,
            meter.data_frequency || 5
          ),
        }))
      );
    }, 60000);

>>>>>>> 300b991 (version - 1.0.12)
    return () => clearInterval(intervalId);
  }, []);

  if (selectedMeter) {
    return (
      <GridViewData
        selectedMeter={selectedMeter}
<<<<<<< HEAD
        detailedData={detailedData}
=======
>>>>>>> 300b991 (version - 1.0.12)
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
