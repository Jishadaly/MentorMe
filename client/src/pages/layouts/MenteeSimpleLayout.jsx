// MenteeSimpleLayout.jsx
import React from 'react'
import Header from '../mentee/partials/Header'
import { Outlet } from 'react-router-dom'

function MenteeSimpleLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
        <Outlet />
    </div>
  )
}

export default MenteeSimpleLayout