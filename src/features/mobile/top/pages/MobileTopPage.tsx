import { useEffect, useState } from 'react';
import { fetcher } from '@/shared/api/fetcher';
import { sqliteConnectionManager } from '@/shared/db/client';
import { run, query } from '@/shared/db/executor'; // run() を使って INSERT 実行する
const DB_NAME = 'app_data';
const { open, close } = sqliteConnectionManager(DB_NAME);

type User = {
  id: number;
  name: string;
  email: string;
};

export const MobileTopPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [localUsers, setLocalUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetcher.get<User[]>('/users');
        setUsers(data);
      } catch (error) {
        console.error('Error fetching Userdata:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchLocalUsers = async () => {
      try {
        const db = await open();
        const rows = await query<User>(db, 'SELECT id, name, email FROM users');
        setLocalUsers(rows);
      } catch (error) {
        console.error('Error fetching SQLite users:', error);
      }
    };

    fetchLocalUsers();
  }, []);

  /**
   * ユーザー登録formのonchangeハンドラー
   * 開いている場合は明示的に close し、接続オブジェクトも破棄する
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const db = await open();
      await run(db, `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [
        formData.name,
        formData.email,
        formData.password,
      ]);
      alert('登録完了');
      setFormData({ name: '', email: '', password: '' });
      // UIを更新（再取得）
      const updatedRows = await query<User>(db, 'SELECT id, name, email FROM users');
      setLocalUsers(updatedRows);
      const updatedRestRows = await fetcher.get<User[]>('/users');
      setUsers(updatedRestRows);
    } catch (err) {
      console.error('SQLite Insert Failed:', err);
      alert('登録失敗');
    } finally {
      await close();
    }
  };

  const handleSync = async () => {
    try {
      const db = await open();

      // SQLiteからローカルユーザーを取得
      const rows = await query<User>(db, 'SELECT id, name, email, password FROM users');

      if (rows.length === 0) {
        alert('同期するユーザーがありません');
        return;
      }
      console.log(rows);

      // Laravel側へPOST（例: /api/sync/）
      await fetcher.post('/sync', { users: rows });

      // 成功したらSQLite側を削除
      await run(db, 'DELETE FROM users');

      // UIを更新（再取得）
      const updatedRows = await query<User>(db, 'SELECT id, name, email FROM users');
      setLocalUsers(updatedRows);

      alert('同期完了');
    } catch (error) {
      console.error('同期に失敗しました:', error);
      alert('同期に失敗しました');
    }
  };

  return (
    <div className="p-4">
      <button
        className="bg-green-600 text-white py-2 px-4 h-[70px] rounded font-bold mb-4"
        onClick={handleSync}
      >
        同期する
      </button>
      <h1 className="text-lg font-bold text-gray-800 mb-4">ユーザー一覧</h1>

      <div className="space-y-4 mb-8">
        {users.map((user) => (
          <div key={user.id} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
            <div className="text-sm text-gray-600">ID: {user.id}</div>
            <div className="text-base font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-700">{user.email}</div>
          </div>
        ))}
      </div>
      <h1 className="text-lg font-bold text-gray-800 mb-4">SQLite内ユーザー一覧</h1>
      <div className="space-y-4 mb-8">
        {localUsers.map((user) => (
          <div key={user.id} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
            <div className="text-sm text-gray-600">ID: {user.id}</div>
            <div className="text-base font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-700">{user.email}</div>
          </div>
        ))}
      </div>
      <h1 className="text-lg font-bold text-gray-800 mb-4">ユーザー登録(モバイル用)</h1>
      <div className="space-y-4 mb-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="名前"
            className="border p-2 w-full"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="メール"
            className="border p-2 w-full"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="パスワード"
            className="border p-2 w-full"
            required
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            登録
          </button>
        </form>
      </div>
    </div>
  );
};
