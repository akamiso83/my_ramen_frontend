import { BrowserRouter, useRoutes } from 'react-router-dom';
import { mobileRoutes } from './routes';

function MobileRouter() {
  return useRoutes(mobileRoutes);
}

export default function MobileApp() {
  return (
    <BrowserRouter>
      <MobileRouter />
    </BrowserRouter>
  );
}
