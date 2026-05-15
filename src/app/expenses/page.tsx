"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  ChevronDown, 
  Calendar, 
  Download, 
  Printer, 
  Eye, 
  Edit, 
  MoreVertical, 
  Fuel, 
  Truck, 
  Wrench, 
  CreditCard, 
  ChevronLeft, 
  ChevronRight,
  Loader2,
  X,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  RefreshCcw,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import Image from "next/image";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("ข้อมูลทั่วไป");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch('/api/expenses');
        const data = await res.json();
        if (data.success) {
          setExpenses(data.data);
          if (data.data.length > 0) {
            setSelectedExpense(data.data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const statCards = [
    { title: "ค่าใช้จ่ายทั้งหมด", value: "315,670.00", change: "+12%", trend: "up", icon: CreditCard, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "ค่าน้ำมัน", value: "142,560.00", change: "+8%", trend: "up", icon: Fuel, color: "text-green-600", bgColor: "bg-green-50" },
    { title: "ค่าทางด่วน", value: "28,650.00", change: "-5%", trend: "down", icon: Truck, color: "text-purple-600", bgColor: "bg-purple-50" },
    { title: "ค่าซ่อมบำรุง", value: "56,240.00", change: "+18%", trend: "up", icon: Wrench, color: "text-orange-500", bgColor: "bg-orange-50" },
    { title: "ค่าใช้จ่ายอื่นๆ", value: "88,220.00", change: "+10%", trend: "up", icon: MoreVertical, color: "text-red-500", bgColor: "bg-red-50" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "อนุมัติแล้ว":
        return <span className="px-3 py-1 text-[11px] font-bold bg-green-50 text-green-600 rounded-lg flex items-center w-fit"><CheckCircle2 size={12} className="mr-1" /> อนุมัติแล้ว</span>;
      case "รออนุมัติ":
        return <span className="px-3 py-1 text-[11px] font-bold bg-orange-50 text-orange-600 rounded-lg flex items-center w-fit"><Clock size={12} className="mr-1" /> รออนุมัติ</span>;
      case "ยกเลิก":
        return <span className="px-3 py-1 text-[11px] font-bold bg-red-50 text-red-600 rounded-lg flex items-center w-fit">ยกเลิก</span>;
      default:
        return <span className="px-3 py-1 text-[11px] font-bold bg-gray-50 text-gray-600 rounded-lg flex items-center w-fit">{status}</span>;
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white p-5 lg:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bgColor} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center text-[10px] font-bold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend === 'up' ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                {stat.change} <span className="text-gray-400 font-normal ml-1">จากเดือนก่อน</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium mb-1">{stat.title}</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-gray-800">{stat.value}</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">บาท</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Actions */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-gray-400 uppercase tracking-tight">ช่วงวันที่</label>
            <div className="flex items-center w-full border border-gray-100 rounded-xl px-4 py-2.5 text-sm bg-gray-50/30">
              <Calendar size={16} className="text-gray-400 mr-2" />
              <span className="text-gray-600 font-medium">01/06/2024 - 30/06/2024</span>
            </div>
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-gray-400 uppercase tracking-tight">ประเภทค่าใช้จ่าย</label>
            <select className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-sm bg-gray-50/30 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/10">
              <option>ทั้งหมด</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-gray-400 uppercase tracking-tight">หมวดหมู่</label>
            <select className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-sm bg-gray-50/30 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/10">
              <option>ทั้งหมด</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-gray-400 uppercase tracking-tight">ผู้จำหน่าย</label>
            <select className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-sm bg-gray-50/30 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/10">
              <option>ทั้งหมด</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-gray-400 uppercase tracking-tight">สถานะ</label>
            <select className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-sm bg-gray-50/30 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/10">
              <option>ทั้งหมด</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between border-t border-gray-50 pt-6">
          <div className="relative w-full lg:w-96">
            <input 
              type="text" 
              placeholder="ค้นหา: เลขที่เอกสาร, รายการ, ผู้จำหน่าย, หมายเหตุ..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10"
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center space-x-3 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none flex items-center justify-center px-4 py-2.5 text-gray-500 hover:text-gray-800 transition-colors text-sm font-bold">
              <RefreshCcw size={18} className="mr-2" />
              ล้างตัวกรอง
            </button>
            <button className="flex-1 lg:flex-none flex items-center justify-center px-8 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-bold shadow-md shadow-blue-500/20">
              ค้นหา
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Table Section */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-[11px] text-left whitespace-nowrap">
              <thead className="text-gray-400 bg-gray-50/50 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-bold">เลขที่เอกสาร</th>
                  <th className="px-6 py-4 font-bold">วันที่</th>
                  <th className="px-6 py-4 font-bold">ประเภทค่าใช้จ่าย</th>
                  <th className="px-6 py-4 font-bold">หมวดหมู่</th>
                  <th className="px-6 py-4 font-bold">ผู้จำหน่าย</th>
                  <th className="px-6 py-4 font-bold">อ้างอิง</th>
                  <th className="px-6 py-4 font-bold text-right">จำนวนเงิน (บาท)</th>
                  <th className="px-6 py-4 font-bold text-center">สถานะ</th>
                  <th className="px-6 py-4 font-bold text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-gray-400">
                      <Loader2 className="animate-spin inline-block mr-2" size={20} /> กำลังโหลดข้อมูล...
                    </td>
                  </tr>
                ) : (
                  expenses.map((item) => (
                    <tr 
                      key={item.expenseNo} 
                      onClick={() => setSelectedExpense(item)}
                      className={`hover:bg-blue-50/30 transition-colors cursor-pointer ${selectedExpense?.expenseNo === item.expenseNo ? 'bg-blue-50/50' : ''}`}
                    >
                      <td className="px-6 py-4 font-bold text-blue-600">{item.expenseNo}</td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{item.date}</td>
                      <td className="px-6 py-4 text-gray-800 font-bold">{item.type}</td>
                      <td className="px-6 py-4 text-gray-500 font-medium">{item.category}</td>
                      <td className="px-6 py-4 text-gray-700 font-medium">{item.supplier}</td>
                      <td className="px-6 py-4 text-gray-500 font-medium underline decoration-gray-200">{item.referenceNo}</td>
                      <td className="px-6 py-4 text-right font-bold text-gray-800">{item.totalAmount?.toLocaleString('th-TH', {minimumFractionDigits: 2})}</td>
                      <td className="px-6 py-4 flex justify-center">{getStatusBadge(item.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-1">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <Eye size={16} />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all">
                            <Edit size={16} />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all">
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
          <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              แสดง 1 ถึง {expenses.length} จาก 45 รายการ
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-white transition-all disabled:opacity-30" disabled>
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg text-xs font-bold shadow-md shadow-blue-500/20">1</button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white rounded-lg text-xs font-bold transition-all">2</button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white rounded-lg text-xs font-bold transition-all">3</button>
              <button className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-white transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full sticky top-24 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white z-10">
              <h3 className="text-base font-bold text-gray-800">รายละเอียดรายจ่าย</h3>
              <button className="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all">
                <X size={18} />
              </button>
            </div>

            {selectedExpense ? (
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-6 space-y-8">
                  {/* ID Header */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-gray-800">{selectedExpense.expenseNo}</h2>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">วันที่ {selectedExpense.date} เวลา 08:30 น.</p>
                    </div>
                    {getStatusBadge(selectedExpense.status)}
                  </div>

                  {/* Tabs */}
                  <div className="flex space-x-6 border-b border-gray-50 text-[11px] font-bold">
                    {["ข้อมูลทั่วไป", "ไฟล์แนบ", "ประวัติการอนุมัติ"].map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 relative transition-all ${activeTab === tab ? 'text-blue-600' : 'text-gray-400'}`}
                      >
                        {tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>}
                      </button>
                    ))}
                  </div>

                  {/* Details List */}
                  <div className="space-y-4">
                    {[
                      { label: "ประเภทค่าใช้จ่าย", value: selectedExpense.type, bold: true },
                      { label: "หมวดหมู่", value: selectedExpense.category },
                      { label: "ผู้จำหน่าย", value: selectedExpense.supplier },
                      { label: "เลขประจำตัวผู้เสียภาษี", value: selectedExpense.taxId || "0105555012345" },
                      { label: "อ้างอิง", value: selectedExpense.referenceNo, highlight: true },
                      { label: "จำนวนเงิน", value: selectedExpense.amount?.toLocaleString('th-TH', {minimumFractionDigits: 2}) },
                      { label: "ภาษีมูลค่าเพิ่ม 7%", value: selectedExpense.vat?.toLocaleString('th-TH', {minimumFractionDigits: 2}) },
                      { label: "รวมทั้งสิ้น", value: selectedExpense.totalAmount?.toLocaleString('th-TH', {minimumFractionDigits: 2}), bold: true, big: true },
                      { label: "หมายเหตุ", value: selectedExpense.note || "-", italic: true },
                    ].map((row, index) => (
                      <div key={index} className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-medium">{row.label}</span>
                        <span className={`text-right ${row.bold ? 'font-bold text-gray-800' : 'text-gray-600'} ${row.highlight ? 'text-blue-600 underline decoration-blue-100' : ''} ${row.big ? 'text-base' : ''} ${row.italic ? 'italic text-gray-400' : ''}`}>
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Connection Card */}
                  <div className="space-y-4 pt-6 border-t border-gray-50">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">เชื่อมโยงกับ</h4>
                    <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm">
                        <Truck size={20} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-[10px] text-blue-600 font-bold uppercase tracking-tight">เที่ยวรถ</p>
                        <p className="text-xs font-bold text-gray-800">{selectedExpense.referenceNo}</p>
                        <div className="flex items-center text-[10px] text-gray-400 font-medium">
                          <MapPin size={10} className="mr-1" />
                          สมุทรสาคร - ชลบุรี
                        </div>
                      </div>
                      <ExternalLink size={14} className="text-gray-300" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-8">
                    <button className="w-full py-3 bg-white border border-gray-100 text-blue-600 rounded-xl hover:bg-gray-50 transition-all text-xs font-bold shadow-sm flex items-center justify-center">
                      <Printer size={16} className="mr-2" />
                      พิมพ์เอกสาร
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-400 space-y-3">
                <CreditCard size={48} strokeWidth={1} />
                <p className="text-sm">เลือกรายการเพื่อดูรายละเอียด</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
