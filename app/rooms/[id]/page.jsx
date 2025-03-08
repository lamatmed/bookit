import Heading from '@/components/Heading';
import BookingForm from '@/components/BookingForm';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';
import getSingleRoom from '@/app/actions/getSingleRoom';

const RoomPage = async ({ params }) => {
  const awaitedParams = await params;
  const { id } = awaitedParams;
  const room = await getSingleRoom(id);

  if (!room) {
    return <Heading title='Salle non trouvée' />;
  }

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_ROOMS_STORAGE_BUCKET;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;

  const imageSrc = room.image ? imageUrl : '/images/no-image.jpg';

  return (
    <>
      <Heading title={room.name} />
      <div className='p-6 bg-white rounded-lg shadow'>
        <Link
          href='/'
          className='flex items-center mb-4 text-gray-600 hover:text-gray-800'
        >
          <FaChevronLeft className='inline mr-1' />
          <span className='ml-2'>Retour aux salles</span>
        </Link>

        <div className='flex flex-col sm:flex-row sm:space-x-6'>
          <Image
            src={imageSrc}
            alt={room.name}
            width={400}
            height={100}
            className='object-cover w-full h-64 rounded-lg sm:w-1/3'
          />

          <div className='mt-4 sm:mt-0 sm:flex-1'>
            <p className='mb-4 text-gray-600'>{room.description}</p>

            <ul className='space-y-2'>
              <li>
                <span className='font-semibold text-gray-800'>Superficie :</span>{' '}
                {room.sqft} m²
              </li>
              <li>
                <span className='font-semibold text-gray-800'>
                  Disponibilité :
                </span>{' '}
                {room.availability}
              </li>
              <li>
                <span className='font-semibold text-gray-800'>Prix :</span> {room.price_per_hour} UMR / heure
              </li>
              <li>
                <span className='font-semibold text-gray-800'>Adresse :</span>{' '}
                {room.address}
              </li>
            </ul>
          </div>
        </div>

        <BookingForm room={room} />
      </div>
    </>
  );
};

export default RoomPage;
