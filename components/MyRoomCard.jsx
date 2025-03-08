import Link from 'next/link';
import { FaEye } from 'react-icons/fa';
import DeleteRoomButton from './DeleteRoomButton';

const MyRoomCard = ({ room }) => {
  return (
    <div className='flex flex-col items-center justify-between p-4 mt-4 bg-white rounded-lg shadow sm:flex-row'>
      <div className='flex flex-col'>
        <h4 className='text-lg font-semibold'>{room.name}</h4>
      </div>
      <div className='flex flex-col w-full mt-2 sm:flex-row sm:w-auto sm:space-x-2 sm:mt-0'>
        <Link
          href={`/rooms/${room.$id}`}
          className='w-full px-4 py-2 mb-2 text-center text-white bg-blue-500 rounded sm:mb-0 sm:w-auto hover:bg-blue-700'
        >
          <FaEye className='inline mr-1' />  Voir la salle
        </Link>

        <DeleteRoomButton roomId={room.$id} />
      </div>
    </div>
  );
};

export default MyRoomCard;
