import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    env: {
        AUTH_SECRET: process.env.AUTH_SECRET,
        FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
        FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,

    },
    images: {
        domains: ['scontent.fsgn5-10.fna.fbcdn.net'],
    },


};
module.exports = nextConfig;
export default nextConfig;
