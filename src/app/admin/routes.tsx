/**
 * 後で最新のv7以降の方法でリファクタする
 * 参考：https://reactrouter.com/start/framework/routing
 */
import { Navigate, type RouteObject } from 'react-router-dom';
import { AdminLayout } from '@/layouts/admin/AdminLayout';
import { AdminTopPage } from '@/features/admin/top/pages/AdminTopPage';
/**
 * エラーページの制御についても要検討
 */
export const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true, // /admin にアクセスしたら /admin/top にリダイレクト
        element: <Navigate to="top" replace />,
      },
      {
        path: 'top', // /admin/top
        element: <AdminTopPage />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/admin" replace />,
  },
];
