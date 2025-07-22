import type { SQLiteDBConnection } from '@capacitor-community/sqlite';

/**
 * 単一の INSERT / UPDATE / DELETE などを実行する
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const run = async (db: SQLiteDBConnection, sql: string, params: any[] = []) => {
  try {
    await db.run(sql, params);
  } catch (error) {
    console.error('[SQLite] runQuery failed:', { sql, params, error });
    throw error;
  }
};

/**
 * SELECT などを実行して結果を返す
 */
export const query = async <T = unknown>(
  db: SQLiteDBConnection,
  sql: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any[] = [],
) => {
  try {
    const res = await db.query(sql, params);
    return res.values as T[];
  } catch (error) {
    console.error('[SQLite] selectQuery failed:', { sql, params, error });
    throw error;
  }
};

/**
 * 複数の SQL ステートメントをまとめて実行
 */
export const execute = async (db: SQLiteDBConnection, sql: string, transaction: boolean = true) => {
  try {
    await db.execute(sql, transaction);
  } catch (error) {
    console.error('[SQLite] executeQuery failed:', { sql, transaction, error });
    throw error;
  }
};
