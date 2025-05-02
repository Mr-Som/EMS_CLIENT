import React from "react";
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
);

const EnergyAnalysis = React.lazy(() => import("./component/Error.jsx"));

const GraphicalView = React.lazy(() => import("./component/Error.jsx"));

const Battery = React.lazy(() => import("./component/Error.jsx"));

const SolarSystem = React.lazy(() => import("./component/Error.jsx"));

const MeterReadingData = React.lazy(() =>
  import("./views/report/MeterReadingData.jsx")
);

const MaximumDemand = React.lazy(() => import("./component/Error.jsx"));

const ShiftReport = React.lazy(() => import("./component/Error.jsx"));

const MinMaxReport = React.lazy(() => import("./component/Error.jsx"));

const AlarmReport = React.lazy(() => import("./component/Error.jsx"));

const PerpaidManagement = React.lazy(() => import("./component/Error.jsx"));

const CarbonAnalysis = React.lazy(() => import("./component/Error.jsx"));

const Alarm = React.lazy(() => import("./component/Error.jsx"));

// Define your routes here
const routes = [
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
    name: "Gateway Management",
    element: GatewayManagement,
  },
  {
    path: "/gatewaymanagement/add",
    name: "Add Gateway",
    element: AddGateway,
  },
  {
    path: "/gatewaymanagement/edit",
    name: "Edit Gateway",
    element: EditGateway,
  },
  {
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
  { path: "/alarm", name: "Alarm", element: Alarm },
];

export default routes;
