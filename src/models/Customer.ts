import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  taxId: { type: String },
  phone: { type: String },
  address: { type: String },
  group: { type: String, default: 'ทั่วไป' },
  term: { type: Number, default: 30 },
  limit: { type: Number, default: 0 },
  due: { type: Number, default: 0 },
  status: { type: String, default: 'ใช้งาน' },
}, {
  timestamps: true,
});

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
