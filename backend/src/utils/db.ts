// backend/src/utils/db.ts
import mongoose from 'mongoose';
import config from '../config/default';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.dbUri, {
      // these options are no longer needed in newer mongoose,
      // but you can add if you’re on older version:
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};
