import { Schema, model, Document, Types } from 'mongoose';

export interface ITodo extends Document {
  user: Types.ObjectId;  // ✅ Fixed here: use Types.ObjectId
  task: string;
  dueDate: Date;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: String, required: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

export const Todo = model<ITodo>('Todo', todoSchema);
