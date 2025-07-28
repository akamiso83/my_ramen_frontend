import { useEffect, useState } from 'react';
import type { ApiErrorResponse } from '@/shared/types/ApiErrorResponse';
import type { User } from '@admin/features/top/type';
import { getUsers } from '@mobile/features/top/api/userApi';

export const useRemoteUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiErrorResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(err as ApiErrorResponse);
        console.error('[useRemoteUsers] Error fetching Userdata:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { users, setUsers, loading, error };
};
