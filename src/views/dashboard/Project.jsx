<<<<<<< HEAD
import React from 'react';
=======
import React from "react";
>>>>>>> 300b991 (version - 1.0.12)
import {
  Card,
  CardHeader,
  CardContent,
<<<<<<< HEAD
  Typography,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Stack,
  ListItem,
} from '@mui/material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import Co2Icon from '@mui/icons-material/Co2';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

export default function EnergyStatistics() {
  return (
      <Card>
        <CardHeader
          title={
            <Typography gutterBottom variant="h6" component="h6">
              Project
            </Typography>
          }
          sx={{ paddingX: 3, paddingTop: 2, paddingBottom: 0, }} 
        />
        <CardContent sx={{ padding: 1, '&:last-child': { paddingBottom: 1 }, height: { xs: '200px', sm: '250px', md: '350px' } }}>
          <ListItem divider sx={{ padding: 1,}}>
            <ListItemButton>
              <ListItemText
                primary={<Typography variant="subtitle1">Avg Voltage</Typography>}
                secondary="243"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                    <ListItemAvatar>
                        <Avatar sx={{ color: 'success.light', bgcolor: 'transparent' }}>
                          <ThumbUpAltIcon sx={{ fontSize: "2.5rem" }} />
                        </Avatar>
                    </ListItemAvatar>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
          <ListItem divider sx={{ padding: 1,}}>
            <ListItemButton>
              <ListItemText
                primary={<Typography variant="subtitle1">Current</Typography>}
                secondary="1.38"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                    <ListItemAvatar>
                        <Avatar sx={{ color: 'warning.light', bgcolor: 'transparent' }}>
                          <ThumbDownAltIcon sx={{ fontSize: "2.5rem" }} />
                        </Avatar>
                    </ListItemAvatar>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ padding: 1,}}>
            <ListItemButton>
              <ListItemText
                primary={<Typography variant="subtitle1">PF Avg</Typography>}
                secondary="0.78"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                    <ListItemAvatar>
                        <Avatar sx={{ color: 'error.light', bgcolor: 'transparent' }}>
                          <ThumbDownAltIcon sx={{ fontSize: "2.5rem" }} />
                        </Avatar>
                    </ListItemAvatar>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
        </CardContent>
      </Card>
  );
}
=======
  CardActions,
  Typography,
  Avatar,
  Stack,
  Divider,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LaunchIcon from "@mui/icons-material/Launch";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ApartmentIcon from "@mui/icons-material/Apartment";

export default function EnergyStatistics() {
  const stats = [
    {
      id: "voltage",
      label: "Avg Voltage",
      value: "243",
      status: "good",
      icon: <ThumbUpAltIcon fontSize="large" />,
      color: "primary",
    },
    {
      id: "current",
      label: "Current",
      value: "1.38",
      status: "warning",
      icon: <ThumbDownAltIcon fontSize="large" />,
      color: "warning",
    },
    {
      id: "pf",
      label: "PF Avg",
      value: "0.78",
      status: "error",
      icon: <ThumbDownAltIcon fontSize="large" />,
      color: "error",
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
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <ApartmentIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Project"
        subheader="Energy Statistics"
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
            lg: "230px",
            xl: "280px",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "middle",
        }}
      >
        <Stack spacing={2} sx={{ width: "100%", mt: 2 }}>
          {stats.map((item) => (
            <Box key={item.id}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="column">
                  <Typography variant="body1" fontWeight="medium">
                    {item.label}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.main"
                    fontWeight="bold"
                  >
                    {item.value}
                  </Typography>
                </Stack>
                <Stack direction="column" alignItems="center">
                  <IconButton
                    aria-label={item.status}
                    sx={{ color: `${item.color}.main` }}
                    size="large"
                  >
                    {item.icon}
                  </IconButton>
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
          View Detailed Report
        </Button>
      </CardActions>
    </Card>
  );
}
>>>>>>> 300b991 (version - 1.0.12)
