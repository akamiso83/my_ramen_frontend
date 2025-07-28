import type { User } from '@/admin/features/top/type';
import { UserList } from '@mobile/features/top/components/molecules/UserList';
type Props = {
  localUsers: User[];
};

export const LocalUserList = ({ localUsers }: Props) => {
  return (
    <div>
      <h1 className="text-lg font-bold text-gray-800 mb-4">SQLite内ユーザー一覧</h1>

      <UserList users={localUsers} />
    </div>
  );
};
