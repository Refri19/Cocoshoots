import mongoose, { Schema, Document, models, model } from 'mongoose';

// 1. Define the structure for a single Photo
const PhotoSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  color: { type: String, required: true },
  caption: { type: String, default: "" }
});

// 2. Define the structure for the User's Gallery
// We use 'username' as the unique identifier
const GallerySchema = new Schema({
  username: { type: String, required: true, unique: true },
  photos: [PhotoSchema], // An array of the photos defined above
  lastUpdated: { type: Date, default: Date.now }
});

const Gallery = models.Gallery || model('Gallery', GallerySchema);

export default Gallery;