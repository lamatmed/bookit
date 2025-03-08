import Heading from '@/components/Heading';
import BookedRoomCard from '@/components/BookedRoomCard';
import getMyBookings from '../actions/getMyBookings';

const BookingsPage = async () => {
  const bookings = await getMyBookings(); // Attente des réservations

  if (!bookings) {
    return <p className="text-center text-gray-500">Chargement des réservations...</p>;
  }

  return (
    <>
      <Heading title="Mes Réservations" />
      {bookings.length === 0 ? (
        <p className="mt-4 text-gray-600">Vous n'avez aucune réservation</p>
      ) : (
        bookings.map((booking) => (
          <BookedRoomCard key={booking.$id} booking={booking} />
        ))
      )}
    </>
  );
};

export default BookingsPage;
