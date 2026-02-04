import mongoose, { Schema } from 'mongoose';

const InquirySchema = new Schema({
  userId: String,
  name: String,
  phone: String,
  email: String,
  service: String,
  from: String,
  to: String,
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
