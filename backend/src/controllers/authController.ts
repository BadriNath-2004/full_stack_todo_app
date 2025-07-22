// backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/default';
import { User, IUser } from '../models/User';

const SALT_ROUNDS = 10;

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already in use' });

    // Hash password
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const user = new User({ name, email, password: hash });
    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1d' });

    return res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }) as IUser;
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1d' });
    return res.json({ token, user: { id: user._id, name: user.name, email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};
