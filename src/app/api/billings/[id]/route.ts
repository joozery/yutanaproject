import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Billing from "@/models/Billing";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const billing = await Billing.findOne({ billingNo: id });
    
    if (!billing) {
      return NextResponse.json({ success: false, error: "Billing not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: billing });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
