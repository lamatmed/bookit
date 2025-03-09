/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'cloud.appwrite.io',
            pathname: '**',
        }, ],
    },
    experimental: {
        serverActions: true, // Assure-toi que les Server Actions sont activées
    },
};

export default nextConfig;
