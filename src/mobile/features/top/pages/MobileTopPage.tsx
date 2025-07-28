import { useRemoteUsers } from '@/mobile/features/top/hooks/useRemoteUsers';
import { useLocalUsers } from '@mobile/features/top/hooks/useLocalUsers';
import { useUserForm } from '@mobile/features/top/hooks/useUserForm';
import { registerUser, syncUser } from '@mobile/features/top/services/userService';

export const MobileTopPage = () => {
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
   * 登録ボタン押下処理
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
