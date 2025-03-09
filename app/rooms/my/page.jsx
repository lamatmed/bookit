"use client"; // Indique que ce composant fonctionne côté client

import { useEffect, useState } from "react";
import Heading from "@/components/Heading";
import MyRoomCard from "@/components/MyRoomCard";
import getMyRooms from "@/app/actions/getMyRooms";
import Loader from "@/components/Loader";

const MyRoomsPage = () => {
  const [rooms, setRooms] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getMyRooms();
        setRooms(data);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <Loader/>
  }
  


  return (
    <div className="px-4">
      <Heading title="Mes Chambres" />
      {rooms?.length > 0 ? (
        <div className="sm:grid-cols-2">
          {rooms.map((room) => (
            <MyRoomCard key={room.$id} room={room} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-center text-gray-600 sm:text-left">
          Vous n'avez aucune chambre répertoriée
        </p>
      )}
    </div>
  );
};

export default MyRoomsPage;
