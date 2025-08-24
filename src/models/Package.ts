import mongoose, { Schema } from 'mongoose';

const PackageSchema = new Schema({
  name: { type: String, required: true },
  days: { type: Number, required: true },
  type: { type: String, required: true },
  description: String,
  price: Number,
  features: [String],
  image: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Package || mongoose.model('Package', PackageSchema);
