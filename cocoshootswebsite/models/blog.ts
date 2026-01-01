// models/Feedback.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  createdAt: Date;
}

const BlogSchema: Schema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite error in Next.js hot reloading
export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);