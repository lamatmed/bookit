"use client";

import { useEffect, useState } from "react";
import Heading from "@/components/Heading";
import MyRoomCard from "@/components/MyRoomCard";
import getMyRooms from "@/app/actions/getMyRooms";
import Loader from "@/components/Loader";

const MyRoomsPage = () => {
  const [rooms, setRooms] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchRooms();
    const interval = setInterval(fetchRooms, 10000); // Rafraîchit toutes les 10 secondes
    return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage du composant
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="px-4">
      <Heading title="Mes Chambres" />
      {rooms?.length > 0 ? (
        <div className="gap-4  sm:grid-cols-2">
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
