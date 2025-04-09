import React from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
  Divider,
  Paper,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";

export default function MeterDetails({
  selectedMeter,
  detailedData,
  handleBackClick,
}) {
  const demoData = {
    voltageLineToLine: {
      "R Y Voltage (V12)": "398.30 V",
      "Y B Voltage (V23)": "397.78 V",
      "B R Voltage (V31)": "399.17 V",
    },
    voltageLineToNeutral: {
      "R N Voltage (V1)": "230.10 V",
      "Y N Voltage (V2)": "229.85 V",
      "B N Voltage (V3)": "230.45 V",
      "Average Voltage (Vavg)": "230.45 V",
    },
    current: {
      "R Pahse Current (L1)": "1.34 Amps",
      "Y Pahse Current (L2)": "2.76 Amps",
      "B Pahse Current (L3)": "1.08 Amps",
      "Neutral Current (LN)": "0.21 Amps",
    },
    powerFactor: {
      "Power Factor R (PF1)": "0.99",
      "Power Factor Y (PF1)": "0.87",
      "Power Factor B (PF1)": "0.70",
      "Power Factor Average (PFavg)": "0.81",
    },
    activePower: {
      "Active Power R (P1)": "120 Kw",
      "Active Power Y (P2)": "160 Kw",
      "Active Power B (P3)": "100 Kw",
      "Active Power 3 Phase (Pavg)": "130 Kw",
    },
    reactivePower: {
      "Reactive Power R (Q1)": "12.9 VAr",
      "Reactive Power Y (Q2)": "16.9 VAr",
      "Reactive Power B (Q3)": "10.9 VAr",
      "Reactive Power 3 Phase (Qavg)": "13 VAr",
    },
    apparentPower: {
      "Apparent Power R (S1)": "12.9 VA",
      "Apparent Power Y (S2)": "16.9 VA",
      "Apparent Power B (S3)": "10.9 VA",
      "Apparent Power 3 Phase (Savg)": "13 VA",
    },
    activeEnergy: {
      "Active Import": "1250 kWh",
      "Active Export": "320 kWh",
      "Active Net (Import - Export)": "930 kWh",
      "Active Gross Import": "1250 kWh",
      "Active Gross Export": "320 kWh",
    },
    reactiveEnergy: {
      "Reactive Import": "450 kVArh",
      "Reactive Export": "120 kVArh",
    },
    apparentEnergy: {
      "Apparent Import": "1500 kVAh",
      "Apparent Export": "400 kVAh",
      "Apparent Net (Import - Export)": "1100 kVAh",
    },
    voltageTHD: {
      "Voltage THD R (THD V1)": "2.1%",
      "Voltage THD Y (THD V2)": "1.9%",
      "Voltage THD B (THD V3)": "2.3%",
    },
    currentTHD: {
      "Current THD R (THD L1)": "3.5%",
      "Current THD Y (THD L2)": "4.1%",
      "Current THD B (THD L3)": "3.8%",
    },
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1} sx={{ width: "100%" }}>
        <Grid size={12}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackClick}
            sx={{ mb: 1 }}
          >
            Back to Grid
          </Button>
        </Grid>
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
            <Typography variant="h5" sx={{ mb: 1, px: 1 }}>
              {selectedMeter.name}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="body1" sx={{ mb: 1, px: 1 }}>
              Updated at: {selectedMeter.lastSeen}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {/* Voltage Line to Neutral Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
          <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                Voltage Line to Neutral
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {Object.entries(demoData.voltageLineToNeutral).map(
                ([label, value]) => (
                  <Box
                    key={label}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value}
                    </Typography>
                  </Box>
                )
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Voltage Line to Line */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
          <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                Voltage Line to Line
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {Object.entries(demoData.voltageLineToLine).map(
                ([label, value]) => (
                  <Box
                    key={label}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value}
                    </Typography>
                  </Box>
                )
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Current */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
          <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                Phase Current
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {Object.entries(demoData.current).map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Power Factor */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
          <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                Power Factor
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {Object.entries(demoData.powerFactor).map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Active Power */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
          <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                Active Power
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {Object.entries(demoData.activePower).map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Reactive Power */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
          <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                Reactive Power
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {Object.entries(demoData.reactivePower).map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Apparent Power */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
          <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                Apparent Power
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {Object.entries(demoData.apparentPower).map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Active Energy */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
          <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                Active Energy
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {Object.entries(demoData.activeEnergy).map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Reactive Energy */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
          <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                Reactive Energy
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {Object.entries(demoData.reactiveEnergy).map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Apparent Energy */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
          <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
            <CardContent sx={{ pb: 1 }}>
              <Typography variant="body1" gutterBottom>
                Apparent Energy
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {Object.entries(demoData.apparentEnergy).map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Voltage THD */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
          <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
            <CardContent sx={{ pb: 1 }}>
              <Typography variant="body1" gutterBottom>
                Voltage THD
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {Object.entries(demoData.voltageTHD).map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Current THD */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
          <Card sx={{ minWidth: 300, maxWidth: 500 }}>
            <CardContent sx={{ pb: 1 }}>
              <Typography variant="body1" gutterBottom>
                Current THD
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {Object.entries(demoData.currentTHD).map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
