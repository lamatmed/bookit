'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import createUser from '@/app/actions/createUser';
import Link from 'next/link';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
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
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
        <form action={formAction} onSubmit={handleSubmit}>
          <h2 className="flex items-center justify-center gap-2 mb-6 text-2xl font-bold text-center text-gray-800">
            <PersonIcon className="text-blue-500" /> Inscription
          </h2>

          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-bold text-gray-700">
              
              Nom
            </label>
            <div className="flex items-center px-3 py-2 border rounded focus-within:ring focus-within:ring-blue-200">
              <PersonIcon className="mr-2 text-gray-500" />
              <input
                type="text"
                id="name"
                name="name"
                className="w-full outline-none"
                autoComplete="name"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-bold text-gray-700">
              Email
            </label>
            <div className="flex items-center px-3 py-2 border rounded focus-within:ring focus-within:ring-blue-200">
              <EmailIcon className="mr-2 text-gray-500" />
              <input
                type="email"
                id="email"
                name="email"
                className="w-full outline-none"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-bold text-gray-700">
              Mot de passe
            </label>
            <div className="flex items-center px-3 py-2 border rounded focus-within:ring focus-within:ring-blue-200">
              <LockIcon className="mr-2 text-gray-500" />
              <input
                type="password"
                id="password"
                name="password"
                className="w-full outline-none"
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="confirm-password" className="block mb-2 font-bold text-gray-700">
              Confirmer le mot de passe
            </label>
            <div className="flex items-center px-3 py-2 border rounded focus-within:ring focus-within:ring-blue-200">
              <LockIcon className="mr-2 text-gray-500" />
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                className="w-full outline-none"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Inscription en cours...' : "S'inscrire"}
            </button>

            <p className="text-center">
              Déjà un compte ?
              <Link href="/login" className="ml-1 text-blue-500">Se connecter</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
