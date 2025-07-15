/**
 * 後で最新のv7以降の方法でリファクタする
 * 参考：https://reactrouter.com/start/framework/routing
 */
import { Navigate, type RouteObject } from 'react-router-dom';
import { MobileTopPage } from '@/features/mobile/top/pages/MobileTopPage';
/**
 * エラーページの制御についても要検討
 */
export const mobileRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/mobile/top" replace />,
  },
  { path: '/mobile/top', element: <MobileTopPage /> },
];
