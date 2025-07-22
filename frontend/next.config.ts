import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // other config options here

  i18n: {
    locales: ['en', 'hi'],
    defaultLocale: 'en',
  },
};

export default nextConfig;
