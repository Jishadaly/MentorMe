import React from 'react'
import Header from '../mentee/partials/Header'
import Sidenav from '../mentee/partials/Sidenav'
import { Outlet } from 'react-router-dom'



function MenteeLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    <Header />
    <div className="flex flex-grow">
      <Sidenav />
      <main className="flex-grow ">
        <Outlet />
      </main>
    </div>
    {/* <MenteeFooter /> */}
  </div>
  )
}

export default MenteeLayout
