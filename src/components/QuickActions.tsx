import { Plus, MapPin, Users, FileText, Receipt, FileBarChart } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="flex flex-wrap items-center gap-4 mt-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <span className="text-sm font-bold text-gray-800 mr-2">เมนูด่วน</span>
      
      <button className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors text-sm font-medium border border-blue-100">
        <Plus size={16} className="mr-1.5" />
        เพิ่มเที่ยวรถ
      </button>
      
      <button className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors text-sm font-medium border border-blue-100">
        <Plus size={16} className="mr-1.5" />
        เพิ่มลูกค้า
      </button>
      
      <button className="flex items-center px-4 py-2 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors text-sm font-medium border border-purple-100">
        <Plus size={16} className="mr-1.5" />
        วางบิล
      </button>
      
      <button className="flex items-center px-4 py-2 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-100 transition-colors text-sm font-medium border border-orange-100">
        <Plus size={16} className="mr-1.5" />
        เพิ่มรายจ่าย
      </button>

      <div className="flex-1"></div>
      
      <button className="flex items-center px-4 py-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors text-sm font-medium border border-green-100 ml-auto">
        <FileBarChart size={16} className="mr-1.5" />
        รายงานสรุป
      </button>
    </div>
  );
}
