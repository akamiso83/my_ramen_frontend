import {
  getLocalUsers,
  postLocalUsers,
  deleteLocalUsers,
} from '@mobile/features/top/db/userRepository';
import { getUsers, postSyncUsers } from '@mobile/features/top/api/userApi';

/**
 * ユーザー登録 (サービス)
 */
export const registerUser = async (formData: { name: string; email: string; password: string }) => {
  await postLocalUsers(formData);
  // ユーザー再取得
  const localUsers = await getLocalUsers();
  const remoteUsers = await getUsers();
  return { localUsers, remoteUsers };
};

/**
 * ユーザー同期 (サービス)
 */
export const syncUser = async () => {
  const localUsers = await getLocalUsers();
  if (localUsers.length === 0) {
    throw '[syncUser] 更新できるUserが存在しません';
  }
  await postSyncUsers(localUsers);
  await deleteLocalUsers();
  // ユーザー再取得
  const updatdLocalUsers = await getLocalUsers();
  return { updatdLocalUsers };
};
