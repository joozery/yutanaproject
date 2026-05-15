"use client";

import { useState, useEffect } from "react";
import { 
  Search, Calendar, ChevronDown, Filter, LayoutGrid, List, MapPin, 
  Eye, MoreVertical, ChevronLeft, ChevronRight, Truck, TrendingUp, 
  Clock, CheckCircle2, Fuel, DollarSign, X, Phone, Package, Info, 
  CreditCard, FileText, Loader2, RefreshCcw
} from "lucide-react";

export default function TripsPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch('/api/trips');
        const data = await res.json();
        if (data.success) {
          setTrips(data.data);
          if (data.data.length > 0) {
            setSelectedTrip(data.data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const statCards = [
    { title: "เที่ยววันนี้", value: "28", unit: "เที่ยว", icon: Truck, trend: "+ เพิ่มขึ้น 12%", trendUp: true, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "กำลังวิ่ง", value: "12", unit: "เที่ยว", icon: Clock, trend: "+ เพิ่มขึ้น 8%", trendUp: true, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { title: "ส่งสำเร็จ", value: "10", unit: "เที่ยว", icon: CheckCircle2, trend: "+ เพิ่มขึ้น 15%", trendUp: true, color: "text-purple-600", bgColor: "bg-purple-50" },
    { title: "ค่าน้ำมันวันนี้", value: "18,500.00", unit: "บาท", icon: Fuel, trend: "- ลดลง 5%", trendUp: false, color: "text-orange-500", bgColor: "bg-orange-50" },
    { title: "รายได้วันนี้", value: "125,000.00", unit: "บาท", icon: DollarSign, trend: "+ เพิ่มขึ้น 18%", trendUp: true, color: "text-pink-600", bgColor: "bg-pink-50" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ส่งสำเร็จ":
        return <span className="px-3 py-1 text-[11px] font-medium bg-green-50 text-green-600 rounded-md">ส่งสำเร็จ</span>;
      case "กำลังวิ่ง":
        return <span className="px-3 py-1 text-[11px] font-medium bg-blue-50 text-blue-600 rounded-md">กำลังวิ่ง</span>;
      case "รอโหลด":
        return <span className="px-3 py-1 text-[11px] font-medium bg-orange-50 text-orange-600 rounded-md">รอโหลด</span>;
      case "ยกเลิก":
        return <span className="px-3 py-1 text-[11px] font-medium bg-red-50 text-red-600 rounded-md">ยกเลิก</span>;
      default:
        return <span className="px-3 py-1 text-[11px] font-medium bg-gray-50 text-gray-600 rounded-md">{status}</span>;
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-3">
            <div className="flex justify-between items-start">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bgColor} ${stat.color}`}>
                <stat.icon size={20} strokeWidth={2.5} />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 font-medium">{stat.title}</p>
                <div className="flex items-baseline justify-end gap-1 mt-1">
                  <span className="text-xl font-bold text-gray-800">{stat.value}</span>
                  <span className="text-[10px] text-gray-500 font-medium">{stat.unit}</span>
                </div>
              </div>
            </div>
            <div className={`text-[10px] font-bold ${stat.trendUp ? 'text-green-500' : 'text-red-500'} flex items-center`}>
              <TrendingUp size={12} className={`mr-1 ${!stat.trendUp && 'rotate-180'}`} />
              {stat.trend} <span className="text-gray-400 font-normal ml-1">จากเมื่อวาน</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">วันที่</label>
            <div className="relative">
              <input type="date" defaultValue="2024-06-30" className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">ลูกค้า</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none">
              <option>ทั้งหมด</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">ทะเบียนรถ</label>
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
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">จังหวัดต้นทาง</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none">
              <option>ทั้งหมด</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">จังหวัดปลายทาง</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none">
              <option>ทั้งหมด</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
          <div className="relative w-full md:w-96">
            <input type="text" placeholder="ค้นหา: เลขเที่ยว, ลูกค้า, จุดขึ้นสินค้า, จุดลงสินค้า..." className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-gray-100 p-1 rounded-xl flex">
              <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-blue-600 text-sm font-bold flex items-center">
                <List size={16} className="mr-2" /> รายการ
              </button>
              <button className="px-4 py-1.5 text-gray-500 text-sm font-medium flex items-center hover:text-gray-700">
                <Calendar size={16} className="mr-2" /> ปฏิทิน
              </button>
              <button className="px-4 py-1.5 text-gray-500 text-sm font-medium flex items-center hover:text-gray-700">
                <MapPin size={16} className="mr-2" /> แผนที่
              </button>
            </div>
            <button className="p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100">
              <RefreshCcw size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Table Section */}
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 ${selectedTrip ? 'xl:col-span-3' : 'xl:col-span-4'}`}>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-[11px] lg:text-xs text-left whitespace-nowrap">
              <thead className="text-gray-400 bg-gray-50/50 uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">เลขเที่ยว</th>
                  <th className="px-6 py-4">วันที่</th>
                  <th className="px-6 py-4">ลูกค้า</th>
                  <th className="px-6 py-4">จุดขึ้นสินค้า</th>
                  <th className="px-6 py-4">จุดลงสินค้า</th>
                  <th className="px-6 py-4">ทะเบียนรถ</th>
                  <th className="px-6 py-4">คนขับ</th>
                  <th className="px-6 py-4">ราคา (บาท)</th>
                  <th className="px-6 py-4 text-center">สถานะ</th>
                  <th className="px-6 py-4 text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr><td colSpan={10} className="px-6 py-20 text-center text-gray-400"><Loader2 className="animate-spin inline-block mr-2" /> กำลังโหลดข้อมูล...</td></tr>
                ) : trips.length === 0 ? (
                  <tr><td colSpan={10} className="px-6 py-20 text-center text-gray-400">ไม่พบข้อมูลเที่ยวรถ</td></tr>
                ) : (
                  trips.map((item) => (
                    <tr 
                      key={item._id} 
                      onClick={() => setSelectedTrip(item)}
                      className={`hover:bg-blue-50/30 cursor-pointer transition-colors ${selectedTrip?._id === item._id ? 'bg-blue-50/50' : ''}`}
                    >
                      <td className="px-6 py-5 font-bold text-blue-600">{item.tripNo}</td>
                      <td className="px-6 py-5 text-gray-600">{item.date}</td>
                      <td className="px-6 py-5 font-medium text-gray-800">{item.customer}</td>
                      <td className="px-6 py-5 text-gray-600">{item.origin}</td>
                      <td className="px-6 py-5 text-gray-600">{item.destination}</td>
                      <td className="px-6 py-5 text-gray-800 font-medium">{item.plate}</td>
                      <td className="px-6 py-5 text-gray-600">{item.driver}</td>
                      <td className="px-6 py-5 font-bold text-gray-800">{item.price?.toLocaleString('th-TH', {minimumFractionDigits: 2})}</td>
                      <td className="px-6 py-5 text-center">{getStatusBadge(item.status)}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye size={16} />
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

          <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-50 text-xs text-gray-500 gap-4">
            <div className="flex items-center gap-6">
              <span>แสดง 1 ถึง {trips.length} จาก 28 รายการ</span>
              <div className="flex items-center gap-2">
                <span>แสดง</span>
                <select className="bg-gray-50 border-none rounded-lg px-2 py-1 focus:outline-none font-bold text-gray-700">
                  <option>10</option>
                  <option>20</option>
                </select>
                <span>รายการ</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50" disabled>
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-sm">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600 font-medium">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600 font-medium">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        {selectedTrip && (
          <div className="xl:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-base font-bold text-gray-800">รายละเอียดเที่ยว</h3>
              <button onClick={() => setSelectedTrip(null)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedTrip.tripNo}</h2>
                  <p className="text-xs text-gray-400 font-medium mt-1">วันที่ {selectedTrip.date} เวลา {selectedTrip.time} น.</p>
                </div>
                {getStatusBadge(selectedTrip.status)}
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100">
                <button className="flex-1 pb-3 text-xs font-bold text-blue-600 border-b-2 border-blue-600">ข้อมูลเที่ยว</button>
                <button className="flex-1 pb-3 text-xs font-medium text-gray-400 hover:text-gray-600">ค่าใช้จ่าย</button>
                <button className="flex-1 pb-3 text-xs font-medium text-gray-400 hover:text-gray-600">เอกสาร</button>
              </div>

              {/* Trip Info Section */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-medium">ลูกค้า</span>
                    <span className="text-gray-800 font-bold">{selectedTrip.customer}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-medium">ประเภทสินค้า</span>
                    <span className="text-gray-800 font-bold">{selectedTrip.productType || "อุปกรณ์อิเล็กทรอนิกส์"}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-medium">น้ำหนักรวม</span>
                    <span className="text-gray-800 font-bold">{selectedTrip.weight?.toLocaleString()} กก.</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-medium">ปริมาตร</span>
                    <span className="text-gray-800 font-bold">{selectedTrip.volume?.toFixed(2)} ลบ.ม.</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-50">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ข้อมูลรถและคนขับ</p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400 font-medium">ทะเบียนรถ</span>
                      <span className="text-gray-800 font-bold">{selectedTrip.plate}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400 font-medium">ประเภทรถ</span>
                      <span className="text-gray-800 font-bold">{selectedTrip.truckType || "10 ล้อ ตู้ทึบ"}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400 font-medium">คนขับ</span>
                      <span className="text-gray-800 font-bold">{selectedTrip.driver}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400 font-medium">เบอร์โทร</span>
                      <div className="flex items-center text-blue-600 font-bold">
                        <Phone size={12} className="mr-1" /> {selectedTrip.driverPhone || "081-234-5678"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Section */}
                <div className="space-y-6 pt-4 border-t border-gray-50">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">เส้นทาง</p>
                  <div className="relative pl-8 space-y-8">
                    {/* Line Connector */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-dashed border-l-2 border-dashed border-gray-200"></div>
                    
                    <div className="relative">
                      <div className="absolute -left-8 top-0.5 w-6 h-6 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                        <MapPin size={14} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-800">จุดขึ้นสินค้า</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{selectedTrip.origin}, {selectedTrip.originDetail || "สมุทรปราการ"}</p>
                        <p className="text-[9px] text-gray-400 mt-1">วันที่ {selectedTrip.date} เวลา {selectedTrip.time} น.</p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-8 top-0.5 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                        <MapPin size={14} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-800">จุดลงสินค้า</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{selectedTrip.destination}, {selectedTrip.destinationDetail || "นครราชสีมา"}</p>
                        <p className="text-[9px] text-gray-400 mt-1">วันที่ 30/06/2024 เวลา 16:45 น.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="space-y-4 pt-4 border-t border-gray-50">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">สถานะการเดินทาง</p>
                  <div className="space-y-4">
                    {[
                      { status: "รับงาน", time: "30/06/2024 08:00", completed: true },
                      { status: "โหลดสินค้า", time: "30/06/2024 08:30", completed: true },
                      { status: "ออกเดินทาง", time: "30/06/2024 09:00", completed: true },
                      { status: "ส่งสินค้า", time: "30/06/2024 16:45", completed: selectedTrip.status === "ส่งสำเร็จ" },
                      { status: "ปิดงาน", time: "30/06/2024 17:00", completed: selectedTrip.status === "ส่งสำเร็จ" },
                    ].map((step, i) => (
                      <div key={i} className="flex justify-between items-center text-[10px]">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-300'}`}>
                            <CheckCircle2 size={12} />
                          </div>
                          <span className={`font-bold ${step.completed ? 'text-gray-800' : 'text-gray-400'}`}>{step.status}</span>
                        </div>
                        <span className="text-gray-400">{step.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-50 bg-gray-50/30 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                <FileText size={14} className="mr-2" /> ใบกำกับสินค้า
              </button>
              <button className="flex items-center justify-center py-2.5 bg-blue-600 rounded-xl text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-sm">
                อัปเดตสถานะ
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .bg-dashed {
          background-image: linear-gradient(to bottom, #d1d5db 50%, rgba(255, 255, 255, 0) 0%);
          background-position: left;
          background-size: 1px 8px;
          background-repeat: repeat-y;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
}
