import Image from "next/image";

export default function BillingDocument({ invoiceDetails }: { invoiceDetails: any[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 lg:col-span-2 xl:col-span-3 overflow-hidden">
      <div className="p-8 md:p-10">
        {/* Header: Company & Title */}
        <div className="flex flex-col md:flex-row justify-between border-b border-gray-100 pb-8 mb-8">
          <div className="flex items-start">
            <div className="w-32 h-16 relative mr-6 mix-blend-multiply">
              <Image src="/logo/logo1.jpg" alt="YNK Logo" fill className="object-contain" priority />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">YUTANATAKIT TRANSPORT CO.,LTD.</h3>
              <h4 className="text-sm font-bold text-blue-600 mb-2">บริษัท ยุทธนากิจขนส่ง จำกัด</h4>
              <p className="text-xs text-gray-600 mb-1">88/9 หมู่ 4 ต.บางเพรียง อ.บางบ่อ จ.สมุทรปราการ 10560</p>
              <p className="text-xs text-gray-600 mb-1">เลขประจำตัวผู้เสียภาษี 0115565001234</p>
              <p className="text-xs text-gray-600">โทร. 02-123-4567 | อีเมล info@ynktransport.com</p>
            </div>
          </div>
          <div className="text-right mt-6 md:mt-0 flex flex-col items-end">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">ใบวางบิล</h1>
            <h2 className="text-sm text-gray-500 mb-6">(INVOICE)</h2>
            <div className="text-blue-600 font-bold text-sm">ต้นฉบับ</div>
          </div>
        </div>

        {/* Customer & Invoice Details */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-6">
          <div className="w-full md:w-1/2">
            <p className="text-xs text-gray-500 mb-1">ลูกค้า</p>
            <h3 className="text-base font-bold text-gray-800 mb-3">บริษัท ABC จำกัด</h3>
            <div className="grid grid-cols-[100px_1fr] gap-2 text-xs">
              <span className="text-gray-500">ที่อยู่</span>
              <span className="text-gray-800">99/99 หมู่ 1 ต.บางโฉลง อ.บางพลี จ.สมุทรปราการ 10540</span>
              
              <span className="text-gray-500">เลขประจำตัวผู้เสียภาษี</span>
              <span className="text-gray-800">0115556009876</span>
              
              <span className="text-gray-500">โทรศัพท์</span>
              <span className="text-gray-800">02-987-6543</span>
            </div>
          </div>
          <div className="w-full md:w-5/12">
            <div className="bg-gray-50/50 p-4 rounded-xl">
              <div className="grid grid-cols-[120px_1fr] gap-3 text-xs">
                <span className="text-gray-500">เลขที่ใบวางบิล</span>
                <span className="text-gray-800 font-semibold text-right">INV-2024-06-00018</span>
                
                <span className="text-gray-500">วันที่วางบิล</span>
                <span className="text-gray-800 text-right">30/06/2024</span>
                
                <span className="text-gray-500">รอบบิล</span>
                <span className="text-gray-800 text-right">06/2024</span>
                
                <span className="text-gray-500">เครดิตเทอม</span>
                <span className="text-gray-800 text-right">30 วัน</span>
                
                <span className="text-gray-500">ครบกำหนดชำระ</span>
                <span className="text-gray-800 font-semibold text-right">30/07/2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-3">รายละเอียดเที่ยวรถ</h3>
          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-500 bg-gray-50/80">
                <tr>
                  <th className="px-4 py-3 font-medium text-center w-12">ลำดับ</th>
                  <th className="px-4 py-3 font-medium">เลขที่เที่ยว</th>
                  <th className="px-4 py-3 font-medium">วันที่วิ่ง</th>
                  <th className="px-4 py-3 font-medium">ต้นทาง - ปลายทาง</th>
                  <th className="px-4 py-3 font-medium">ทะเบียนรถ</th>
                  <th className="px-4 py-3 font-medium">สินค้า</th>
                  <th className="px-4 py-3 font-medium text-right">ราคา/เที่ยว (บาท)</th>
                </tr>
              </thead>
              <tbody>
                {invoiceDetails.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-4 text-center text-gray-500">{item.id}</td>
                    <td className="px-4 py-4 font-medium text-gray-800">{item.tripNo}</td>
                    <td className="px-4 py-4 text-gray-600">{item.date}</td>
                    <td className="px-4 py-4 text-gray-600">{item.route}</td>
                    <td className="px-4 py-4 text-gray-600">{item.plate}</td>
                    <td className="px-4 py-4 text-gray-600">{item.product}</td>
                    <td className="px-4 py-4 text-right font-medium text-gray-800">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Text */}
        <div className="mb-12">
          <p className="text-sm font-bold text-blue-600">(หนึ่งแสนแปดพันเจ็ดสิบบาทถ้วน)</p>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-8 mt-8">
          <div className="flex flex-col">
            <div className="grid grid-cols-[100px_1fr] gap-4 text-sm mb-4">
              <span className="text-gray-500">ผู้วางบิล</span>
              <span className="text-gray-800">Admin</span>
              
              <span className="text-gray-500">วันที่วางบิล</span>
              <span className="text-gray-800">30/06/2024</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 mb-12">ผู้อนุมัติ</span>
            <div className="w-full max-w-[250px] border-b border-dashed border-gray-300 mb-2"></div>
            <p className="text-sm text-gray-500">(.........................................................................)</p>
            <p className="text-sm text-gray-500 mt-2">วันที่ ......../......../............</p>
          </div>
        </div>
      </div>
    </div>
  );
}
