import { sqliteConnectionManager } from '@/shared/db/client';
import type { User } from '@admin/features/top/type';

const DB_NAME = 'app_data';
const { open } = sqliteConnectionManager(DB_NAME);

/**
 * ユーザー取得 (SQLite)
 */
export const getLocalUsers = async (): Promise<User[]> => {
  try {
    const db = await open();
    const sql = 'SELECT id, name, email FROM users';
    const res = await db.query(sql);
    return (res.values ?? []) as User[];
  } catch (e) {
    console.error('[getLocalUsers] Failed:', e);
    throw e;
  }
};

/**
 * ユーザー登録 (SQLite)
 */
export const postLocalUsers = async (formData: {
  name: string;
  email: string;
  password: string;
}): Promise<void> => {
  try {
    const db = await open();
    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    const params = [formData.name, formData.email, formData.password];
    await db.run(sql, params);
  } catch (e) {
    console.error('[postLocalUsers] Failed:', e);
    throw e;
  }
};

/**
 * ユーザー削除 (SQLite)
 */
export const deleteLocalUsers = async (): Promise<void> => {
  try {
    const db = await open();
    const sql = 'DELETE FROM users';
    await db.run(sql);
  } catch (e) {
    console.error('[deleteLocalUsers] Failed:', e);
    throw e;
  }
};
