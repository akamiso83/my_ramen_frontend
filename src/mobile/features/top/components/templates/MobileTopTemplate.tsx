import { useRemoteUsers } from '@/mobile/features/top/hooks/useRemoteUsers';
import { useLocalUsers } from '@mobile/features/top/hooks/useLocalUsers';
import { useUserForm } from '@mobile/features/top/hooks/useUserForm';
import { registerUser, syncUser } from '@mobile/features/top/services/userService';
import { RemoteUserList } from '@mobile/features/top/components/organisms/RemoteUserList';
import { LocalUserList } from '@mobile/features/top/components/organisms/LocalUserList';
import { UserForm } from '@mobile/features/top/components/organisms/UserForm';

export const MobileTopTemplate = () => {
  const { users, setUsers } = useRemoteUsers();
  const { localUsers, setLocalUsers } = useLocalUsers();
  const { formData, handleChange, resetUserForm } = useUserForm();

  /**
   * 登録ボタン押下処理
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { localUsers: updatedLocal, remoteUsers: updatedRemote } = await registerUser(formData);
      resetUserForm();
      setLocalUsers(updatedLocal);
      setUsers(updatedRemote);
    } catch (err) {
      console.error('【handleSubmit】SQLite Insert Failed:', err);
      alert('登録失敗');
    }
  };

  /**
   * 同期ボタン押下処理
   */
  const handleSync = async () => {
    try {
      const { updatdLocalUsers } = await syncUser();
      setLocalUsers(updatdLocalUsers);
      alert('同期完了');
    } catch (error) {
      console.error('【handleSync】user sync Failed:', error);
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
      <RemoteUserList remoteUsers={users} />
      <LocalUserList localUsers={localUsers} />
      <UserForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
};
