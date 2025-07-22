import express from 'express';
import { getProfile } from '../controllers/profileController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticate, getProfile);

export default router;
