import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Billing from '@/models/Billing';

export async function GET() {
  try {
    await dbConnect();
    
    // Format: INV-YYYY-MM-XXXXX
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const prefix = `INV-${year}-${month}-`;

    // Find the latest billing number for this month
    const latestBilling = await Billing.findOne({
      billingNo: { $regex: `^${prefix}` }
    }).sort({ billingNo: -1 });

    let nextNumber = 1;
    if (latestBilling && latestBilling.billingNo) {
      // Extract the last 5 digits
      const lastSequenceStr = latestBilling.billingNo.replace(prefix, '');
      const lastSequence = parseInt(lastSequenceStr, 10);
      if (!isNaN(lastSequence)) {
        nextNumber = lastSequence + 1;
      }
    }

    const sequenceStr = String(nextNumber).padStart(5, '0');
    const newBillingNo = `${prefix}${sequenceStr}`;

    return NextResponse.json({ success: true, billingNo: newBillingNo }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
