// // import React from "react";
// // import {
// //   Typography,
// //   Card,
// //   CardHeader,
// //   CardBody,
// //   IconButton,
// //   Menu,
// //   MenuHandler,
// //   MenuList,
// //   MenuItem,
// //   Avatar,
// //   Tooltip,
// //   Progress,
// // } from "@material-tailwind/react";
// // import {
// //   EllipsisVerticalIcon,
// //   ArrowUpIcon,
// // } from "@heroicons/react/24/outline";
// // import {
// //   statisticsCardsData,
// //   statisticsChartsData,
// //   projectsTableData,
// //   ordersOverviewData,
// // } from "./data";  // Corrected path
// // import statisticsCardsData from "./data/statistics-cards-data";
// // import statisticsChartsData from "./data/statistics-charts-data";
// // import projectsTableData from "./data/projects-table-data";
// // import ordersOverviewData from "./data/orders-overview-data";
// // import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

// import Sidenav from "./widgets/layout/sidenav";

// // import StatisticsCard from "./widgets/cards/statistics-card";
// // import StatisticsChart from "./widgets/charts/statistics-chart";
// import Header from "./partials/Header";
// import Dashboard from "./Dashboard";

// export function AdminHome() {
//   return (
//     // <div className="flex flex-col h-screen">
//       <div>
//       <Header /> 
//       <Sidenav/>
//       <Dashboard/>
//       {/* <Dashboard/> */}
//     {/* <div className="flex">
//     <div className="mx-auto max-w-screen-md py-12"> */}
//      </div>
    
//   );
// }

// export default AdminHome;

import React, { useState } from "react";
import Sidenav from "./widgets/layout/sidenav";
import Header from "./partials/Header";
import Dashboard from "./Dashboard";
import VerificationRequests from "./VerificationRequests";

export function AdminHome() {
  
  const [currentView , setCurrentView] = useState("dashboard");

  const renderComponent = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "verificationRequests":
        return <VerificationRequests />;
      // Add more cases as needed for other components

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <Sidenav setCurrentView={setCurrentView} />
        <div  className="flex-grow overflow-y-auto p-4 ml-1">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;




