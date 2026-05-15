"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Plus, Users, UserCheck, AlertCircle, UserPlus, RefreshCcw, FileSpreadsheet, FileText, Eye, Edit, MoreVertical, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export default function CustomersPage() {
  const [customersList, setCustomersList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('/api/customers');
        const data = await res.json();
        if (data.success) {
          setCustomersList(data.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomers();
  }, []);
  const statCards = [
    { title: "ลูกค้าทั้งหมด", value: "128", unit: "ราย", icon: Users, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "ลูกค้าที่ใช้งาน", value: "98", unit: "ราย", icon: UserCheck, color: "text-green-600", bgColor: "bg-green-50" },
    { title: "ยอดค้างชำระรวม", value: "2,350,450.00", unit: "บาท", icon: AlertCircle, color: "text-red-500", bgColor: "bg-red-50", valueColor: "text-red-500" },
    { title: "ลูกค้าใหม่เดือนนี้", value: "6", unit: "ราย", icon: UserPlus, color: "text-green-600", bgColor: "bg-green-50" },
  ];



  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Header & Breadcrumb (Only visible on this page as per design) */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">ลูกค้า</h1>
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">หน้าแรก</Link>
            <span className="mx-2">{'>'}</span>
            <span className="text-gray-800 font-medium">ลูกค้า</span>
          </div>
        </div>
        <Link href="/customers/create" className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
          <Plus size={18} className="mr-2" />
          เพิ่มลูกค้า
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-5 ${stat.bgColor} ${stat.color}`}>
              <stat.icon size={26} strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">{stat.title}</p>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-bold ${stat.valueColor || 'text-gray-800'}`}>{stat.value}</span>
                <span className="text-sm text-gray-500 font-medium">{stat.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-[2] relative">
            <input type="text" placeholder="ค้นหาลูกค้า, เลขประจำตัวผู้เสียภาษี, เบอร์โทร..." className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
            <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex-1 relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-medium text-gray-500">กลุ่มลูกค้า</label>
            <select className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700">
              <option>ทั้งหมด</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="flex-1 relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-medium text-gray-500">สถานะ</label>
            <select className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700">
              <option>ทั้งหมด</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="flex-1 relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-medium text-gray-500">เครดิตเทอม</label>
            <select className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700">
              <option>ทั้งหมด</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <button className="flex items-center justify-center px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap">
            <RefreshCcw size={16} className="mr-2" />
            ล้างตัวกรอง
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b border-gray-50 gap-4">
          <h3 className="text-base font-bold text-gray-800">รายการลูกค้าทั้งหมด</h3>
          <div className="flex gap-3">
            <button className="flex items-center px-3 py-2 bg-white text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors text-xs font-medium">
              <FileSpreadsheet size={16} className="mr-1.5" />
              ส่งออก Excel
            </button>
            <button className="flex items-center px-3 py-2 bg-white text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-xs font-medium">
              <FileText size={16} className="mr-1.5" />
              ดาวน์โหลด PDF
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-gray-500 bg-gray-50/80">
              <tr>
                <th className="px-6 py-4 font-medium text-center w-12">ลำดับ</th>
                <th className="px-6 py-4 font-medium">รหัสลูกค้า</th>
                <th className="px-6 py-4 font-medium">ชื่อบริษัท</th>
                <th className="px-6 py-4 font-medium">เลขประจำตัวผู้เสียภาษี</th>
                <th className="px-6 py-4 font-medium">เบอร์โทรศัพท์</th>
                <th className="px-6 py-4 font-medium text-center">เครดิตเทอม (วัน)</th>
                <th className="px-6 py-4 font-medium text-right">วงเงินเครดิต (บาท)</th>
                <th className="px-6 py-4 font-medium text-right">ยอดค้างชำระ (บาท)</th>
                <th className="px-6 py-4 font-medium text-center">สถานะ</th>
                <th className="px-6 py-4 font-medium text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={10} className="px-6 py-8 text-center text-gray-500">กำลังโหลดข้อมูล...</td></tr>
              ) : customersList.length === 0 ? (
                <tr><td colSpan={10} className="px-6 py-8 text-center text-gray-500">ไม่พบข้อมูลลูกค้า</td></tr>
              ) : (
                customersList.map((item, index) => (
                  <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-center text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-blue-600">
                      <Link href={`/customers/${item.code}`} className="hover:underline">{item.code}</Link>
                    </td>
                    <td className="px-6 py-4 text-gray-800 font-medium">{item.name}</td>
                    <td className="px-6 py-4 text-gray-600">{item.taxId || '-'}</td>
                    <td className="px-6 py-4 text-gray-600">{item.phone || '-'}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{item.term}</td>
                    <td className="px-6 py-4 text-right text-gray-600">{item.limit?.toLocaleString('th-TH', {minimumFractionDigits: 2})}</td>
                    <td className={`px-6 py-4 text-right font-medium ${item.due !== 0 ? "text-red-500" : "text-gray-800"}`}>
                      {item.due?.toLocaleString('th-TH', {minimumFractionDigits: 2})}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.status === "ใช้งาน" ? (
                        <span className="px-3 py-1 text-[11px] font-medium bg-green-50 text-green-600 rounded-md">ใช้งาน</span>
                      ) : (
                        <span className="px-3 py-1 text-[11px] font-medium bg-gray-100 text-gray-500 rounded-md">ไม่ใช้งาน</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="ดูรายละเอียด">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded transition-colors" title="แก้ไข">
                          <Edit size={16} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors">
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
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t border-gray-50 text-xs text-gray-500 gap-4">
          <div className="flex items-center gap-4">
            <span>แสดง 1 ถึง 10 จาก 128 รายการ</span>
            <div className="flex items-center gap-2">
              <span>แสดง</span>
              <select className="border border-gray-200 rounded px-2 py-1 bg-white focus:outline-none">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <span>รายการ</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white font-medium shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600">4</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600">5</button>
            <span className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600">13</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
