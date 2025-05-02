// RealTimeMonitoring.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Popover,
  Paper,
  Box,
  FormControlLabel,
  Typography,
  Button,
  IconButton,
  Badge,
  Stack,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  FilterList as FilterListIcon,
  FilterListOff as FilterListOffIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  ViewColumn as ViewColumnIcon,
  CalendarViewDay as CalendarViewDayIcon,
} from "@mui/icons-material";
import EnhancedTable from "./TableView";
import GridView from "./GridView";

function RealTimeMonitoring() {
  const theme = useTheme();
  const [view, setView] = useState("table");
  const [anchorEl, setAnchorEl] = useState(null);
  const [columns, setColumns] = useState({
    "Voltage (V1)": true,
    "Voltage (V2)": true,
    "Voltage (V3)": true,
    "Voltage (RY)": false,
    "Voltage (YB)": false,
    "Voltage (BR)": false,
    "Current (L1)": true,
    "Current (L2)": true,
    "Current (L3)": true,
    "Current (LN)": false,
    "Power Factor (PF1)": false,
    "Power Factor (PF2)": false,
    "Power Factor (PF3)": false,
    "Power Factor (PFavg).": true,
    "Frequency (HZ)": true,
    "Active Power (KW)": true,
    "Reactive Power (KVAr)": false,
    "Apparent Power (KVA)": false,
    "Active Energy (KWh)": true,
  });
  const [metrics, setMetrics] = useState({
    totalDevices: 0,
    onlineDevices: 0,
    offlineDevices: 0,
    errorDevices: 0,
    onlinePercentage: 0,
    offlinePercentage: 0,
    errorPercentage: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch meter status
  useEffect(() => {
    const fetchMeterStatus = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/api/meters/status`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          setMetrics(data.data.metrics);
          console.log("Meter status data:", data.data.metrics);
        } else {
          console.error("API error:", data.error || "Unknown error");
          setMetrics({
            totalDevices: 0,
            onlineDevices: 0,
            offlineDevices: 0,
            errorDevices: 0,
            onlinePercentage: 0,
            offlinePercentage: 0,
            errorPercentage: 0,
          });
        }
      } catch (error) {
        console.error("Error fetching meter status:", error);
        setMetrics({
          totalDevices: 0,
          onlineDevices: 0,
          offlineDevices: 0,
          errorDevices: 0,
          onlinePercentage: 0,
          offlinePercentage: 0,
          errorPercentage: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchMeterStatus();
  }, []);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColumnChange = (column) => {
    setColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const open = Boolean(anchorEl);
  const id = open ? "column-popper" : undefined;

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
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid size={12}>
          <Paper
            elevation={0}
            sx={{
              p: 0,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              backgroundColor: "inherit",
            }}
          >
            <Stack spacing={3} direction="row">
              <Badge
                badgeContent={loading ? "..." : metrics.onlineDevices}
                color="primary"
              >
                <Button
                  href="#"
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                >
                  Online
                </Button>
              </Badge>
              <Badge
                badgeContent={loading ? "..." : metrics.offlineDevices}
                color="warning"
              >
                <Button
                  href="#"
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.warning.main,
                    "&:hover": {
                      backgroundColor: theme.palette.warning.dark,
                    },
                  }}
                >
                  Offline
                </Button>
              </Badge>
              <Badge
                badgeContent={loading ? "..." : metrics.errorDevices}
                color="danger"
              >
                <Button
                  href="#"
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor:
                      theme.palette.danger?.light || theme.palette.error.light,
                    "&:hover": {
                      backgroundColor:
                        theme.palette.danger?.main || theme.palette.error.main,
                    },
                  }}
                >
                  Error
                </Button>
              </Badge>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" spacing={2}>
              <Button
                variant={view === "table" ? "contained" : "outlined"}
                size="small"
                startIcon={<ViewListIcon />}
                onClick={() => handleViewChange("table")}
              >
                Table View
              </Button>
              <Button
                variant={view === "grid" ? "contained" : "outlined"}
                size="small"
                startIcon={<ViewModuleIcon />}
                onClick={() => handleViewChange("grid")}
              >
                Grid View
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<CalendarViewDayIcon />}
              >
                Group By
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<FilterListOffIcon />}
              >
                Filter
              </Button>
              <>
                <Button
                  sx={{ display: view === "table" ? "inline-flex" : "none" }}
                  variant="outlined"
                  size="small"
                  startIcon={<ViewColumnIcon />}
                  onClick={handleClick}
                  aria-describedby={id}
                >
                  Columns
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  sx={{ zIndex: 1300 }}
                >
                  <Paper
                    elevation={8}
                    sx={{
                      p: 2,
                      maxHeight: 400,
                      overflowY: "auto",
                      width: "auto",
                    }}
                  >
                    <Box>
                      {Object.entries(columns).map(([column, checked]) => (
                        <FormControlLabel
                          key={column}
                          control={
                            <Checkbox
                              checked={checked}
                              onChange={() => handleColumnChange(column)}
                              name={column}
                            />
                          }
                          label={column}
                          sx={{ display: "block" }}
                        />
                      ))}
                    </Box>
                  </Paper>
                </Popover>
              </>
            </Stack>
          </Paper>
        </Grid>
        <Grid size={12}>
          <Paper elevation={0} sx={{ p: 0, backgroundColor: "inherit" }}>
            {view === "table" ? (
              <EnhancedTable columns={columns} />
            ) : (
              <GridView />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RealTimeMonitoring;
