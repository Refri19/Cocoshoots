import mongoose, { Schema, Document } from 'mongoose';


export interface IVenue extends Document {
  name: string;
  email: string;
  category: string;
  message: string;
  createdAt: Date;
  schecheduleAt: Date;
}

const VenueSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
    scheduleAt: { type: Date, required: false },
});

// Prevent model overwrite error in Next.js hot reloading
export default mongoose.models.Venue || mongoose.model<IVenue>('Venue', VenueSchema);