import { fetcher } from '@/shared/api/fetcher';
import type { User } from '@/admin/features/top/type';

/**
 * ユーザー取得 (RestApi)
 */
export const getUsers = async (): Promise<User[]> => {
  try {
    return await fetcher.get<User[]>('/users');
  } catch (e) {
    console.error('[getUsers] Failed:', e);
    throw e;
  }
};

/**
 * ユーザー取得 (RestApi)
 */
export const postSyncUsers = async (users: User[]): Promise<void> => {
  try {
    await fetcher.post('/sync', { users: users });
  } catch (e) {
    console.error('[postSyncUsers] Failed:', e);
    throw e;
  }
};
