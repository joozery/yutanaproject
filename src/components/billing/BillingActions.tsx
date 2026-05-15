import { Printer, Download, Mail, Plus } from "lucide-react";

export default function BillingActions() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
         <h2 className="text-xl font-bold text-gray-800 hidden md:block">รายละเอียดใบวางบิล</h2>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button className="flex items-center px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium border border-gray-200">
          <Printer size={16} className="mr-2" />
          พิมพ์
        </button>
        <button className="flex items-center px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium border border-gray-200">
          <Download size={16} className="mr-2" />
          ดาวน์โหลด PDF
        </button>
        <button className="flex items-center px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium border border-gray-200">
          <Mail size={16} className="mr-2" />
          ส่งอีเมล
        </button>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
          <Plus size={16} className="mr-2" />
          เพิ่มวางบิล
        </button>
      </div>
    </div>
  );
}
