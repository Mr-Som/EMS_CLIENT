import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Stack,
  Divider,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import Co2Icon from "@mui/icons-material/Co2";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LaunchIcon from "@mui/icons-material/Launch";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export default function EnergyStatistics() {
  const stats = [
    {
      id: "electricity",
      label: "Electricity (kWh)",
      value: "49.16",
      yoy: "-81.0%",
      mom: "-8.0%",
      icon: <ElectricBoltIcon />,
      color: "primary",
    },
    {
      id: "comprehensive",
      label: "Energy cost (Rs)",
      value: "6004",
      yoy: "-88.1%",
      mom: "-5.5%",
      icon: <CurrencyRupeeIcon />,
      color: "primary",
    },
    {
      id: "carbon",
      label: "Carbon emission (kg)",
      value: "29.99",
      yoy: "-88.1%",
      mom: "-5.5%",
      icon: <Co2Icon />,
      color: "primary",
    },
  ];

  // Function to determine if a value is negative
  const isNegative = (value) => parseFloat(value) < 0;

  return (
    <Card sx={{ borderRadius: 3, height: { lg: "350px", xl: "400px" } }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <FlashOnIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Energy Analysis"
        subheader="Today, 2:00 AM"
        sx={{
          "& .MuiCardHeader-title": {
            fontWeight: 600,
            fontSize: "1.125rem",
          },
          "& .MuiCardHeader-subheader": {
            color: "text.secondary",
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
          display: "flex",
          alignItems: "center",
          justifyContent: "middle",
        }}
      >
        <Stack spacing={3} width="100%">
          {stats.map((item) => (
            <Box key={item.id}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "transparent",
                      color: `${item.color}.main`,
                      border: `1px solid`,
                      borderColor: `${item.color}.main`,
                    }}
                  >
                    {item.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="semibold">
                      {item.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="text.main"
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </Stack>
                <Stack spacing={3} direction="row">
                  {/* YoY Section */}
                  <Box sx={{ textAlign: "right" }}>
                    <Typography
                      variant="subtitle1"
                      color="text.primary"
                      fontWeight={400}
                    >
                      YoY
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={0.5}
                      justifyContent="flex-end"
                    >
                      {isNegative(item.yoy) ? (
                        <TrendingDownIcon color="danger" fontSize="small" />
                      ) : (
                        <TrendingUpIcon color="primary" fontSize="small" />
                      )}
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color={isNegative(item.yoy) ? "danger" : "primary"}
                      >
                        {item.yoy}
                      </Typography>
                    </Stack>
                  </Box>

                  {/* MoM Section */}
                  <Box sx={{ textAlign: "right", mt: 0 }}>
                    <Typography
                      variant="subtitle1"
                      color="text.primary"
                      fontWeight={400}
                    >
                      MoM
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={0.5}
                      justifyContent="flex-end"
                    >
                      {isNegative(item.mom) ? (
                        <TrendingDownIcon color="danger" fontSize="small" />
                      ) : (
                        <TrendingUpIcon color="primary" fontSize="small" />
                      )}
                      <Typography
                        variant="body2s"
                        fontWeight="bold"
                        color={isNegative(item.mom) ? "danger" : "primary"}
                      >
                        {item.mom}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </CardContent>
      <Divider />
      <CardActions sx={{ p: 2 }}>
        <Button
          size="small"
          endIcon={<LaunchIcon fontSize="small" />}
          sx={{ textTransform: "none" }}
        >
          Go to Detailed Energy Analysis Report
        </Button>
      </CardActions>
    </Card>
  );
}
