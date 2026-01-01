import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  name: string;
  email: string;
  category: string;
  message: string;
  createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite error in Next.js hot reloading
export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);