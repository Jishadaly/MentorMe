

import React, { useState } from "react";
import Sidenav from "./widgets/layout/sidenav";
import Header from "./partials/Header";
import Dashboard from "./Dashboard";
import VerificationRequests from "./VerificationRequests";
import Users from "./Users";
import SlotManage from "./slotManage";



export function AdminHome() {
  
  const [currentView , setCurrentView] = useState("dashboard");

  const renderComponent = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "verificationRequests":
        return <VerificationRequests />;
      // Add more cases as needed for other components
      case "users":
        return <Users />;
        case "slotManage":
        return <SlotManage />;
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




