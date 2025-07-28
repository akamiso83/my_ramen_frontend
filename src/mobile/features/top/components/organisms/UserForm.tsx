import React from 'react';

type Props = {
  formData: {
    name: string;
    email: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export const UserForm = ({ formData, onChange, onSubmit }: Props) => {
  return (
    <div>
      <h1 className="text-lg font-bold text-gray-800 mb-4">ユーザー登録(モバイル用)</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="名前"
          className="border p-2 w-full"
          required
        />
        <input
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="メール"
          className="border p-2 w-full"
          required
        />
        <input
          name="password"
          value={formData.password}
          onChange={onChange}
          placeholder="パスワード"
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          登録
        </button>
      </form>
    </div>
  );
};
