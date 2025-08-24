import mongoose, { Schema } from 'mongoose';

const GalleryItemSchema = new Schema({
  title: String,
  url: String,
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.GalleryItem || mongoose.model('GalleryItem', GalleryItemSchema);
