'use server';
import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

async function destroySession() {
    // Retrieve the session cookie
    const sessionCookie = (await cookies()).get('appwrite-session');

    if (!sessionCookie) {
        return {
            error: "Aucun cookie de session n'a été trouvé",
        };
    }

    try {
        const { account } = await createSessionClient(sessionCookie.value);

        // Delete current session
        await account.deleteSession('current');

        // Clear session cookie
        (await cookies()).delete('appwrite-session');

        return {
            success: true,
        };
    } catch (error) {
        return {
            error: 'Erreur lors de la suppression de la session',
        };
    }
}

export default destroySession;
