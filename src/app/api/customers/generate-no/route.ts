import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Customer from '@/models/Customer';

export async function GET() {
  try {
    await dbConnect();
    
    const prefix = `CUS-`;

    // Find the latest customer number
    const latestCustomer = await Customer.findOne({
      code: { $regex: `^${prefix}` }
    }).sort({ code: -1 });

    let nextNumber = 1;
    if (latestCustomer && latestCustomer.code) {
      // Extract the last 5 digits
      const lastSequenceStr = latestCustomer.code.replace(prefix, '');
      const lastSequence = parseInt(lastSequenceStr, 10);
      if (!isNaN(lastSequence)) {
        nextNumber = lastSequence + 1;
      }
    }

    const sequenceStr = String(nextNumber).padStart(5, '0');
    const newCode = `${prefix}${sequenceStr}`;

    return NextResponse.json({ success: true, code: newCode }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
