import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { isNativeApp } from '@/shared/utils/platform';
import AdminApp from '@/app/admin/App';
import MobileApp from '@/app/mobile/App';
import '@/index.css';

const App = isNativeApp() ? <MobileApp /> : <AdminApp />;
createRoot(document.getElementById('root')!).render(<StrictMode>{App}</StrictMode>);
