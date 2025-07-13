import { Capacitor } from '@capacitor/core';
/**
 * アプリ上で動作しているかどうかの判定
 * @return True:アプリ上で動作 False：管理側(PC)で動作
 */
export const isNativeApp = (): boolean => {
  return Capacitor.isNativePlatform?.() ?? false;
};

/**
 * 実行中のプラットフォーム名を取得する
 * @return プラットフォーム名:'ios' or 'android' or 'web'
 */
export const getPlatform = (): 'ios' | 'android' | 'web' => {
  return Capacitor.getPlatform() as 'ios' | 'android' | 'web';
};

/**
 * 実行中のプラットフォームがiOSかどうか
 * @return True:iOSで動作 False：iOS以外で動作
 */
export const isIOS = (): boolean => getPlatform() === 'ios';

/**
 * 実行中のプラットフォームがAndroidかどうか
 * @return True:Androidで動作 False：Android以外で動作
 */
export const isAndroid = (): boolean => getPlatform() === 'android';
