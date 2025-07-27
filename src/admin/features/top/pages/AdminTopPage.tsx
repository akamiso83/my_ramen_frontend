import { useUsers } from '@/admin/features/top/hooks/useUsers';
import { AdminTopTemplate } from '@/admin/features/top/components/templates/AdminTopTemplate';

export const AdminTopPage = () => {
  const { users } = useUsers();

  return <AdminTopTemplate users={users} />;
};
