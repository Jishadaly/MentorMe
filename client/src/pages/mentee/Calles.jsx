import React from 'react'
import Header from './partials/Header'
import Sidenav from './partials/Sidenav'

function CallesPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
       <Header />
       <Sidenav />
       <main className="ml-20 mt-16 p-6 flex-1 overflow-y-auto">
       <h1>you have no calles</h1>
       </main>
    </div>
  )
}

export default CallesPage
