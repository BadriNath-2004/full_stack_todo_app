import express from 'express';
import { getMenuItems } from '../controllers/menuController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticateOptional, getMenuItems);

// Optional middleware version (explained below)
function authenticateOptional(req: any, res: any, next: any) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return next(); // No token = guest

  try {
    const jwtPayload = require('jsonwebtoken').verify(token, require('../config/default').default.jwtSecret);
    req.userId = jwtPayload.id;
  } catch (err) {
    // Invalid token, continue as guest
  }
  next();
}

export default router;
