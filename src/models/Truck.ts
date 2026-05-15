import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema({
  plate: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  brand: { type: String },
  year: { type: String },
  driver: { type: String },
  driverPhone: { type: String },
  status: { type: String, default: 'ใช้งานอยู่' },
  mileage: { type: Number, default: 0 },
  vin: { type: String },
  engineNo: { type: String },
  color: { type: String },
  payloadWeight: { type: String },
  branch: { type: String },
  insuranceExpiry: { type: String },
  actExpiry: { type: String },
  taxExpiry: { type: String },
  lastCheckDate: { type: String },
  lastCheckMileage: { type: Number },
  imageUrl: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Truck || mongoose.model('Truck', TruckSchema);
