// next-i18next.config.js
/** @type {import('next-i18next').UserConfig} */
const nextI18NextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hi'],
  },
  localePath: './src/locales', // important
};

module.exports = nextI18NextConfig;
