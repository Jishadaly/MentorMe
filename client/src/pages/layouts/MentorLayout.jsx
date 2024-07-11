import React from 'react'
import SideNav from '../mentor/partials/SideNav'
import Header from '../mentor/partials/Header'
import { Outlet } from 'react-router-dom'


function MentorLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNav />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MentorLayout
