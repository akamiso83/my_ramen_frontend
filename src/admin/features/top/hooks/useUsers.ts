import { useEffect, useState } from 'react';
import { fetcher } from '@/shared/api/fetcher';
import type { ApiErrorResponse } from '@/shared/types/ApiErrorResponse';
import type { User } from '@/admin/features/top/type';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiErrorResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetcher.get<User[]>('/users');
        console.log(data);
        setUsers(data);
      } catch (err) {
        setError(err as ApiErrorResponse);
        console.error('Error fetching Userdata:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { users, loading, error };
};
