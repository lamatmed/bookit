'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import deleteRoom from '@/app/actions/deleteRoom';

const DeleteRoomButton = ({ roomId }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Êtes-vous sûr de vouloir supprimer cette chambre ?'
    );

    if (confirmed) {
      setLoading(true);
      try {
        await deleteRoom(roomId);
        toast.success('Chambre supprimée avec succès !');
      } catch (error) {
        console.error('Erreur lors de la suppression de la chambre', error);
        toast.error('Échec de la suppression de la chambre');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700 flex items-center justify-center ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? (
        <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
      ) : (
        <FaTrash className="mr-1" />
      )}
      {loading ? 'Suppression...' : 'Supprimer'}
    </button>
  );
};

export default DeleteRoomButton;
