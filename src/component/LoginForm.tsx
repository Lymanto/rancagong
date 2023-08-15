'use client';

import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/berita';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: '', password: '' });
      const res = await signIn('credentials', {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });
      setLoading(false);
      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError('Email atau password salah');
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formValues.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required
          autoComplete="off"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          autoComplete="off"
        />
      </div>
      <div className="flex justify-start ">
        <p className="text-sm font-medium text-red-400 dark:text-primary-500">
          {error}
        </p>
      </div>
      <button
        type="submit"
        className={clsx(
          'w-full text-white  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-third-600 dark:hover:bg-third-700 dark:focus:ring-primary-800',
          !loading && ' hover:bg-third-700',
          !loading ? ' bg-third-600' : 'bg-third-200',

          loading && 'cursor-not-allowed'
        )}
        disabled={loading}
      >
        {loading ? 'loading...' : 'Sign In'}
      </button>
    </form>
  );
}
