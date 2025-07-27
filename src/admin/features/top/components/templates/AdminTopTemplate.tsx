import type { User } from '@/admin/features/top/type';
import { UserTable } from '@/admin/features/top/components/organisms/UserTable';
type Props = {
  users: User[];
};
export const AdminTopTemplate = ({ users }: Props) => {
  return <UserTable users={users} />;
};
