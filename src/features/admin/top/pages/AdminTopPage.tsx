import { useEffect, useState } from 'react';
import { fetcher } from '@/shared/api/fetcher';

type User = {
  id: number;
  name: string;
  email: string;
};

export const AdminTopPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetcher.get<User[]>('/users');
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching Userdata:', error);
      }
    };
    fetchData();
    // モックデータ（将来的にはAPIフェッチに置き換える）

    // const mockUsers: User[] = [
    //   { id: 1, name: '田中 太郎', email: 'tanaka@example.com' },
    //   { id: 2, name: '山田 花子', email: 'yamada@example.com' },
    //   { id: 3, name: '佐藤 次郎', email: 'sato@example.com' },
    // ];
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">ユーザー一覧</h1>
      <table className="table-auto w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">名前</th>
            <th className="px-4 py-3">メールアドレス</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm text-gray-800">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{user.id}</td>
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
