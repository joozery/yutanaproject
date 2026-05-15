import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Expense from "@/models/Expense";

export async function GET() {
  try {
    await dbConnect();
    const expenses = await Expense.find().sort({ date: -1 });

    // If no data, return some sample data for demonstration
    if (expenses.length === 0) {
      const sampleExpenses = [
        {
          expenseNo: "EXP-2024-00045",
          date: "2024-06-30",
          type: "ค่าน้ำมัน",
          category: "น้ำมัน",
          supplier: "ปตท. สาขาบางนา",
          referenceNo: "TRP-2406-026",
          amount: 11634.11,
          vat: 815.89,
          totalAmount: 12450.00,
          status: "อนุมัติแล้ว",
          note: "เติมน้ำมันเต็มถังก่อนออกทริป"
        },
        {
          expenseNo: "EXP-2024-00044",
          date: "2024-06-30",
          type: "ค่าทางด่วน",
          category: "ทางด่วน",
          supplier: "การทางพิเศษ",
          referenceNo: "TRP-2406-026",
          amount: 1250.00,
          vat: 0,
          totalAmount: 1250.00,
          status: "อนุมัติแล้ว",
          note: "ด่านบางนา-ชลบุรี"
        },
        {
          expenseNo: "EXP-2024-00043",
          date: "2024-06-29",
          type: "ค่าซ่อมบำรุง",
          category: "ซ่อมเครื่องยนต์",
          supplier: "อู่อาจารย์ชัย",
          referenceNo: "70-1234",
          amount: 7943.93,
          vat: 556.07,
          totalAmount: 8500.00,
          status: "อนุมัติแล้ว",
          note: "เปลี่ยนถ่ายน้ำมันเครื่อง"
        },
        {
          expenseNo: "EXP-2024-00042",
          date: "2024-06-28",
          type: "ค่าน้ำมัน",
          category: "น้ำมัน",
          supplier: "บางจาก สาขาศรีนครินทร์",
          referenceNo: "TRP-2406-025",
          amount: 9626.17,
          vat: 673.83,
          totalAmount: 10300.00,
          status: "อนุมัติแล้ว"
        },
        {
          expenseNo: "EXP-2024-00041",
          date: "2024-06-28",
          type: "ค่าใช้จ่ายอื่นๆ",
          category: "ค่าที่พัก",
          supplier: "โรงแรมเดอะไกด์",
          referenceNo: "TRP-2406-025",
          amount: 2800.00,
          vat: 0,
          totalAmount: 2800.00,
          status: "รออนุมัติ"
        }
      ];
      return NextResponse.json({ success: true, data: sampleExpenses });
    }

    return NextResponse.json({ success: true, data: expenses });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const expense = await Expense.create(body);
    return NextResponse.json({ success: true, data: expense }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
