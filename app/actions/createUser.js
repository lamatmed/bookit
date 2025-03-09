'use server';
import { createAdminClient } from '@/config/appwrite';
import { ID } from 'node-appwrite';

async function createUser(previousState, formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if (!email || !name || !password) {
        return {
            error: 'Veuillez remplir tous les champs',
        };
    }

    if (password.length < 8) {
        return {
            error: 'Le mot de passe doit comporter au moins 8 caractères.',
        };
    }

    if (password !== confirmPassword) {
        return {
            error: 'Les mots de passe ne correspondent pas',
        };
    }

    // Get account instance
    const { account } = await createAdminClient();

    try {
        // Create user
        await account.create(ID.unique(), email, password, name);

        return {
            success: true,
        };
    } catch (error) {
        console.log('Registration Error: ', error);
        return {
            error: "Impossible d'enregistrer l 'utilisateur",
        };
    }
}

export default createUser;
