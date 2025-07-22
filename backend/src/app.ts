// backend/src/app.ts
import express from 'express';
import cors from 'cors';
import config from './config/default';
import { connectDB } from './utils/db';
// TODO: import other routes
// backend/src/app.ts
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';
import menuRoutes from './routes/menuRoutes';
import { authenticate } from './middleware/authMiddleware';
import profileRoutes from './routes/profileRoutes';

const app = express();

// Connect to DB
connectDB();

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/todos', authenticate, todoRoutes);
app.use('/api/menu', menuRoutes);
// TODO: app.use('/api/todos', todoRoutes);
// TODO: app.use('/api/menu', menuRoutes);

export default app;
