import { Outlet } from 'react-router-dom';
import { MobileHeader } from '@/layouts/mobile/MobileHeader';
import { MobileFooter } from '@/layouts/mobile/MobileFooter';

export const MobileLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MobileHeader />
      <main className="flex-1 p-4 bg-white">
        <Outlet />
      </main>
      <MobileFooter />
    </div>
  );
};
