import type { SQLiteDBConnection } from '@capacitor-community/sqlite';

/**
 * 指定されたテーブルが存在するか確認
 */
export const checkTableExists = async (
  db: SQLiteDBConnection,
  tableName: string,
): Promise<boolean> => {
  try {
    const res = await db.isTable(tableName);
    return res.result === true;
  } catch (error) {
    console.error(`[SQLite] Failed to check table "${tableName}":`, error);
    return false;
  }
};
