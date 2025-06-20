import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Checkbox,
  FormHelperText,
  List,
  Card,
  CardHeader,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import GridOnIcon from "@mui/icons-material/GridOn";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Static list of parameters
const parameters = [
  "R Y Voltage (V12)",
  "Y B Voltage (V23)",
  "B R Voltage (V31)",
  "R N Voltage (V1)",
  "Y N Voltage (V2)",
  "B N Voltage (V3)",
  "Average Voltage (Vavg)",
  "R Phase Current (L1)",
  "Y Phase Current (L2)",
  "B Phase Current (L3)",
  "Neutral Current (LN)",
  "Power Factor R (PF1)",
  "Power Factor Y (PF2)",
  "Power Factor B (PF3)",
  "Power Factor Average (PFavg)",
  "Active Power R (P1)",
  "Active Power Y (P2)",
  "Active Power B (P3)",
  "Active Power 3 Phase (Pavg)",
  "Reactive Power R (Q1)",
  "Reactive Power Y (Q2)",
  "Reactive Power B (Q3)",
  "Reactive Power 3 Phase (Qavg)",
  "Apparent Power R (S1)",
  "Apparent Power Y (S2)",
  "Apparent Power B (S3)",
  "Apparent Power 3 Phase (Savg)",
  "Frequency (FQ)",
  "Active Import",
  "Active Export",
  "Active Net (Import - Export)",
  "Active Gross Import",
  "Active Gross Export",
  "Reactive Import",
  "Reactive Export",
  "Apparent Import",
  "Apparent Export",
  "Voltage THD R (THD V1)",
  "Voltage THD Y (THD V2)",
  "Voltage THD B (THD V3)",
  "Current THD R (THD L1)",
  "Current THD Y (THD L2)",
  "Current THD B (THD L3)",
];

// Mapping of parameter display names to API data keys
const parameterKeyMap = {
  "R N Voltage (V1)": "V1",
  "Y N Voltage (V2)": "V2",
  "B N Voltage (V3)": "V3",
  "Average Voltage (Vavg)": "Vavg",
  "R Y Voltage (V12)": "V12",
  "Y B Voltage (V23)": "V23",
  "B R Voltage (V31)": "V32",
  "R Phase Current (L1)": "L1",
  "Y Phase Current (L2)": "L2",
  "B Phase Current (L3)": "L3",
  "Neutral Current (LN)": "LN",
  "Power Factor R (PF1)": "PF1",
  "Power Factor Y (PF2)": "PF2",
  "Power Factor B (PF3)": "PF3",
  "Power Factor Average (PFavg)": "PFavg",
  "Active Power R (P1)": "P1",
  "Active Power Y (P2)": "P2",
  "Active Power B (P3)": "P3",
  "Active Power 3 Phase (Pavg)": "Pavg",
  "Reactive Power R (Q1)": "Q1",
  "Reactive Power Y (Q2)": "Q2",
  "Reactive Power B (Q3)": "Q3",
  "Reactive Power 3 Phase (Qavg)": "Qavg",
  "Apparent Power R (S1)": "S1",
  "Apparent Power Y (S2)": "S2",
  "Apparent Power B (S3)": "S3",
  "Apparent Power 3 Phase (Savg)": "Savg",
  "Frequency (FQ)": "FQ",
  "Active Import": "kWhT (I)",
  "Active Export": "kWhT (E)",
  "Active Net (Import - Export)": "kWhT (N)",
  "Active Gross Import": "kWhG (I)",
  "Active Gross Export": "kWhG (E)",
  "Reactive Import": "kVArh (I)",
  "Reactive Export": "kVArh (E)",
  "Apparent Import": "kVAh (I)",
  "Apparent Export": "kVAh (E)",
  "Voltage THD R (THD V1)": "THDV1",
  "Voltage THD Y (THD V2)": "THDV2",
  "Voltage THD B (THD V3)": "THDV3",
  "Current THD R (THD L1)": "THDL1",
  "Current THD Y (THD L2)": "THDL2",
  "Current THD B (THD L3)": "THDL3",
};

function not(a, b) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
  return a.filter((value) => b.includes(value));
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function MeterReadingData() {
  const theme = useTheme();
  const [checked, setChecked] = useState([]);
  const [meters, setMeters] = useState([]); // Full meter objects [{meter_id, nick_name}, ...]
  const [left, setLeft] = useState(parameters); // Available parameters
  const [right, setRight] = useState([]); // Selected parameters
  const [selectedMeter, setSelectedMeter] = useState(""); // For meter dropdown
  const [readingDate, setReadingDate] = useState(null); // For date picker
  const [fromTime, setFromTime] = useState(null); // For from time picker
  const [toTime, setToTime] = useState(null); // For to time picker
  const [error, setError] = useState(null);

  // Fetch all meters on mount
  useEffect(() => {
    const fetchAllMeters = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_API_URL}/api/meters`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setMeters(response.data.data);
          console.log("Fetched Meters:", response.data.data);
        } else {
          throw new Error(response.data.error || "Failed to fetch meters");
        }
      } catch (err) {
        setError(`Failed to fetch meters: ${err.message}`);
        console.error("Error fetching meters:", err);
      }
    };

    fetchAllMeters();
  }, []);

  // Handle meter selection from dropdown
  const handleSelectedMeterChange = (event) => {
    setSelectedMeter(event.target.value);
  };

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleGeneratePDF = async () => {
    try {
      if (!selectedMeter) {
        setError("Please select a meter");
        return;
      }
      if (right.length === 0) {
        setError("No parameters selected for PDF generation");
        return;
      }

      // Prepare query parameters for date, time, and parameters
      const queryParams = {};
      if (readingDate) {
        queryParams.date = readingDate.format("YYYY-MM-DD");
      }
      if (fromTime) {
        queryParams.from = fromTime.format("HH:mm"); // Converts 12:00 AM to 00:00
      }
      if (toTime) {
        queryParams.to = toTime.format("HH:mm"); // Converts 12:00 PM to 12:00
      }
      if (right.length > 0) {
        queryParams.parameters = right
          .map((param) => parameterKeyMap[param])
          .join(",");
      }

      // Fetch data for the selected meter
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_API_URL
        }/api/report/meters/${selectedMeter}/readingData`,
        {
          params: queryParams,
          withCredentials: true,
        }
      );
      if (!response.data.success) {
        throw new Error(
          response.data.error ||
            `Failed to fetch data for meter ${selectedMeter}`
        );
      }

      const meterData = response.data.data;
      const meter = meters.find((m) => m.meter_id === selectedMeter);

      // Initialize jsPDF
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 14;

      // Add header
      doc.setFontSize(16);
      doc.text("Meter Reading Report", margin, 20);
      doc.setFontSize(12);
      doc.text(
        `Meter: ${meter ? meter.nick_name : "Unknown"} (${selectedMeter})`,
        margin,
        30
      );
      doc.text(`Date: ${queryParams.date || "All"}`, margin, 40);
      doc.text(
        `Time Range: ${queryParams.from || "00:00"} to ${
          queryParams.to || "23:59"
        }`,
        margin,
        50
      );

      // Prepare table data
      const tableColumns = ["Timestamp", ...right];
      const tableRows = meterData.map((row) => {
        const rowData = [row.created_at];
        right.forEach((param) => {
          const value =
            row[param] !== undefined && row[param] !== null
              ? row[param]
              : "N/A";
          rowData.push(value);
        });
        return rowData;
      });

      // Add table using autoTable
      doc.autoTable({
        startY: 60,
        head: [tableColumns],
        body: tableRows,
        theme: "striped",
        margin: { left: margin, right: margin },
        styles: { fontSize: 10, cellPadding: 2 },
        headStyles: { fillColor: [theme.palette.primary.main] },
        columnStyles: {
          0: { cellWidth: 40 }, // Timestamp column
        },
      });

      // Add footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(
          `Generated on ${new Date().toISOString()}`,
          margin,
          doc.internal.pageSize.getHeight() - 10
        );
        doc.text(
          `Page ${i} of ${pageCount}`,
          pageWidth - margin - 20,
          doc.internal.pageSize.getHeight() - 10
        );
      }

      // Save the PDF
      doc.save(`Meter_${selectedMeter}_Report.pdf`);
    } catch (err) {
      const errorMessage =
        err.response?.status === 404
          ? "API endpoint not found. Please check the server URL and route configuration."
          : `Error generating PDF: ${err.message}`;
      setError(errorMessage);
      console.error("Error generating PDF:", err);
    }
  };

  const customList = (title, items) => (
    <Card sx={{ boxShadow: 3 }}>
      <CardHeader
        sx={{ px: 2, py: 1, bgcolor: "background.default" }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
            color="primary"
          />
        }
        title={<Typography variant="subtitle1">{title}</Typography>}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 300,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            borderRadius: "10px",
          },
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
              sx={{
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  color="primary"
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={value}
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper sx={{ padding: 2, position: "relative" }} elevation={1}>
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Grid container spacing={3}>
          <Grid size={{ lg: 12, xl: 12 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6">Meter Reading Data</Typography>
            </Box>
          </Grid>

          <Grid size={{ lg: 3, xl: 2 }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="selected-meter-label">Select Meter</InputLabel>
              <Select
                labelId="selected-meter-label"
                id="selected-meter"
                value={selectedMeter}
                onChange={handleSelectedMeterChange}
                label="Select Meter"
                size="small"
              >
                <MenuItem value="">Select a Meter</MenuItem>
                {meters.map((meter) => (
                  <MenuItem key={meter.meter_id} value={meter.meter_id}>
                    {meter.nick_name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select a specific meter</FormHelperText>
            </FormControl>
          </Grid>

          <Grid size={{ lg: 3, xl: 2 }}>
            <DatePicker
              label="Reading Date"
              value={readingDate}
              onChange={(newValue) => setReadingDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  variant: "outlined",
                },
                openPickerButton: {
                  color: "primary",
                },
              }}
            />
          </Grid>

          <Grid size={{ lg: 3, xl: 2 }}>
            <TimePicker
              label="From Time"
              value={fromTime}
              onChange={(newValue) => setFromTime(newValue)}
              ampm={true} // Enable 12-hour format with AM/PM
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  variant: "outlined",
                },
                openPickerButton: {
                  color: "primary",
                },
              }}
            />
          </Grid>

          <Grid size={{ lg: 3, xl: 2 }}>
            <TimePicker
              label="To Time"
              value={toTime}
              onChange={(newValue) => setToTime(newValue)}
              ampm={true} // Enable 12-hour format with AM/PM
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  variant: "outlined",
                },
                openPickerButton: {
                  color: "primary",
                },
              }}
            />
          </Grid>

          <Grid size={{ lg: 12, xl: 12 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ lg: 3, xl: 2 }}>
                {customList("Available Parameters", left)}
              </Grid>
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                  >
                    &gt;
                  </Button>
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                  >
                    &lt;
                  </Button>
                </Grid>
              </Grid>
              <Grid size={{ lg: 3, xl: 2 }}>
                {customList("Selected Parameters", right)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            onClick={handleGeneratePDF}
          >
            PDF
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: theme.palette.primary.main }}
            startIcon={<GridOnIcon />}
            onClick={() => {
              // Handle Excel export logic here
              console.log("Export to Excel clicked");
            }}
          >
            Excel
          </Button>
        </Stack>
      </Paper>
    </LocalizationProvider>
  );
}
