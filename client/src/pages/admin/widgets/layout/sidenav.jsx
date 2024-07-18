import React from "react";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiUser, HiClipboardCheck, HiDocumentReport, HiLogout , HiCalendar } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slice/adminAuthSlice";
import { useNavigate } from "react-router-dom";

export function Sidenav({setCurrentView}) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = ()=>{
     dispatch(logout())
     navigate('/admin/login')
     persistor.purge(); // Purge the persisted state
    localStorage.clear(); // Clear local storage
    
  }
  
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
            <Sidebar.Item href="#" icon={HiCalendar} onClick={() => setCurrentView("slotManage")} >
              Slot Manage
            </Sidebar.Item>

          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <Sidebar.Items className="mb-20">
         
        </Sidebar.Items>
      </Sidebar>

      <button className="bg-black text-white w-full" onClick={handleLogout}> Logout</button>
    </div>
  );
}

export default Sidenav;
