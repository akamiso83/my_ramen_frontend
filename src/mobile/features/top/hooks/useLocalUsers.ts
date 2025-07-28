import { useEffect, useState } from 'react';
import { getLocalUsers } from '@mobile/features/top/db/userRepository';
import type { User } from '@admin/features/top/type';

export const useLocalUsers = () => {
  const [localUsers, setLocalUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLocalUsers = async () => {
      try {
        const res = await getLocalUsers();
        setLocalUsers(res);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching SQLite users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocalUsers();
  }, []);
  return { localUsers, setLocalUsers, loading, error };
};
