'use client';

import RoomCard from '@/components/RoomCard';
import Heading from '@/components/Heading';
import { useState, useEffect } from 'react';
import getAllRooms from './actions/getAllRooms';
import { revalidateRooms } from './actions/revalidateRooms';
import Loader from '@/components/Loader';

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function fetchRooms() {
      try {
        setLoading(true);
        const data = await getAllRooms();
        setRooms(data);
      } catch (error) {
        console.error("Erreur lors du chargement des chambres :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await revalidateRooms();
      const updatedRooms = await getAllRooms();
      setRooms(updatedRooms);
    } catch (error) {
      console.error("Erreur lors de l'actualisation des chambres :", error);
    } finally {
      setRefreshing(false);
    }
  };

  // 🔄 Rafraîchissement automatique toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 3000); // 🔄 30 000 ms = 30s (tu peux modifier selon tes besoins)

    return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage du composant
  }, []);

  return (
    <>
      <Heading title='Chambres disponibles' />

      {/* Affichage en fonction de l'état */}
      {loading ? (
        <Loader/>
      ) : rooms.length > 0 ? (
        rooms.map((room) => <RoomCard room={room} key={room.$id} />)
      ) : (
        <p>🚫 Aucune chambre disponible pour le moment</p>
      )}
    </>
  );
}
