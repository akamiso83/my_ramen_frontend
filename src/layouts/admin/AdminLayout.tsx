import { Outlet } from 'react-router-dom';
import { AdminHeader } from '@/layouts/admin/AdminHeader';
import { AdminFooter } from '@/layouts/admin/AdminFooter';

export const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <main className="flex-1 p-4 bg-white">
        <Outlet />
      </main>
      <AdminFooter />
    </div>
  );
};
