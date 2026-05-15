import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Trip from "@/models/Trip";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const trips = await Trip.find({}).sort({ createdAt: -1 });

    // Seed data if empty to match the screenshot
    if (trips.length === 0) {
      const seedData = [
        {
          tripNo: "TRP-2406-028",
          date: "2024-06-30",
          time: "08:30",
          customer: "บริษัท ABC จำกัด",
          productType: "ชิ้นส่วนอุตสาหกรรม",
          weight: 12500,
          volume: 32.5,
          origin: "สมุทรสาคร",
          destination: "ชลบุรี",
          plate: "70-1234",
          driver: "นายสมชาย ใจดี",
          price: 25000,
          status: "กำลังวิ่ง"
        },
        {
          tripNo: "TRP-2406-027",
          date: "2024-06-30",
          time: "09:00",
          customer: "บริษัท DEF จำกัด",
          productType: "เคมีภัณฑ์",
          weight: 8500,
          volume: 20.0,
          origin: "กรุงเทพฯ",
          destination: "ระยอง",
          plate: "70-5678",
          driver: "นายวิชัย พงษ์ศรี",
          price: 18000,
          status: "รอโหลด"
        },
        {
          tripNo: "TRP-2406-026",
          date: "2024-06-30",
          time: "08:30",
          customer: "บริษัท GHI จำกัด",
          productType: "อุปกรณ์อิเล็กทรอนิกส์",
          weight: 12500,
          volume: 32.5,
          origin: "บางปะอิน",
          destination: "นครราชสีมา",
          plate: "70-9012",
          driver: "นายธนพล จันทร์ดี",
          driverPhone: "081-234-5678",
          price: 22000,
          status: "ส่งสำเร็จ"
        }
      ];
      await Trip.insertMany(seedData);
      const newTrips = await Trip.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: newTrips });
    }

    return NextResponse.json({ success: true, data: trips });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const trip = await Trip.create(body);
    return NextResponse.json({ success: true, data: trip });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
