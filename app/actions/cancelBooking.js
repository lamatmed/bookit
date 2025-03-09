'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import checkAuth from './checkAuth';

async function cancelBooking(bookingId) {
    const sessionCookie = (await cookies()).get('appwrite-session');
    if (!sessionCookie) {
        redirect('/login');
    }

    try {
        const { databases } = await createSessionClient(sessionCookie.value);

        // Get user's ID
        const { user } = await checkAuth();

        if (!user) {
            return {
                error: 'Vous devez être connecté pour annuler une réservation',
            };
        }

        // Get the booking
        const booking = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
            bookingId
        );

        // Check if booking belongs to current user
        if (booking.user_id !== user.id) {
            return {
                error: "Vous n'êtes pas autorisée à annuler cette réservation",
            };
        }

        // Delete booking
        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
            bookingId
        );

        revalidatePath('/bookings', 'layout');

        return {
            success: true,
        };
    } catch (error) {
        console.log('Failed to cancel booking', error);
        return {
            error: "Échec de l'annulation de la réservation",
        };
    }
}

export default cancelBooking;
