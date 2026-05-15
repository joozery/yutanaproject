"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, Calendar, ChevronDown, Plus, FileSpreadsheet, FileText, 
  Eye, Download, MoreVertical, ChevronLeft, ChevronRight, 
  Receipt, Clock, CheckCircle2, AlertCircle, TrendingUp, Loader2, RefreshCcw
} from "lucide-react";

export default function BillingListPage() {
  const [billingList, setBillingList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBillings = async () => {
      try {
        const res = await fetch('/api/billings');
        const data = await res.json();
        if (data.success) {
          setBillingList(data.data);
        }
      } catch (error) {
        console.error("Error fetching billings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBillings();
  }, []);

  const statCards = [
    { title: "ใบวางบิลทั้งหมด", value: billingList.length.toString(), unit: "ฉบับ", icon: Receipt, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "รอชำระเงิน", value: billingList.filter(b => b.status === "รอชำระเงิน").length.toString(), unit: "ฉบับ", icon: Clock, color: "text-orange-500", bgColor: "bg-orange-50" },
    { title: "ชำระเงินแล้ว", value: billingList.filter(b => b.status === "ชำระเงินแล้ว").length.toString(), unit: "ฉบับ", icon: CheckCircle2, color: "text-green-600", bgColor: "bg-green-50" },
    { title: "เกินกำหนดชำระ", value: "0", unit: "ฉบับ", icon: AlertCircle, color: "text-red-500", bgColor: "bg-red-50" },
    { title: "ยอดเงินรวม", value: billingList.reduce((sum, b) => sum + (b.totalAmount || 0), 0).toLocaleString(), unit: "บาท", icon: TrendingUp, color: "text-purple-600", bgColor: "bg-purple-50" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ชำระเงินแล้ว":
        return <span className="px-3 py-1 text-[11px] font-medium bg-green-50 text-green-600 rounded-md">ชำระเงินแล้ว</span>;
      case "รอชำระเงิน":
        return <span className="px-3 py-1 text-[11px] font-medium bg-blue-50 text-blue-600 rounded-md">รอชำระเงิน</span>;
      case "บางส่วน":
        return <span className="px-3 py-1 text-[11px] font-medium bg-orange-50 text-orange-600 rounded-md">บางส่วน</span>;
      case "ยกเลิก":
        return <span className="px-3 py-1 text-[11px] font-medium bg-red-50 text-red-600 rounded-md">ยกเลิก</span>;
      default:
        return <span className="px-3 py-1 text-[11px] font-medium bg-gray-50 text-gray-600 rounded-md">{status}</span>;
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Action */}
      <div className="flex justify-end mb-2">
        <Link href="/billing/create" className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
          <Plus size={18} className="mr-2" />
          สร้างใบวางบิล
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white p-5 lg:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
            <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center mr-4 ${stat.bgColor} ${stat.color} flex-shrink-0`}>
              <stat.icon size={24} strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-gray-500 font-medium mb-0.5 whitespace-nowrap">{stat.title}</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl lg:text-2xl font-bold text-gray-800">{stat.value}</span>
                <span className="text-xs lg:text-sm text-gray-500 font-medium">{stat.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">ช่วงวันที่วางบิล</label>
            <div className="relative">
              <input type="text" placeholder="เลือกช่วงวันที่..." className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
              <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">ลูกค้า</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none">
              <option>ทั้งหมด</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">สถานะ</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none">
              <option>ทั้งหมด</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">รอบบิล</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none">
              <option>ทั้งหมด</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
          <div className="relative w-full md:w-96">
            <input type="text" placeholder="ค้นหา: เลขที่ใบวางบิล, ลูกค้า..." className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
              <RefreshCcw size={16} className="mr-2" />
              ล้างตัวกรอง
            </button>
            <button className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
              ค้นหา
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-50">
          <h3 className="text-base font-bold text-gray-800">รายการใบวางบิลทั้งหมด</h3>
          <div className="flex gap-3">
            <button className="flex items-center px-3 py-1.5 bg-white text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors text-xs font-medium">
              <FileSpreadsheet size={14} className="mr-1.5" />
              ส่งออก Excel
            </button>
            <button className="flex items-center px-3 py-1.5 bg-white text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-xs font-medium">
              <FileText size={14} className="mr-1.5" />
              ดาวน์โหลด PDF
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-gray-400 bg-gray-50/50 uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4 w-12 text-center"><input type="checkbox" className="rounded border-gray-300" /></th>
                <th className="px-6 py-4">เลขที่ใบวางบิล</th>
                <th className="px-6 py-4">ลูกค้า</th>
                <th className="px-6 py-4 text-center">รอบบิล</th>
                <th className="px-6 py-4 text-center">วันที่วางบิล</th>
                <th className="px-6 py-4 text-center">ครบกำหนดชำระ</th>
                <th className="px-6 py-4 text-right">จำนวนเงินรวม</th>
                <th className="px-6 py-4 text-right">ยอดค้างชำระ</th>
                <th className="px-6 py-4 text-center">สถานะ</th>
                <th className="px-6 py-4 text-center">ดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr><td colSpan={10} className="px-6 py-12 text-center text-gray-500"><Loader2 className="animate-spin inline-block mr-2" /> กำลังโหลดข้อมูล...</td></tr>
              ) : billingList.length === 0 ? (
                <tr><td colSpan={10} className="px-6 py-12 text-center text-gray-400">ไม่พบข้อมูลใบวางบิล</td></tr>
              ) : (
                billingList.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 text-center"><input type="checkbox" className="rounded border-gray-300" /></td>
                    <td className="px-6 py-4 font-bold text-blue-600">
                      <Link href={`/billing/${item.billingNo}`}>{item.billingNo}</Link>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">{item.customer}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{item.cycle}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{item.date}</td>
                    <td className="px-6 py-4 text-center text-gray-600 font-medium">{item.dueDate}</td>
                    <td className="px-6 py-4 text-right font-bold text-gray-800">{item.totalAmount?.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
                    <td className={`px-6 py-4 text-right font-bold ${item.dueAmount > 0 ? "text-red-500" : "text-gray-800"}`}>
                      {item.dueAmount?.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-center">{getStatusBadge(item.status)}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Link href={`/billing/${item.billingNo}`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} />
                        </Link>
                        <button className="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                          <Download size={16} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between p-6 border-t border-gray-50 text-xs text-gray-500">
          <div className="flex items-center gap-6">
            <span>แสดง 1 ถึง {billingList.length} รายการ</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50" disabled>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
