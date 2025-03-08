import Heading from '@/components/Heading';
import MyRoomCard from '@/components/MyRoomCard';
import getMyRooms from '@/app/actions/getMyRooms';

const MyRoomsPage = async () => {
  const rooms = await getMyRooms(); // Récupération des chambres

  if (!rooms) {
    return <p className="text-center text-gray-500">Chargement des chambres...</p>;
  }

  return (
    <>
      <Heading title="Mes Chambres" />
      {rooms.length > 0 ? (
        rooms.map((room) => <MyRoomCard key={room.$id} room={room} />)
      ) : (
        <p className="mt-4 text-gray-600">Vous n'avez aucune chambre répertoriée</p>
      )}
    </>
  );
};

export default MyRoomsPage;
