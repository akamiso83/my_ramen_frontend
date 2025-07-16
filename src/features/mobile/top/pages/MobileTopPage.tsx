import { useEffect, useState } from 'react';
import { fetcher } from '@/shared/api/fetcher';

type User = {
  id: number;
  name: string;
  email: string;
};

export const MobileTopPage = () => {
  const [users, setUsers] = useState<User[]>([]);

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

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold text-gray-800 mb-4">ユーザー一覧（）</h1>

      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
            <div className="text-sm text-gray-600">ID: {user.id}</div>
            <div className="text-base font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-700">{user.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
