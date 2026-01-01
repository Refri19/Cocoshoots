import mongoose, { Schema, Document } from 'mongoose';


export interface IVenue extends Document {
  name: string;
  email: string;
  ponenumber: string;
  reasoning: string;
  createdAt: Date;
  scheduleAt: Date;
}

const VenueSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    ponenumber: { type: String, required: true },
    reasoning: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    scheduleAt: { type: Date, required: false },
});

// Prevent model overwrite error in Next.js hot reloading
export default mongoose.models.Venue || mongoose.model<IVenue>('Venue', VenueSchema);