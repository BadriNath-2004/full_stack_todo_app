// backend/src/config/default.ts
import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 4000,
  dbUri: process.env.DB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'change-me',
};
