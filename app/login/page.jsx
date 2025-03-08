'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import createSession from '../actions/createSession';
import { useAuth } from '@/context/authContext';

const LoginPage = () => {
  const [state, formAction] = useActionState(createSession, {});
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
      setIsLoading(false);
    }
    if (state.success) {
      toast.success('Connexion réussie !');
      setIsAuthenticated(true);
      router.push('/');
    }
  }, [state]);

  const handleSubmit = async (event) => {
    setIsLoading(true);
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full max-w-sm p-6 mt-20 bg-white rounded-lg shadow-lg'>
        <form action={formAction} onSubmit={handleSubmit}>
          <h2 className='mb-6 text-2xl font-bold text-center text-gray-800'>
          Connexion
          </h2>

          <div className='mb-4'>
            <label htmlFor='email' className='block mb-2 font-bold text-gray-700'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='w-full px-3 py-2 border rounded'
              autoComplete='email'
              required
            />
          </div>

          <div className='mb-6'>
            <label htmlFor='password' className='block mb-2 font-bold text-gray-700'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='w-full px-3 py-2 border rounded'
              autoComplete='current-password'
              required
            />
          </div>

          <div className='flex flex-col gap-5'>
            <button
              type='submit'
              className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50'
              disabled={isLoading}
            >
              {isLoading ? '⏳ Connexion...' : 'Login'}
            </button>

            <p>
            Pas de compte ?{' '}
              <Link href='/register' className='text-blue-500'>  Inscription</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
