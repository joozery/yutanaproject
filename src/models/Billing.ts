import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema({
  tripNo: { type: String, required: true },
  date: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  plate: { type: String, required: true },
  price: { type: Number, required: true },
});

const BillingSchema = new mongoose.Schema({
  billingNo: { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  customerAddress: { type: String },
  customerTaxId: { type: String },
  cycle: { type: String, required: true },
  date: { type: String, required: true },
  dueDate: { type: String, required: true },
  creditTerm: { type: String },
  reference: { type: String },
  note: { type: String },
  trips: [TripSchema],
  subTotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  preTaxAmount: { type: Number, required: true },
  taxAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  dueAmount: { type: Number, required: true },
  status: { type: String, default: 'รอชำระเงิน' },
  paymentMethod: { type: String },
  bank: { type: String },
  accountNo: { type: String },
  accountName: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Billing || mongoose.model('Billing', BillingSchema);
