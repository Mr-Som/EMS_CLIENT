import React from "react";
<<<<<<< HEAD

// Lazy load your components
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard.jsx"));
const RealTimeMonitoring = React.lazy(
  () => import("./views/realTimeMonitoring/RealTimeMonitoring.jsx")
);
const DeveloperMode = React.lazy(
  () => import("./views/developerMode/DeveloperMode.jsx")
);

const UserManagement = React.lazy(
  () => import("./views/configurations/UserManagement.jsx")
);

const GatewayManagement = React.lazy(
  () => import("./views/configurations/GatewayManagement/index.jsx")
);

const AddGateway = React.lazy(
  () => import("./views/configurations/GatewayManagement/Add.jsx")
);

const EditGateway = React.lazy(
  () => import("./views/configurations/GatewayManagement/Edit.jsx")
);

const MeterManagement = React.lazy(
  () => import("./views/configurations/MeterManagement/index.jsx")
);

const AddMeter = React.lazy(
  () => import("./views/configurations/MeterManagement/Add.jsx")
);

const EditMeter = React.lazy(
  () => import("./views/configurations/MeterManagement/Edit.jsx")
=======
import { Navigate } from "react-router-dom";

// Lazy load your components
const Dashboard = React.lazy(() => import("./views/dashboard/Index.jsx"));
const RealTimeMonitoring = React.lazy(() =>
  import("./views/realTimeMonitoring/RealTimeMonitoring.jsx")
);
const DeveloperMode = React.lazy(() =>
  import("./views/developerMode/DeveloperMode.jsx")
);

const UserManagement = React.lazy(() =>
  import("./views/configurations/UserManagement.jsx")
);

const GatewayManagement = React.lazy(() =>
  import("./views/configurations/GatewayManagement/index.jsx")
);

const AddGateway = React.lazy(() =>
  import("./views/configurations/GatewayManagement/Add.jsx")
);

const EditGateway = React.lazy(() =>
  import("./views/configurations/GatewayManagement/Edit.jsx")
);

const MeterManagement = React.lazy(() =>
  import("./views/configurations/MeterManagement/index.jsx")
);

const AddMeter = React.lazy(() =>
  import("./views/configurations/MeterManagement/Add.jsx")
);

const EditMeter = React.lazy(() =>
  import("./views/configurations/MeterManagement/Edit.jsx")
>>>>>>> 300b991 (version - 1.0.12)
);

const EnergyAnalysis = React.lazy(() => import("./component/Error.jsx"));

const GraphicalView = React.lazy(() => import("./component/Error.jsx"));

const Battery = React.lazy(() => import("./component/Error.jsx"));

const SolarSystem = React.lazy(() => import("./component/Error.jsx"));

<<<<<<< HEAD
const Reports = React.lazy(() => import("./component/Error.jsx"));
=======
const MeterReadingData = React.lazy(() =>
  import("./views/report/MeterReadingData.jsx")
);

const MaximumDemand = React.lazy(() => import("./component/Error.jsx"));

const ShiftReport = React.lazy(() => import("./component/Error.jsx"));

const MinMaxReport = React.lazy(() => import("./component/Error.jsx"));

const AlarmReport = React.lazy(() => import("./component/Error.jsx"));
>>>>>>> 300b991 (version - 1.0.12)

const PerpaidManagement = React.lazy(() => import("./component/Error.jsx"));

const CarbonAnalysis = React.lazy(() => import("./component/Error.jsx"));

const Alarm = React.lazy(() => import("./component/Error.jsx"));

// Define your routes here
const routes = [
<<<<<<< HEAD
  { path: "/", exact: true, name: "Home" },
  { path: "/Dashboard", name: "Dashboard", element: Dashboard },
  {
    path: "/RealTimeMonitoring",
    name: "Real-Time Monitoring",
    element: RealTimeMonitoring,
  },
  { path: "/DeveloperMode", name: "Developer Mode", element: DeveloperMode },
  { path: "/UserManagement", name: "User Management", element: UserManagement },
  {
    path: "/GatewayManagement",
=======
  {
    path: "/",
    name: "Home",
    element: () => <Navigate to="/dashboard" replace />,
  },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  {
    path: "/realtimemonitoring",
    name: "Real-Time Monitoring",
    element: RealTimeMonitoring,
  },
  { path: "/developermode", name: "Developer Mode", element: DeveloperMode },
  { path: "/usermanagement", name: "User Management", element: UserManagement },
  {
    path: "/gatewaymanagement",
>>>>>>> 300b991 (version - 1.0.12)
    name: "Gateway Management",
    element: GatewayManagement,
  },
  {
<<<<<<< HEAD
    path: "/gatewayManagement/Add",
=======
    path: "/gatewaymanagement/add",
>>>>>>> 300b991 (version - 1.0.12)
    name: "Add Gateway",
    element: AddGateway,
  },
  {
<<<<<<< HEAD
    path: "/gatewayManagement/Edit",
=======
    path: "/gatewaymanagement/edit",
>>>>>>> 300b991 (version - 1.0.12)
    name: "Edit Gateway",
    element: EditGateway,
  },
  {
<<<<<<< HEAD
    path: "/MeterManagement",
    name: "Meter Management",
    element: MeterManagement,
  },
  { path: "/meterManagement/Add", name: "Add Meter", element: AddMeter },
  { path: "/meterManagement/Edit", name: "Edit Meter", element: EditMeter },

  { path: "/energyAnalysis", name: "Energy Analysis", element: EnergyAnalysis },
  { path: "/graphicalView", name: "Graphical View", element: GraphicalView },
  { path: "/battery", name: "Battery Management", element: Battery },
  { path: "/solarSystem", name: "Solar System", element: SolarSystem },
  { path: "/reports", name: "Reports", element: Reports },
  {
    path: "/perpaidManagement",
    name: "Perpaid Management",
    element: PerpaidManagement,
  },
  { path: "/carbonAnalysis", name: "Carbon Analysis", element: CarbonAnalysis },
=======
    path: "/metermanagement",
    name: "Meter Management",
    element: MeterManagement,
  },
  { path: "/metermanagement/add", name: "Add Meter", element: AddMeter },
  { path: "/metermanagement/edit", name: "Edit Meter", element: EditMeter },
  { path: "/energyanalysis", name: "Energy Analysis", element: EnergyAnalysis },
  { path: "/graphicalview", name: "Graphical View", element: GraphicalView },
  { path: "/battery", name: "Battery Management", element: Battery },
  { path: "/solarsystem", name: "Solar System", element: SolarSystem },
  {
    path: "MeterReadingData",
    name: "Meter Reading Data",
    element: MeterReadingData,
  },
  {
    path: "/reports/maximumdemand",
    name: "Maximum Demand",
    element: MaximumDemand,
  },
  {
    path: "/reports/shiftreport",
    name: "Shiftwise Consumption/Generation",
    element: ShiftReport,
  },
  {
    path: "/reports/min-maxreport",
    name: "Min-max Data",
    element: MinMaxReport,
  },
  {
    path: "/reports/alarmreport",
    name: "Alarm Data",
    element: AlarmReport,
  },
  {
    path: "/perpaidmanagement",
    name: "Perpaid Management",
    element: PerpaidManagement,
  },
  { path: "/carbonanalysis", name: "Carbon Analysis", element: CarbonAnalysis },
>>>>>>> 300b991 (version - 1.0.12)
  { path: "/alarm", name: "Alarm", element: Alarm },
];

export default routes;
