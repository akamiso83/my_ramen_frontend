import type { User } from '@/admin/features/top/type';
import { Table } from '@/components/molecules/Table';
type Props = {
  users: User[];
};
const headers = ['ID', '名前', 'メールアドレス'];
const columns = ['id', 'name', 'email'] as (keyof User)[];
export const UserTable = ({ users }: Props) => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">ユーザー一覧</h1>
      <Table headers={headers} data={users} columns={columns} />
    </div>
  );
};
