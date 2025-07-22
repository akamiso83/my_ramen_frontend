import { useEffect, useState } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { mobileRoutes } from './routes';
import { initDatabase } from '@/shared/db/initDatabase';
import { App } from '@capacitor/app';
import { sqliteConnectionManager } from '@/shared/db/client';

function MobileRouter() {
  return useRoutes(mobileRoutes);
}

/**
 * アプリを閉じたときに明示的にsqlite接続をオフにする
 * https://capacitorjs.com/docs/apis/app#statechangelistener
 */
App.addListener('appStateChange', async ({ isActive }) => {
  if (!isActive) {
    try {
      await sqliteConnectionManager('app_data').close();
      console.log('[SQLite] Connection closed on background');
    } catch (e) {
      console.warn('[SQLite] Failed to close connection:', e);
    }
  }
});

export default function MobileApp() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState<Error | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initDatabase();
      } catch (err) {
        console.error('Failed to initialize local database:', err);
        setInitError(err as Error);
      } finally {
        setIsInitializing(false);
      }
    };

    initialize();
  }, []);

  if (isInitializing) {
    return <p>初期化中です...</p>;
  }

  if (initError) {
    return <p>初期化に失敗しました: {initError.message}</p>;
  }

  return (
    <BrowserRouter>
      <MobileRouter />
    </BrowserRouter>
  );
}
