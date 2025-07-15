import { isNativeApp } from '@/shared/utils/platform';
/**
 * 環境変数で定義した値をここで取得できるように設定する
 */
export const getBackendUrl =
  isNativeApp() === true
    ? `${import.meta.env.VITE_MOBILE_BACKEND_URL}/api`
    : `${import.meta.env.VITE_BACKEND_URL}/api`;
