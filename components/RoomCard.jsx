import Image from 'next/image';
import Link from 'next/link';

const RoomCard = ({ room }) => {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_ROOMS_STORAGE_BUCKET;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;

  const imageSrc = room.image ? imageUrl : '/images/no-image.jpg';

  return (
    <div className='flex flex-col items-start justify-between p-4 mt-4 bg-white rounded-lg shadow sm:flex-row sm:items-center'>
      <div className='flex flex-col sm:flex-row sm:space-x-4'>
        <Image
          src={imageSrc}
          width={400}
          height={100}
          alt={room.name}
          className='object-cover w-full mb-3 rounded-lg sm:w-32 sm:h-32 sm:mb-0'
        />
        <div className='space-y-1'>
          <h4 className='text-lg font-semibold'>{room.name}</h4>
          <p className='text-sm text-gray-600'>
            <span className='font-semibold text-gray-800'> Adresse :</span>{' '}
            {room.address}
          </p>
          <p className='text-sm text-gray-600'>
            <span className='font-semibold text-gray-800'>Disponibilité :</span>
            {room.availability}
          </p>
          <p className='text-sm text-gray-600'>
            <span className='font-semibold text-gray-800'> Prix :</span> 
            {room.price_per_hour} UMR/heure
          </p>
        </div>
      </div>
      <div className='flex flex-col w-full mt-2 sm:flex-row sm:w-auto sm:space-x-2 sm:mt-0'>
        <Link
          href={`/rooms/${room.$id}`}
          className='w-full px-4 py-2 mb-2 text-center text-white bg-blue-500 rounded sm:mb-0 sm:w-auto hover:bg-blue-700'
        >
           Voir la salle
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
