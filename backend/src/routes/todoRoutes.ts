// backend/src/routes/todoRoutes.ts
import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo
} from '../controllers/todoController';

const router = Router();

router.get('/', getTodos);
router.post('/', addTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
// routes/todoRoutes.ts

router.patch('/:id/toggle', authenticate, toggleTodo);


export default router;
