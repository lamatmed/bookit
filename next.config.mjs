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
        serverActions: {
            disableCache: true, // Désactive le cache des Server Actions
        }
    }
};

export default nextConfig;
