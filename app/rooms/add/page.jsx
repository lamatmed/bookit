'use client';
import { useEffect, useState, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Heading from '@/components/Heading';
import createRoom from '@/app/actions/createRoom';

const AddRoomPage = () => {
  const [state, formAction] = useActionState(createRoom, {});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
      setIsLoading(false);
    }
    if (state.success) {
      toast.success('Salle créée avec succès !');
      setIsLoading(false);
      router.push('/');
    }
  }, [state]);

  const handleSubmit = async (e) => {
    setIsLoading(true); // Active le chargement
    formAction(e); // Soumet le formulaire
  };

  return (
    <>
      <Heading title='Ajouter une salle' />
      <div className='w-full p-6 bg-white rounded-lg shadow-lg'>
        <form action={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='name' className='block mb-2 font-bold text-gray-700'>
              Nom de la salle
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className='w-full px-3 py-2 border rounded'
              placeholder='Ex : Grande salle de conférence'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='description' className='block mb-2 font-bold text-gray-700'>
              Description
            </label>
            <textarea
              id='description'
              name='description'
              className='w-full h-24 px-3 py-2 border rounded'
              placeholder='Entrez une description de la salle'
              required
            ></textarea>
          </div>

          <div className='mb-4'>
            <label htmlFor='sqft' className='block mb-2 font-bold text-gray-700'>
              Superficie (m²)
            </label>
            <input
              type='number'
              id='sqft'
              name='sqft'
              className='w-full px-3 py-2 border rounded'
              placeholder='Entrez la superficie en m²'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='capacity' className='block mb-2 font-bold text-gray-700'>
              Capacité
            </label>
            <input
              type='number'
              id='capacity'
              name='capacity'
              className='w-full px-3 py-2 border rounded'
              placeholder='Nombre de personnes que la salle peut contenir'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='price_per_hour' className='block mb-2 font-bold text-gray-700'>
              Prix par heure (URM)
            </label>
            <input
              type='number'
              id='price_per_hour'
              name='price_per_hour'
              className='w-full px-3 py-2 border rounded'
              placeholder='Entrez le prix par heure'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='address' className='block mb-2 font-bold text-gray-700'>
              Adresse
            </label>
            <input
              type='text'
              id='address'
              name='address'
              className='w-full px-3 py-2 border rounded'
              placeholder='Entrez l’adresse complète'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='availability' className='block mb-2 font-bold text-gray-700'>
              Disponibilité
            </label>
            <input
              type='text'
              id='availability'
              name='availability'
              className='w-full px-3 py-2 border rounded'
              placeholder='Ex : Lundi - Vendredi, 9h - 17h'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='amenities' className='block mb-2 font-bold text-gray-700'>
              Équipements
            </label>
            <input
              type='text'
              id='amenities'
              name='amenities'
              className='w-full px-3 py-2 border rounded'
              placeholder='Ex : projecteur, tableau blanc, Wi-Fi'
              required
            />
          </div>

          {/* Téléchargement d'image */}
          <div className='mb-8'>
            <label htmlFor='image' className='block mb-2 font-bold text-gray-700'>
              Image
            </label>
            <input
              type='file'
              id='image'
              name='image'
              className='w-full px-3 py-2 border rounded'
            />
          </div>

          <div className='flex flex-col gap-5'>
            <button
              type='submit'
              className={`px-4 py-2 text-white rounded ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRoomPage;
