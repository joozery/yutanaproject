import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Billing from '@/models/Billing';

export async function GET() {
  try {
    await dbConnect();
    const billings = await Billing.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: billings }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const billing = await Billing.create(body);
    return NextResponse.json({ success: true, data: billing }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
