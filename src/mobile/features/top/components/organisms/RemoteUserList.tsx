import type { User } from '@/admin/features/top/type';
import { UserList } from '@mobile/features/top/components/molecules/UserList';
type Props = {
  remoteUsers: User[];
};

export const RemoteUserList = ({ remoteUsers }: Props) => {
  return (
    <div>
      <h1 className="text-lg font-bold text-gray-800 mb-4">ユーザー一覧</h1>

      <UserList users={remoteUsers} />
    </div>
  );
};
