'use client';

import { useEffect, useState } from 'react';
import Heading from '@/components/Heading';
import BookedRoomCard from '@/components/BookedRoomCard';
import getMyBookings from '../actions/getMyBookings';
import Loader from '@/components/Loader';

const BookingsPage = () => {
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getMyBookings();
      setBookings(data);
    };
    fetchBookings();
  }, []);

  if (!bookings) {
    return <Loader/>
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
