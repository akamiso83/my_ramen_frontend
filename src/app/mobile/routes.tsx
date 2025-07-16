/**
 * 後で最新のv7以降の方法でリファクタする
 * 参考：https://reactrouter.com/start/framework/routing
 */
import { Navigate, type RouteObject } from 'react-router-dom';
import { MobileLayout } from '@/layouts/mobile/MobileLayout';
import { MobileTopPage } from '@/features/mobile/top/pages/MobileTopPage';
/**
 * エラーページの制御についても要検討
 */
export const mobileRoutes: RouteObject[] = [
  {
    path: '/mobile',
    element: <MobileLayout />,
    children: [
      {
        index: true, // /admin にアクセスしたら /admin/top にリダイレクト
        element: <Navigate to="top" replace />,
      },
      {
        path: 'top', // /admin/top
        element: <MobileTopPage />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/mobile" replace />,
  },
];
