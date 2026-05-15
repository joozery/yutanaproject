import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Truck from '@/models/Truck';

export async function GET() {
  try {
    await dbConnect();
    const trucks = await Truck.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: trucks }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const truck = await Truck.create(body);
    return NextResponse.json({ success: true, data: truck }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
