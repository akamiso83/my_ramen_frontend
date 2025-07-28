import { useState } from 'react';

export const useUserForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetUserForm = () => {
    setFormData({ name: '', email: '', password: '' });
  };
  return { formData, handleChange, resetUserForm };
};
