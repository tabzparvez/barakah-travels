import mongoose, { Schema } from 'mongoose';

const TestimonialSchema = new Schema({
  name: String,
  message: String,
  city: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
