// backend/src/controllers/todoController.ts
import { Response } from 'express';
import { Todo } from '../models/Todo';
import { AuthRequest } from '../middleware/authMiddleware';

export const getTodos = async (req: AuthRequest, res: Response) => {
  const todos = await Todo.find({ user: req.userId }).sort({ dueDate: 1 });
  res.json(todos);
};

export const addTodo = async (req: AuthRequest, res: Response) => {
  const { task, dueDate } = req.body;
  if (!task || !dueDate) return res.status(400).json({ msg: 'All fields are required' });

  const todo = new Todo({ task, dueDate, user: req.userId });
  await todo.save();
  res.status(201).json(todo);
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { task, dueDate, completed } = req.body;

  const todo = await Todo.findOneAndUpdate(
    { _id: id, user: req.userId },
    { task, dueDate, completed },
    { new: true }
  );

  if (!todo) return res.status(404).json({ msg: 'Todo not found' });
  res.json(todo);
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const deleted = await Todo.findOneAndDelete({ _id: id, user: req.userId });
  if (!deleted) return res.status(404).json({ msg: 'Todo not found' });
  res.json({ msg: 'Deleted successfully' });
};

// Toggle completed status
export const toggleTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Toggle failed' });
  }
};
