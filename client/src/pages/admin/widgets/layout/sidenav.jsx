import React from "react";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiUser, HiClipboardCheck, HiDocumentReport, HiLogout } from "react-icons/hi";

export function Sidenav({setCurrentView}) {
  
  return (
    <div className=" w-64 flex flex-col">
      <Sidebar aria-label="Default sidebar example" className="flex flex-col flex-grow">
        <Sidebar.Items className="flex-grow">
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie} onClick = {()=>setCurrentView('dashboard') }>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser} onClick={() => setCurrentView("users")} >
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiClipboardCheck} onClick={() => setCurrentView("verificationRequests")} >
              Verification Requests
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiDocumentReport}>
              Reports
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <Sidebar.Items className="mt-auto">
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiLogout}>
              Logout
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default Sidenav;
