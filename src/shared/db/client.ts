import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const client = new SQLiteConnection(CapacitorSQLite);

export const sqliteConnectionManager = (dbName: string, version = 1) => {
  let dbPromise: Promise<SQLiteDBConnection> | null = null;
  let lock = false;

  /**
   * 他の処理（open/close）がロック中の場合、解放されるまで待機する
   */
  const waitForUnlock = async () => {
    while (lock) {
      await new Promise((r) => setTimeout(r, 50));
    }
  };

  /**
   * SQLite クライアント接続処理
   * 既存の接続があればそれを再利用し、なければ新たに作成して返却する
   */
  const open = async (): Promise<SQLiteDBConnection> => {
    // 他のopen/close中なら待つ
    await waitForUnlock();
    lock = true;

    try {
      // すでにdbのconnectionが存在していれば返却
      if (dbPromise) return dbPromise;

      dbPromise = (async () => {
        // この処理を呼ばないとcreateConnection が予期せず複数回呼ばれる恐れがある
        await client.checkConnectionsConsistency();

        // すでにdbのconnectionが存在していれば対象を返却
        // dbのconnectionが存在していなければ新規接続を開始する
        const isConn = (await client.isConnection(dbName, false)).result;
        const db = isConn
          ? await client.retrieveConnection(dbName, false)
          : await client.createConnection(dbName, false, 'encryption', version, false);

        // dbがopenされていなければopenする
        const isOpen = (await db.isDBOpen()).result;
        if (!isOpen) {
          await db.open();
        }

        return db;
      })();

      return await dbPromise;
    } catch (error) {
      dbPromise = null; // エラー時は初期化失敗をリセット
      console.error(`[SQLite] Failed to open DB "${dbName}":`, error);
      throw error;
    } finally {
      lock = false;
    }
  };

  /**
   * SQLite クライアント接続のクローズ処理
   * 開いている場合は明示的に close し、接続オブジェクトも破棄する
   */
  const close = async (): Promise<void> => {
    // 他のopen/close中なら待つ
    await waitForUnlock();
    lock = true;

    try {
      // すでにdbのconnectionが存在していなければ早期return
      if (!dbPromise) return;
      const db = await dbPromise;

      // dbがopenされていればcloseする
      const isOpen = (await db.isDBOpen()).result;
      if (isOpen) {
        await db.close();
      }

      await client.closeConnection(dbName, false);
    } catch (error) {
      // closeで失敗しても、dbPromiseはリセットしておく
      console.warn(`[SQLite] Failed to close DB "${dbName}":`, error);
    } finally {
      dbPromise = null;
      lock = false;
    }
  };

  return { open, close };
};
