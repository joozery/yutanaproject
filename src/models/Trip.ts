import mongoose, { Schema, model, models } from "mongoose";

const TripSchema = new Schema({
  tripNo: { type: String, required: true, unique: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  time: { type: String }, // Format: HH:mm
  customer: { type: String, required: true },
  productType: { type: String },
  weight: { type: Number }, // in kg
  volume: { type: Number }, // in cbm
  origin: { type: String, required: true },
  originDetail: { type: String },
  destination: { type: String, required: true },
  destinationDetail: { type: String },
  plate: { type: String, required: true },
  truckType: { type: String },
  driver: { type: String },
  driverPhone: { type: String },
  price: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ["รอโหลด", "กำลังวิ่ง", "ส่งสำเร็จ", "ยกเลิก"], 
    default: "รอโหลด" 
  },
  timeline: [{
    status: String,
    time: String,
    completed: { type: Boolean, default: false }
  }],
  costs: [{
    title: String,
    amount: Number
  }],
  notes: { type: String }
}, { timestamps: true });

const Trip = models.Trip || model("Trip", TripSchema);
export default Trip;
