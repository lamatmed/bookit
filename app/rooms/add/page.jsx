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
      <div className='w-full p-6 mx-auto bg-white rounded-lg shadow-lg'>
  <form action={handleSubmit} className='space-y-4'>
    <div>
      <label htmlFor='name' className='block mb-1 text-sm font-bold text-gray-700 sm:text-base'>
        Nom de la salle
      </label>
      <input
        type='text'
        id='name'
        name='name'
        className='w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300'
        placeholder='Ex : Grande salle de conférence'
        required
      />
    </div>

    <div>
      <label htmlFor='description' className='block mb-1 text-sm font-bold text-gray-700 sm:text-base'>
        Description
      </label>
      <textarea
        id='description'
        name='description'
        className='w-full h-24 px-3 py-2 border rounded focus:ring focus:ring-blue-300'
        placeholder='Entrez une description de la salle'
        required
      ></textarea>
    </div>

    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
      <div>
        <label htmlFor='sqft' className='block mb-1 text-sm font-bold text-gray-700 sm:text-base'>
          Superficie (m²)
        </label>
        <input
          type='number'
          id='sqft'
          name='sqft'
          className='w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300'
          placeholder='Entrez la superficie en m²'
          required
        />
      </div>
      <div>
        <label htmlFor='capacity' className='block mb-1 text-sm font-bold text-gray-700 sm:text-base'>
          Capacité
        </label>
        <input
          type='number'
          id='capacity'
          name='capacity'
          className='w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300'
          placeholder='Nombre de personnes'
          required
        />
      </div>
    </div>

    <div>
      <label htmlFor='price_per_hour' className='block mb-1 text-sm font-bold text-gray-700 sm:text-base'>
        Prix par heure (URM)
      </label>
      <input
        type='number'
        id='price_per_hour'
        name='price_per_hour'
        className='w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300'
        placeholder='Entrez le prix par heure'
        required
      />
    </div>

    <div>
      <label htmlFor='address' className='block mb-1 text-sm font-bold text-gray-700 sm:text-base'>
        Adresse
      </label>
      <input
        type='text'
        id='address'
        name='address'
        className='w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300'
        placeholder='Entrez l’adresse complète'
        required
      />
    </div>

    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
      <div>
        <label htmlFor='availability' className='block mb-1 text-sm font-bold text-gray-700 sm:text-base'>
          Disponibilité
        </label>
        <input
          type='text'
          id='availability'
          name='availability'
          className='w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300'
          placeholder='Ex : Lundi - Vendredi, 9h - 17h'
          required
        />
      </div>
      <div>
        <label htmlFor='amenities' className='block mb-1 text-sm font-bold text-gray-700 sm:text-base'>
          Équipements
        </label>
        <input
          type='text'
          id='amenities'
          name='amenities'
          className='w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300'
          placeholder='Ex : projecteur, Wi-Fi'
          required
        />
      </div>
    </div>

    <div>
      <label htmlFor='image' className='block mb-1 text-sm font-bold text-gray-700 sm:text-base'>
        Image
      </label>
      <input
        type='file'
        id='image'
        name='image'
        className='w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300'
      />
    </div>

    <div>
      <button
        type='submit'
        className={`w-full px-4 py-2 text-white rounded text-sm sm:text-base ${
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
