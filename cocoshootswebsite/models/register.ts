import mongoose, { Document, Schema } from 'mongoose';
export interface IRegister extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}
const RegisterSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite error in Next.js hot reloading
export default mongoose.models.Register || mongoose.model<IRegister>('Register', RegisterSchema);