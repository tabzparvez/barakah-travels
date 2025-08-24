import mongoose, { Schema } from 'mongoose';

const FaqSchema = new Schema({
  question: String,
  answer: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Faq || mongoose.model('Faq', FaqSchema);
