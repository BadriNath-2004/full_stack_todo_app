// backend/src/routes/authRoutes.ts
import { Router } from 'express';
import { signup, login } from '../controllers/authController';

const router = Router();

// POST /api/auth/signup
router.post('/signup', signup);

// POST /api/auth/login
router.post('/login', login);

export default router;
