import Link from 'next/link';
import CancelBookingButton from './CancelBookingButton';

const BookedRoomCard = ({ booking }) => {
  const { room_id: room } = booking;

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Get month
    const options = { month: 'short' };
    const month = date.toLocaleString('en-US', options, { timeZone: 'UTC' });

    // Get day
    const day = date.getUTCDate();

    // Format time in UTC 12-hour
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'UTC',
    };

    const time = date.toLocaleString('en-US', timeOptions);

    // Final formatted string
    return `${month} ${day} at ${time}`;
  };

  return (
    <div className='flex flex-col items-start justify-between p-4 mt-4 bg-white rounded-lg shadow sm:flex-row sm:items-center'>
      <div>
        <h4 className='text-lg font-semibold'>{room.name}</h4>
        <p className='text-sm text-gray-600'>
  <strong>Début de réservation :</strong> {formatDate(booking.check_in)}
</p>
<p className='text-sm text-gray-600'>
  <strong>Fin de réservation :</strong> {formatDate(booking.check_out)}
</p>

      </div>
      <div className='flex flex-col w-full mt-2 sm:flex-row sm:w-auto sm:space-x-2 sm:mt-0'>
        <Link
          href={`/rooms/${room.$id}`}
          className='w-full px-4 py-2 mb-2 text-center text-white bg-blue-500 rounded sm:mb-0 sm:w-auto hover:bg-blue-700'
        >
           Voir la salle
        </Link>
        <CancelBookingButton bookingId={booking.$id} />
      </div>
    </div>
  );
};

export default BookedRoomCard;
