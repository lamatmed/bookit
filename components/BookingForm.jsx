'use client';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import bookRoom from '@/app/actions/bookRoom';

const BookingForm = ({ room }) => {
  const [state, formAction] = useActionState(bookRoom, {});
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    if (state.error)  {
      toast.error(state.error);
      setIsLoading(false); // 🔹 Arrêter le chargement en cas d'erreur
    }
    if (state.success) {
      toast.success('La salle a été réservée avec succès !');
      setIsLoading(false); 
      router.push('/bookings');
    }
  }, [state]);
  const handleSubmit = async (e) => {
    setIsLoading(true); // 🔹 Activer le chargement
   
  };
  return (
    <div className='mt-6'>
      <h2 className='text-xl font-bold'>Réserver cette salle</h2>
      <form action={formAction} className='mt-4' onSubmit={handleSubmit}>
        <input type='hidden' name='room_id' value={room.$id} />
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <div>
            <label
              htmlFor='check_in_date'
              className='block text-sm font-medium text-gray-700'
            >
              Date de début
            </label>
            <input
              type='date'
              id='check_in_date'
              name='check_in_date'
              className='block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div>
            <label
              htmlFor='check_in_time'
              className='block text-sm font-medium text-gray-700'
            >
              Heure 
            </label>
            <input
              type='time'
              id='check_in_time'
              name='check_in_time'
              className='block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div>
            <label
              htmlFor='check_out_date'
              className='block text-sm font-medium text-gray-700'
            >
                 Date de fin
            </label>
            <input
              type='date'
              id='check_out_date'
              name='check_out_date'
              className='block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div>
            <label
              htmlFor='check_out_time'
              className='block text-sm font-medium text-gray-700'
            >
              Heure 
            </label>
            <input
              type='time'
              id='check_out_time'
              name='check_out_time'
              className='block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
        </div>

        <div className='mt-6'>
        <button
            type='submit'
            className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 disabled:opacity-50'
            disabled={isLoading} // 🔹 Désactiver le bouton lors du chargement
          >
            {isLoading ? 'Réservation en cours...' : 'Réserver la salle'} {/* 🔹 Texte dynamique */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
