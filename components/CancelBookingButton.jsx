'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import cancelBooking from '@/app/actions/cancelBooking';

const CancelBookingButton = ({ bookingId }) => {
  const [loading, setLoading] = useState(false);

  const handleCancelClick = async () => {
    if (!confirm('Voulez-vous vraiment annuler cette réservation ?')) {
      return;
    }

    setLoading(true); // Active le chargement

    try {
      const result = await cancelBooking(bookingId);

      if (result.success) {
        toast.success('Réservation annulée avec succès !');
      }
    } catch (error) {
      console.log('Échec de l\'annulation de la réservation', error);
      toast.error('Échec de l\'annulation de la réservation');
    } finally {
      setLoading(false); // Désactive le chargement après la requête
    }
  };

  return (
    <button
      onClick={handleCancelClick}
      className={`px-4 py-2 text-white rounded w-full sm:w-auto text-center ${
        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'
      }`}
      disabled={loading}
    >
      {loading ? 'Annulation en cours...' : 'Annuler la réservation'}
    </button>
  );
};

export default CancelBookingButton;
