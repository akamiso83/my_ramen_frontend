import { sqliteConnectionManager } from '@/shared/db/client';
import { query, run } from '@/shared/db/executor';
import type { User } from '@admin/features/top/type';

const DB_NAME = 'app_data';
const { open } = sqliteConnectionManager(DB_NAME);

/**
 * ユーザー取得 (SQLite)
 */
export const getLocalUsers = async (): Promise<User[]> => {
  try {
    const db = await open();
    return await query<User>(db, 'SELECT id, name, email FROM users');
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
    await run(db, `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [
      formData.name,
      formData.email,
      formData.password,
    ]);
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
    await run(db, 'DELETE FROM users');
  } catch (e) {
    console.error('[deleteLocalUsers] Failed:', e);
    throw e;
  }
};
