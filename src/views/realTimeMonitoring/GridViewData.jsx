import React from "react";
import {
  Box,
  Button,
  Typography,
<<<<<<< HEAD
  Stack,
=======
>>>>>>> 300b991 (version - 1.0.12)
  Card,
  CardContent,
  Divider,
  Paper,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
<<<<<<< HEAD

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

=======
import { io } from "socket.io-client";

export default function MeterDetails({ selectedMeter, handleBackClick }) {
  const initialState = {
    id: selectedMeter?.id || "",
    name: selectedMeter?.name || "",
    lastSeen: selectedMeter?.lastSeen || "NaN",
    voltages: {
      phase1: "NaN",
      phase2: "NaN",
      phase3: "NaN",
      average: "NaN",
      v12: "NaN",
      v23: "NaN",
      v31: "NaN",
    },
    currents: {
      phase1: "NaN",
      phase2: "NaN",
      phase3: "NaN",
      neutral: "NaN",
    },
    powerFactor: {
      pf1: "NaN",
      pf2: "NaN",
      pf3: "NaN",
      pfavg: "NaN",
    },
    activePower: {
      phase1: "NaN",
      phase2: "NaN",
      phase3: "NaN",
      average: "NaN",
    },
    reactivePower: {
      phase1: "NaN",
      phase2: "NaN",
      phase3: "NaN",
      average: "NaN",
    },
    apparentPower: {
      phase1: "NaN",
      phase2: "NaN",
      phase3: "NaN",
      average: "NaN",
    },
    voltageTHD: {
      phase1: "NaN",
      phase2: "NaN",
      phase3: "NaN",
    },
    currentTHD: {
      phase1: "NaN",
      phase2: "NaN",
      phase3: "NaN",
    },
    activeEnergy: {
      import: "NaN",
      export: "NaN",
      net: "NaN",
    },
    reactiveEnergy: {
      import: "NaN",
      export: "NaN",
    },
    apparentEnergy: {
      import: "NaN",
      export: "NaN",
      net: "NaN",
    },
  };

  const [meterDataState, setMeterDataState] = React.useState(initialState);
  const [isLoading, setIsLoading] = React.useState(true);
  const socketRef = React.useRef(null);

  // Fetch data on mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_SERVER_API_URL
          }/api/real-time-monitoring/meter/${selectedMeter.id}`,
          { credentials: "include" }
        );
        const result = await response.json();
        if (result.success) {
          setMeterDataState((prev) => ({ ...prev, ...result.data }));
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedMeter.id]);

  // Format timestamp to DD-MM-YYYY HH:MM:SS
  const formatTimestamp = (date) => {
    if (!date || date === "NaN" || date === null) return "Unknown";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Unknown";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  // Convert to kilo-units (W to kW, Wh to kWh, etc.)
  const convertToKilo = (value) =>
    value !== "NaN" && value !== undefined && value !== null
      ? Number(value) / 1000
      : "NaN";

  // Initialize Socket.IO
  React.useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SERVER_API_URL, {
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      console.log("MeterDetails connected to Socket.IO");
      socketRef.current.emit("subscribe", selectedMeter.id);
    });

    socketRef.current.on("meterUpdate", (payload) => {
      console.log("meterUpdate payload:", payload);
      if (payload.meter_id === selectedMeter.id) {
        setMeterDataState((prev) => ({
          ...prev,
          lastSeen: payload.created_at || prev.lastSeen,
          voltages: {
            phase1: payload.v1 ?? prev.voltages.phase1,
            phase2: payload.v2 ?? prev.voltages.phase2,
            phase3: payload.v3 ?? prev.voltages.phase3,
            average: payload.vavg ?? prev.voltages.average,
            v12: payload.v12 ?? prev.voltages.v12,
            v23: payload.v23 ?? prev.voltages.v23,
            v31: payload.v31 ?? prev.voltages.v31,
          },
          currents: {
            phase1: payload.l1 ?? prev.currents.phase1,
            phase2: payload.l2 ?? prev.currents.phase2,
            phase3: payload.l3 ?? prev.currents.phase3,
            neutral: payload.ln ?? prev.currents.neutral,
          },
          powerFactor: {
            pf1: payload.pf1 ?? prev.powerFactor.pf1,
            pf2: payload.pf2 ?? prev.powerFactor.pf2,
            pf3: payload.pf3 ?? prev.powerFactor.pf3,
            pfavg: payload.pfavg ?? prev.powerFactor.pfavg,
          },
          activePower: {
            phase1: payload.p1 ?? prev.activePower.phase1,
            phase2: payload.p2 ?? prev.activePower.phase2,
            phase3: payload.p3 ?? prev.activePower.phase3,
            average: payload.pavg ?? prev.activePower.average,
          },
          reactivePower: {
            phase1: payload.q1 ?? prev.reactivePower.phase1,
            phase2: payload.q2 ?? prev.reactivePower.phase2,
            phase3: payload.q3 ?? prev.reactivePower.phase3,
            average: payload.qavg ?? prev.reactivePower.average,
          },
          apparentPower: {
            phase1: payload.s1 ?? prev.apparentPower.phase1,
            phase2: payload.s2 ?? prev.apparentPower.phase2,
            phase3: payload.s3 ?? prev.apparentPower.phase3,
            average: payload.savg ?? prev.apparentPower.average,
          },
          voltageTHD: {
            phase1: payload.thdv1 ?? prev.voltageTHD.phase1,
            phase2: payload.thdv2 ?? prev.voltageTHD.phase2,
            phase3: payload.thdv3 ?? prev.voltageTHD.phase3,
          },
          currentTHD: {
            phase1: payload.thdl1 ?? prev.currentTHD.phase1,
            phase2: payload.thdl2 ?? prev.currentTHD.phase2,
            phase3: payload.thdl3 ?? prev.currentTHD.phase3,
          },
          activeEnergy: {
            import: payload.whimport ?? prev.activeEnergy.import,
            export: payload.whexport ?? prev.activeEnergy.export,
            net: payload.whnet ?? prev.activeEnergy.net,
          },
          reactiveEnergy: {
            import: payload.varhimport ?? prev.reactiveEnergy.import,
            export: payload.varhexport ?? prev.reactiveEnergy.export,
          },
          apparentEnergy: {
            import: payload.vahimport ?? prev.apparentEnergy.import,
            export: payload.vahexport ?? prev.apparentEnergy.export,
            net:
              (payload.vahimport ?? prev.apparentEnergy.import) &&
              (payload.vahexport ?? prev.apparentEnergy.export)
                ? (payload.vahimport ?? prev.apparentEnergy.import) -
                  (payload.vahexport ?? prev.apparentEnergy.export)
                : prev.apparentEnergy.net,
          },
        }));
      }
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("MeterDetails Socket.IO error:", err.message);
    });

    return () => {
      socketRef.current.emit("unsubscribe", selectedMeter.id);
      socketRef.current.disconnect();
    };
  }, [selectedMeter.id]);

  // Map data to UI with conversions
  const meterData = {
    voltageLineToLine: {
      "R Y Voltage (V12)":
        meterDataState.voltages.v12 !== "NaN"
          ? `${meterDataState.voltages.v12} V`
          : "NaN",
      "Y B Voltage (V23)":
        meterDataState.voltages.v23 !== "NaN"
          ? `${meterDataState.voltages.v23} V`
          : "NaN",
      "B R Voltage (V31)":
        meterDataState.voltages.v31 !== "NaN"
          ? `${meterDataState.voltages.v31} V`
          : "NaN",
    },
    voltageLineToNeutral: {
      "R N Voltage (V1)":
        meterDataState.voltages.phase1 !== "NaN"
          ? `${meterDataState.voltages.phase1} V`
          : "NaN",
      "Y N Voltage (V2)":
        meterDataState.voltages.phase2 !== "NaN"
          ? `${meterDataState.voltages.phase2} V`
          : "NaN",
      "B N Voltage (V3)":
        meterDataState.voltages.phase3 !== "NaN"
          ? `${meterDataState.voltages.phase3} V`
          : "NaN",
      "Average Voltage (Vavg)":
        meterDataState.voltages.average !== "NaN"
          ? `${meterDataState.voltages.average} V`
          : "NaN",
    },
    current: {
      "R Phase Current (L1)":
        meterDataState.currents.phase1 !== "NaN"
          ? `${meterDataState.currents.phase1} Amps`
          : "NaN",
      "Y Phase Current (L2)":
        meterDataState.currents.phase2 !== "NaN"
          ? `${meterDataState.currents.phase2} Amps`
          : "NaN",
      "B Phase Current (L3)":
        meterDataState.currents.phase3 !== "NaN"
          ? `${meterDataState.currents.phase3} Amps`
          : "NaN",
      "Neutral Current (LN)":
        meterDataState.currents.neutral !== "NaN"
          ? `${meterDataState.currents.neutral} Amps`
          : "NaN",
    },
    powerFactor: {
      "Power Factor R (PF1)":
        meterDataState.powerFactor.pf1 !== "NaN"
          ? `${meterDataState.powerFactor.pf1}`
          : "NaN",
      "Power Factor Y (PF2)":
        meterDataState.powerFactor.pf2 !== "NaN"
          ? `${meterDataState.powerFactor.pf2}`
          : "NaN",
      "Power Factor B (PF3)":
        meterDataState.powerFactor.pf3 !== "NaN"
          ? `${meterDataState.powerFactor.pf3}`
          : "NaN",
      "Power Factor Average (PFavg)":
        meterDataState.powerFactor.pfavg !== "NaN"
          ? `${meterDataState.powerFactor.pfavg}`
          : "NaN",
    },
    activePower: {
      "Active Power R (P1)":
        meterDataState.activePower.phase1 !== "NaN"
          ? `${convertToKilo(meterDataState.activePower.phase1)} kW`
          : "NaN",
      "Active Power Y (P2)":
        meterDataState.activePower.phase2 !== "NaN"
          ? `${convertToKilo(meterDataState.activePower.phase2)} kW`
          : "NaN",
      "Active Power B (P3)":
        meterDataState.activePower.phase3 !== "NaN"
          ? `${convertToKilo(meterDataState.activePower.phase3)} kW`
          : "NaN",
      "Active Power 3 Phase (Pavg)":
        meterDataState.activePower.average !== "NaN"
          ? `${convertToKilo(meterDataState.activePower.average)} kW`
          : "NaN",
    },
    reactivePower: {
      "Reactive Power R (Q1)":
        meterDataState.reactivePower.phase1 !== "NaN"
          ? `${meterDataState.reactivePower.phase1} VAr`
          : "NaN",
      "Reactive Power Y (Q2)":
        meterDataState.reactivePower.phase2 !== "NaN"
          ? `${meterDataState.reactivePower.phase2} VAr`
          : "NaN",
      "Reactive Power B (Q3)":
        meterDataState.reactivePower.phase3 !== "NaN"
          ? `${meterDataState.reactivePower.phase3} VAr`
          : "NaN",
      "Reactive Power 3 Phase (Qavg)":
        meterDataState.reactivePower.average !== "NaN"
          ? `${meterDataState.reactivePower.average} VAr`
          : "NaN",
    },
    apparentPower: {
      "Apparent Power R (S1)":
        meterDataState.apparentPower.phase1 !== "NaN"
          ? `${meterDataState.apparentPower.phase1} VA`
          : "NaN",
      "Apparent Power Y (S2)":
        meterDataState.apparentPower.phase2 !== "NaN"
          ? `${meterDataState.apparentPower.phase2} VA`
          : "NaN",
      "Apparent Power B (S3)":
        meterDataState.apparentPower.phase3 !== "NaN"
          ? `${meterDataState.apparentPower.phase3} VA`
          : "NaN",
      "Apparent Power 3 Phase (Savg)":
        meterDataState.apparentPower.average !== "NaN"
          ? `${meterDataState.apparentPower.average} VA`
          : "NaN",
    },
    activeEnergy: {
      "Active Import":
        meterDataState.activeEnergy.import !== "NaN"
          ? `${convertToKilo(meterDataState.activeEnergy.import)} kWh`
          : "NaN",
      "Active Export":
        meterDataState.activeEnergy.export !== "NaN"
          ? `${convertToKilo(meterDataState.activeEnergy.export)} kWh`
          : "NaN",
      "Active Net (Import - Export)":
        meterDataState.activeEnergy.net !== "NaN"
          ? `${convertToKilo(meterDataState.activeEnergy.net)} kWh`
          : "NaN",
      "Active Gross Import":
        meterDataState.activeEnergy.import !== "NaN"
          ? `${convertToKilo(meterDataState.activeEnergy.import)} kWh`
          : "NaN",
      "Active Gross Export":
        meterDataState.activeEnergy.export !== "NaN"
          ? `${convertToKilo(meterDataState.activeEnergy.export)} kWh`
          : "NaN",
    },
    reactiveEnergy: {
      "Reactive Import":
        meterDataState.reactiveEnergy.import !== "NaN"
          ? `${convertToKilo(meterDataState.reactiveEnergy.import)} kVArh`
          : "NaN",
      "Reactive Export":
        meterDataState.reactiveEnergy.export !== "NaN"
          ? `${convertToKilo(meterDataState.reactiveEnergy.export)} kVArh`
          : "NaN",
    },
    apparentEnergy: {
      "Apparent Import":
        meterDataState.apparentEnergy.import !== "NaN"
          ? `${convertToKilo(meterDataState.apparentEnergy.import)} kVAh`
          : "NaN",
      "Apparent Export":
        meterDataState.apparentEnergy.export !== "NaN"
          ? `${convertToKilo(meterDataState.apparentEnergy.export)} kVAh`
          : "NaN",
      "Apparent Net (Import - Export)":
        meterDataState.apparentEnergy.net !== "NaN"
          ? `${convertToKilo(meterDataState.apparentEnergy.net)} kVAh`
          : "NaN",
    },
    voltageTHD: {
      "Voltage THD R (THD V1)":
        meterDataState.voltageTHD.phase1 !== "NaN"
          ? `${meterDataState.voltageTHD.phase1}%`
          : "NaN",
      "Voltage THD Y (THD V2)":
        meterDataState.voltageTHD.phase2 !== "NaN"
          ? `${meterDataState.voltageTHD.phase2}%`
          : "NaN",
      "Voltage THD B (THD V3)":
        meterDataState.voltageTHD.phase3 !== "NaN"
          ? `${meterDataState.voltageTHD.phase3}%`
          : "NaN",
    },
    currentTHD: {
      "Current THD R (THD L1)":
        meterDataState.currentTHD.phase1 !== "NaN"
          ? `${meterDataState.currentTHD.phase1}%`
          : "NaN",
      "Current THD Y (THD L2)":
        meterDataState.currentTHD.phase2 !== "NaN"
          ? `${meterDataState.currentTHD.phase2}%`
          : "NaN",
      "Current THD B (THD L3)":
        meterDataState.currentTHD.phase3 !== "NaN"
          ? `${meterDataState.currentTHD.phase3}%`
          : "NaN",
    },
  };

  if (isLoading) {
    return (
      <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
        <Typography variant="h6">Loading meter data...</Typography>
      </Box>
    );
  }

>>>>>>> 300b991 (version - 1.0.12)
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
<<<<<<< HEAD
              {selectedMeter.name}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="body1" sx={{ mb: 1, px: 1 }}>
              Updated at: {selectedMeter.lastSeen}
=======
              {selectedMeter.name || "Unknown Meter"}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="body1" sx={{ mb: 1, px: 1 }}>
              Updated at: {formatTimestamp(meterDataState.lastSeen)}
>>>>>>> 300b991 (version - 1.0.12)
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 2 }} />
<<<<<<< HEAD
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
=======
      {Object.values(meterData).every((category) =>
        Object.values(category).every((value) => value === "NaN")
      ) ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          No data available for this meter.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
            <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Voltage Line to Neutral
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(meterData.voltageLineToNeutral).map(
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
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
            <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Voltage Line to Line
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(meterData.voltageLineToLine).map(
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
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
            <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Phase Current
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(meterData.current).map(([label, value]) => (
>>>>>>> 300b991 (version - 1.0.12)
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
<<<<<<< HEAD
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
=======
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
            <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Power Factor
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(meterData.powerFactor).map(([label, value]) => (
>>>>>>> 300b991 (version - 1.0.12)
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
<<<<<<< HEAD
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
=======
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
            <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Active Power
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(meterData.activePower).map(([label, value]) => (
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
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
            <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Reactive Power
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(meterData.reactivePower).map(
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
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
            <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Apparent Power
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(meterData.apparentPower).map(
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
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
            <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Active Energy
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(meterData.activeEnergy).map(
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
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
            <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Reactive Energy
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(meterData.reactiveEnergy).map(
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
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
            <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
              <CardContent sx={{ pb: 1 }}>
                <Typography variant="body1" gutterBottom>
                  Apparent Energy
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(meterData.apparentEnergy).map(
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
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
            <Card sx={{ minWidth: 300, maxWidth: 500, mb: 1 }}>
              <CardContent sx={{ pb: 1 }}>
                <Typography variant="body1" gutterBottom>
                  Voltage THD
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(meterData.voltageTHD).map(([label, value]) => (
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
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
            <Card sx={{ minWidth: 300, maxWidth: 500 }}>
              <CardContent sx={{ pb: 1 }}>
                <Typography variant="body1" gutterBottom>
                  Current THD
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(meterData.currentTHD).map(([label, value]) => (
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
      )}
>>>>>>> 300b991 (version - 1.0.12)
    </Box>
  );
}
