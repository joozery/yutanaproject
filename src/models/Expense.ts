import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  expenseNo: string;
  date: string;
  type: string;
  category: string;
  supplier: string;
  taxId?: string;
  referenceNo?: string; // e.g. Trip No or Truck Plate
  amount: number;
  vat?: number;
  totalAmount: number;
  status: "อนุมัติแล้ว" | "รออนุมัติ" | "ยกเลิก";
  note?: string;
  tripId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema: Schema = new Schema(
  {
    expenseNo: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    supplier: { type: String, required: true },
    taxId: { type: String },
    referenceNo: { type: String },
    amount: { type: Number, required: true },
    vat: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ["อนุมัติแล้ว", "รออนุมัติ", "ยกเลิก"], 
      default: "รออนุมัติ" 
    },
    note: { type: String },
    tripId: { type: Schema.Types.ObjectId, ref: "Trip" },
  },
  { timestamps: true }
);

export default mongoose.models.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);
