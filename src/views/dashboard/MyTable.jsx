import * as React from "react";
import { useTheme } from "@mui/material/styles";
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
  Typography,
} from "@mui/material";
import {
  InsightsOutlined as InsightsOutlinedIcon,
  MoreVert as MoreVertIcon,
  Launch as LaunchIcon,
  WarningAmber as WarningAmberIcon,
} from "@mui/icons-material";

export default function FlexGrid() {
  const theme = useTheme();

  // Demo alarm/alert dataset
  const alerts = [
    {
      id: 1,
      time: "18:00",
      type: "Voltage Spike",
      description: "High voltage detected in sector A",
      severity: "High",
    },
    {
      id: 2,
      time: "18:15",
      type: "Overload",
      description: "Circuit overload in sector B",
      severity: "Medium",
    },
    {
      id: 3,
      time: "18:30",
      type: "Temperature",
      description: "High temperature in server room",
      severity: "High",
    },
    {
      id: 4,
      time: "18:45",
      type: "Connection Loss",
      description: "Lost connection to device C",
      severity: "Low",
    },
    {
      id: 5,
      time: "19:00",
      type: "Power Failure",
      description: "Power outage in sector D",
      severity: "Critical",
    },
    {
      id: 6,
      time: "19:15",
      type: "Intrusion",
      description: "Unauthorized access attempt",
      severity: "High",
    },
    {
      id: 7,
      time: "19:30",
      type: "Low Battery",
      description: "Backup battery at 20%",
      severity: "Medium",
    },
    {
      id: 8,
      time: "19:45",
      type: "Sensor Fault",
      description: "Faulty sensor in sector E",
      severity: "Low",
    },
    {
      id: 9,
      time: "20:00",
      type: "Overcurrent",
      description: "Overcurrent in main line",
      severity: "High",
    },
    {
      id: 10,
      time: "20:15",
      type: "Network Error",
      description: "Network timeout in sector F",
      severity: "Medium",
    },
    {
      id: 11,
      time: "20:30",
      type: "Smoke Detected",
      description: "Smoke sensor triggered in sector G",
      severity: "Critical",
    },
    {
      id: 12,
      time: "20:45",
      type: "Cooling Failure",
      description: "Cooling system failure",
      severity: "High",
    },
    {
      id: 13,
      time: "21:00",
      type: "Data Loss",
      description: "Data packet loss in sector H",
      severity: "Medium",
    },
    {
      id: 14,
      time: "21:15",
      type: "Pressure Drop",
      description: "Low pressure in hydraulic system",
      severity: "Low",
    },
    {
      id: 15,
      time: "21:30",
      type: "System Crash",
      description: "Control system crash",
      severity: "Critical",
    },
  ];

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
            <WarningAmberIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Alerts"
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
        <Box
          sx={{
            flex: 1,
            height: { lg: "180px", xl: "230px" },
            mt: 1,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Fixed Table Header */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.875rem",
              color: theme.palette.text.primary,
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <thead>
              <tr style={{ backgroundColor: theme.palette.background.paper }}>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  Time
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  Type
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  Description
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  Severity
                </th>
              </tr>
            </thead>
          </table>
          {/* Scrolling Table Body */}
          <Box
            sx={{
              height: "100%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                animation: "scroll 30s linear infinite",
                "@keyframes scroll": {
                  "0%": { transform: "translateY(0)" },
                  "100%": {
                    transform: `translateY(-${alerts.length * 33.6}px)`,
                  }, // 33.6px per row (approx)
                },
                "&:hover": {
                  animationPlayState: "paused",
                },
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.875rem",
                  color: theme.palette.text.primary,
                }}
              >
                <tbody>
                  {alerts.map((alert) => (
                    <tr
                      key={alert.id}
                      style={{
                        backgroundColor: theme.palette.background.default,
                      }}
                    >
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        {alert.id}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        {alert.time}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        {alert.type}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        {alert.description}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: `1px solid ${theme.palette.divider}`,
                          color:
                            alert.severity === "Critical"
                              ? theme.palette.error.main
                              : alert.severity === "High"
                              ? theme.palette.warning.main
                              : alert.severity === "Medium"
                              ? theme.palette.info.main
                              : theme.palette.text.secondary,
                        }}
                      >
                        {alert.severity}
                      </td>
                    </tr>
                  ))}
                  {/* Duplicate rows for infinite scroll */}
                  {alerts.map((alert) => (
                    <tr
                      key={`duplicate-${alert.id}`}
                      style={{
                        backgroundColor: theme.palette.background.default,
                      }}
                    >
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        {alert.id}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        {alert.time}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        {alert.type}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        {alert.description}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: `1px solid ${theme.palette.divider}`,
                          color:
                            alert.severity === "Critical"
                              ? theme.palette.error.main
                              : alert.severity === "High"
                              ? theme.palette.warning.main
                              : alert.severity === "Medium"
                              ? theme.palette.info.main
                              : theme.palette.text.secondary,
                        }}
                      >
                        {alert.severity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ p: 2 }}>
        <Button
          size="small"
          endIcon={<LaunchIcon fontSize="small" />}
          sx={{ textTransform: "none" }}
        >
          View detailed alerts
        </Button>
      </CardActions>
    </Card>
  );
}
