'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import createUser from '@/app/actions/createUser';
import Link from 'next/link';

const RegisterPage = () => {
  const [state, formAction] = useActionState(createUser, {});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
      setIsLoading(false);
    }
    if (state.success) {
      toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      router.push('/login');
    }
  }, [state]);

  const handleSubmit = () => {
    setIsLoading(true);
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full max-w-sm p-6 mt-20 bg-white rounded-lg shadow-lg'>
        <form action={formAction} onSubmit={handleSubmit}>
          <h2 className='mb-6 text-2xl font-bold text-center text-gray-800'>
          Inscription
          </h2>

          <div className='mb-4'>
            <label htmlFor='name' className='block mb-2 font-bold text-gray-700'>
              Nom
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className='w-full px-3 py-2 border rounded'
              autoComplete='name'
              required
            />
          </div>

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

          <div className='mb-4'>
            <label htmlFor='password' className='block mb-2 font-bold text-gray-700'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='w-full px-3 py-2 border rounded'
              required
              autoComplete='new-password'
            />
          </div>

          <div className='mb-6'>
            <label htmlFor='confirm-password' className='block mb-2 font-bold text-gray-700'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirm-password'
              name='confirm-password'
              className='w-full px-3 py-2 border rounded'
              autoComplete='new-password'
              required
            />
          </div>

          <div className='flex flex-col gap-5'>
            <button
              type='submit'
              className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50'
              disabled={isLoading}
            >
              {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>

            <p>
            Déjà un compte ?
              <Link href='/login' className='text-blue-500'> Se connecter</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
