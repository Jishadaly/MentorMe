import React from 'react'
import Header from '../mentee/partials/Header'
import Sidenav from '../mentee/partials/Sidenav'
import { Outlet } from 'react-router-dom'



function MenteeLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 pt-16"> {/* pt-16 for header height */}
        <Sidenav />
        <main className="flex-1 w-full lg:ml-20 ml-0 mb-16 lg:mb-0 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MenteeLayout
