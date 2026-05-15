import { FileText } from "lucide-react";

export default function BillingSummary() {
  return (
    <div className="lg:col-span-1 xl:col-span-1 flex flex-col space-y-6">
      {/* Summary Panel */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-sm font-bold text-gray-800 mb-4">สรุปยอดวางบิล</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">รวมค่าเที่ยว</span>
            <span className="text-gray-800 font-medium">101,000.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">ส่วนลด</span>
            <span className="text-gray-800 font-medium">0.00</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-100">
            <span className="text-gray-500">ยอดก่อนภาษี</span>
            <span className="text-gray-800 font-medium">101,000.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">ภาษีมูลค่าเพิ่ม 7%</span>
            <span className="text-gray-800 font-medium">7,070.00</span>
          </div>
          <div className="flex justify-between items-end pt-4 mt-2 border-t border-gray-100">
            <span className="text-sm font-bold text-gray-800">ยอดรวมทั้งสิ้น</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">108,070.00</div>
              <div className="text-xs text-blue-600 font-medium">บาท</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Panel */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-gray-800">สถานะวางบิล</h3>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">รอชำระเงิน</span>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">วันที่ชำระเงิน</span>
            <span className="text-gray-800 font-medium">-</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">ยอดชำระแล้ว</span>
            <span className="text-gray-800 font-medium">0.00</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-100">
            <span className="text-sm font-bold text-gray-800">ยอดคงเหลือ</span>
            <span className="text-base font-bold text-red-500">108,070.00</span>
          </div>
        </div>
      </div>

      {/* Note Panel */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-sm font-bold text-gray-800 mb-2">หมายเหตุ</h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          ขอความกรุณาชำระเงินภายในวันที่ครบกำหนด<br />
          ขอบคุณที่ใช้บริการค่ะ
        </p>
      </div>

      {/* Payment History Panel */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex-1 min-h-[200px] flex flex-col">
        <h3 className="text-sm font-bold text-gray-800 mb-6">ประวัติการชำระเงิน</h3>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3 text-gray-400">
            <FileText size={20} />
          </div>
          <p className="text-xs text-gray-500">ยังไม่มีประวัติการชำระเงิน</p>
        </div>
      </div>
    </div>
  );
}
