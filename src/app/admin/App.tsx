import { BrowserRouter, useRoutes } from 'react-router-dom';
import { adminRoutes } from './routes';

function AdminRouter() {
  return useRoutes(adminRoutes);
}

export default function AdminApp() {
  return (
    <BrowserRouter>
      <AdminRouter />
    </BrowserRouter>
  );
}
