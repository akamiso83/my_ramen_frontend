import { sqliteConnectionManager } from './client';
type meta = {
  id: number;
  version: string;
  initialized: number;
};

const DB_NAME = 'app_data';
const { open } = sqliteConnectionManager(DB_NAME);
export const initDatabase = async () => {
  try {
    const db = await open();
    const metaExists = await db.isTable('meta');

    if (metaExists) {
      const rows = (await db.query('SELECT * FROM meta LIMIT 1')).values ?? ([] as meta[]);
      if (rows?.[0]?.initialized) {
        console.info('[SQLite] DB already initialized.');
        return;
      }
    }

    const { result: inTx } = await db.isTransactionActive();
    if (inTx) {
      console.warn('[SQLite] Another transaction is active. Aborting init.');
      return;
    }

    await db.execute(
      `
      CREATE TABLE IF NOT EXISTS meta (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        version TEXT,
        initialized INTEGER
      );

      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );

      INSERT INTO meta (version, initialized) VALUES ('1.0.0', 1);
    `,
      true,
    );

    console.info('[SQLite] Database initialized successfully.');
  } catch (err) {
    console.error('[SQLite] Initialization failed:', err);
    throw err;
  }
};
