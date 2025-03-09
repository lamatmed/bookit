'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import createSession from '../actions/createSession';
import { useAuth } from '@/context/authContext';
import { TextField, Button, CircularProgress } from '@mui/material';
import { Lock, Login, Mail } from '@mui/icons-material';

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
    <div className='flex items-center justify-center min-h-screen p-4 bg-gray-100'>
    <div className='w-full max-w-xl p-6 bg-white rounded-lg shadow-lg animate-fade-in'>
      <form action={formAction} onSubmit={handleSubmit}>
        <h2 className='flex items-center justify-center gap-2 mb-6 text-3xl font-bold text-center text-gray-800'>
          <Login className="text-blue-500" /> Connexion
        </h2>

        <div className='mb-4'>
          <label htmlFor='email' className='block mb-2 font-bold text-gray-700'>
            Email
          </label>
          <div className='relative flex items-center'>
            <Mail className='absolute text-gray-500 left-3' />
            <TextField
              type='email'
              id='email'
              name='email'
              className='w-full pl-10'
              autoComplete='email'
              required
              fullWidth
              variant='outlined'
            />
          </div>
        </div>

        <div className='mb-6'>
          <label htmlFor='password' className='block mb-2 font-bold text-gray-700'>
            Mot de passe
          </label>
          <div className='relative flex items-center'>
            <Lock className='absolute text-gray-500 left-3' />
            <TextField
              type='password'
              id='password'
              name='password'
              className='w-full pl-10'
              autoComplete='current-password'
              required
              fullWidth
              variant='outlined'
            />
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className='h-12'
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? <CircularProgress size={24} color='inherit' /> : 'Se connecter'}
          </Button>

          <p className='text-center text-gray-700'>
            Pas de compte ?{' '}
            <Link href='/register' className='text-blue-500 hover:underline'>
              Inscription
            </Link>
          </p>
        </div>
      </form>
    </div>
  </div>
  );
};

export default LoginPage;
