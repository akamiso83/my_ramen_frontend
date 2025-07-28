import type { User } from '@/admin/features/top/type';

type Props = {
  users: User[];
};

export const UserList = ({ users }: Props) => {
  return (
    <div className="space-y-4 mb-8">
      {users.map((user) => (
        <div key={user.id} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
          <div className="text-sm text-gray-600">ID: {user.id}</div>
          <div className="text-base font-medium text-gray-900">{user.name}</div>
          <div className="text-sm text-gray-700">{user.email}</div>
        </div>
      ))}
    </div>
  );
};
