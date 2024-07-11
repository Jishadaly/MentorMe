import React from 'react';
import Sidenav from '../admin/widgets/layout/sidenav';
import Header from '../admin/partials/Header';
Header

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col flex-grow">
        <Sidenav />
        <main className="flex-grow p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
