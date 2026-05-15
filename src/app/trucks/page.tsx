"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Plus, Truck as TruckIcon, Wrench, ShieldAlert, FileWarning, RefreshCcw, Eye, Edit, MoreVertical, ChevronLeft, ChevronRight, ChevronDown, Phone, ShieldCheck, FileText, Settings, Loader2 } from "lucide-react";

export default function TrucksPage() {
  const [trucksList, setTrucksList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTruck, setSelectedTruck] = useState<any>(null);

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const res = await fetch('/api/trucks');
        const data = await res.json();
        if (data.success) {
          setTrucksList(data.data);
          if (data.data.length > 0) {
            setSelectedTruck(data.data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching trucks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrucks();
  }, []);

  const statCards = [
    { title: "รถทั้งหมด", value: trucksList.length.toString(), unit: "คัน", icon: TruckIcon, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "ใช้งานอยู่", value: trucksList.filter(t => t.status === "ใช้งานอยู่").length.toString(), unit: "คัน", icon: TruckIcon, color: "text-green-600", bgColor: "bg-green-50" },
    { title: "เข้าซ่อมบำรุง", value: trucksList.filter(t => t.status === "เข้าซ่อม").length.toString(), unit: "คัน", icon: Wrench, color: "text-orange-500", bgColor: "bg-orange-50" },
    { title: "ประกันใกล้หมด", value: "3", unit: "คัน", icon: ShieldAlert, color: "text-red-500", bgColor: "bg-red-50" },
    { title: "ภาษีใกล้หมด", value: "5", unit: "คัน", icon: FileWarning, color: "text-purple-600", bgColor: "bg-purple-50" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ใช้งานอยู่":
        return <span className="px-3 py-1 text-[11px] font-medium bg-green-50 text-green-600 rounded-md">ใช้งานอยู่</span>;
      case "เข้าซ่อม":
        return <span className="px-3 py-1 text-[11px] font-medium bg-orange-50 text-orange-600 rounded-md">เข้าซ่อม</span>;
      case "จอด":
        return <span className="px-3 py-1 text-[11px] font-medium bg-gray-100 text-gray-600 rounded-md">จอด</span>;
      default:
        return <span className="px-3 py-1 text-[11px] font-medium bg-gray-50 text-gray-600 rounded-md">{status}</span>;
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Action */}
      <div className="flex justify-end mb-2">
        <Link href="/trucks/create" className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
          <Plus size={18} className="mr-2" />
          เพิ่มรถขนส่ง
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

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-[2] relative">
            <input type="text" placeholder="ค้นหาทะเบียนรถ, ประเภทรถ, คนขับ..." className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
            <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex-1 relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-medium text-gray-500">ประเภทรถ</label>
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
            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-medium text-gray-500">สาขา</label>
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Table Section */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50">
            <h3 className="text-base font-bold text-gray-800">รายการรถขนส่งทั้งหมด</h3>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-xs text-left whitespace-nowrap">
              <thead className="text-gray-500 bg-gray-50/80">
                <tr>
                  <th className="px-4 py-4 font-medium text-center w-12">ลำดับ</th>
                  <th className="px-4 py-4 font-medium">ทะเบียนรถ</th>
                  <th className="px-4 py-4 font-medium">ประเภทรถ</th>
                  <th className="px-4 py-4 font-medium">ยี่ห้อ / รุ่น</th>
                  <th className="px-4 py-4 font-medium text-center">ปี</th>
                  <th className="px-4 py-4 font-medium">คนขับหลัก</th>
                  <th className="px-4 py-4 font-medium text-center">สถานะ</th>
                  <th className="px-4 py-4 font-medium text-right">ไมล์สะสม (กม.)</th>
                  <th className="px-4 py-4 font-medium text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={9} className="px-6 py-8 text-center text-gray-500"><Loader2 className="animate-spin inline-block mr-2" size={16} /> กำลังโหลดข้อมูล...</td></tr>
                ) : trucksList.length === 0 ? (
                  <tr><td colSpan={9} className="px-6 py-8 text-center text-gray-500">ไม่พบข้อมูลรถขนส่ง</td></tr>
                ) : (
                  trucksList.map((item, index) => (
                    <tr 
                      key={item._id} 
                      onClick={() => setSelectedTruck(item)}
                      className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer ${selectedTruck?._id === item._id ? 'bg-blue-50/30' : ''}`}
                    >
                      <td className="px-4 py-4 text-center text-gray-500">{index + 1}</td>
                      <td className="px-4 py-4 font-medium text-blue-600">{item.plate}</td>
                      <td className="px-4 py-4 text-gray-800 font-medium">{item.type}</td>
                      <td className="px-4 py-4 text-gray-600">{item.brand}</td>
                      <td className="px-4 py-4 text-center text-gray-600">{item.year}</td>
                      <td className="px-4 py-4 text-gray-800">{item.driver || '-'}</td>
                      <td className="px-4 py-4 text-center">{getStatusBadge(item.status)}</td>
                      <td className="px-4 py-4 text-right text-gray-600">{item.mileage?.toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-1">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded transition-colors">
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
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 lg:p-6 border-t border-gray-50 text-xs text-gray-500 gap-4">
            <div className="flex items-center gap-4">
              <span>แสดง {isLoading ? 0 : trucksList.length} รายการ</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50" disabled>
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white font-medium shadow-sm">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50" disabled>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Details Panel */}
        <div className="xl:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
          <div className="p-6 border-b border-gray-50">
            <h3 className="text-base font-bold text-gray-800">รายละเอียดรถขนส่ง</h3>
          </div>
          
          {selectedTruck ? (
            <div className="p-6 space-y-6">
              {/* Truck Image */}
              <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200">
                <img 
                  src={selectedTruck.imageUrl || "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800"} 
                  alt="Truck" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">{selectedTruck.plate}</h2>
                {getStatusBadge(selectedTruck.status)}
              </div>

              {/* Details List */}
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2">
                  <span className="text-gray-500">ประเภทรถ</span>
                  <span className="text-gray-800 font-medium">{selectedTruck.type}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-500">ยี่ห้อ / รุ่น</span>
                  <span className="text-gray-800 font-medium">{selectedTruck.brand || '-'}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-500">ปีจดทะเบียน</span>
                  <span className="text-gray-800 font-medium">{selectedTruck.year || '-'}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-500">เลขตัวถัง (VIN)</span>
                  <span className="text-gray-800 font-medium">{selectedTruck.vin || '-'}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-500">เลขเครื่องยนต์</span>
                  <span className="text-gray-800 font-medium">{selectedTruck.engineNo || '-'}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-500">สีรถ</span>
                  <span className="text-gray-800 font-medium">{selectedTruck.color || '-'}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-500">น้ำหนักบรรทุก</span>
                  <span className="text-gray-800 font-medium">{selectedTruck.payloadWeight || '-'} กก.</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-500">คนขับหลัก</span>
                  <div className="text-gray-800 font-medium">
                    {selectedTruck.driver || '-'}
                    {selectedTruck.driverPhone && (
                      <div className="flex items-center text-blue-600 text-xs mt-1">
                        <Phone size={12} className="mr-1" />
                        {selectedTruck.driverPhone}
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-500">สาขา</span>
                  <span className="text-gray-800 font-medium">{selectedTruck.branch || '-'}</span>
                </div>
              </div>

              {/* Small Info Cards */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3 bg-gray-50/50">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium">ประกันภัย</p>
                    <p className={`text-[11px] font-medium mt-0.5 ${selectedTruck.insuranceExpiry ? 'text-red-500' : 'text-gray-400'}`}>
                      {selectedTruck.insuranceExpiry ? `หมดอายุ ${selectedTruck.insuranceExpiry}` : 'ไม่ได้ระบุ'}
                    </p>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3 bg-gray-50/50">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center flex-shrink-0">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium">ภาษีรถยนต์</p>
                    <p className={`text-[11px] font-medium mt-0.5 ${selectedTruck.taxExpiry ? 'text-red-500' : 'text-gray-400'}`}>
                      {selectedTruck.taxExpiry ? `หมดอายุ ${selectedTruck.taxExpiry}` : 'ไม่ได้ระบุ'}
                    </p>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3 bg-gray-50/50">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                    <ShieldAlert size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium">พ.ร.บ.</p>
                    <p className={`text-[11px] font-medium mt-0.5 ${selectedTruck.actExpiry ? 'text-red-500' : 'text-gray-400'}`}>
                      {selectedTruck.actExpiry ? `หมดอายุ ${selectedTruck.actExpiry}` : 'ไม่ได้ระบุ'}
                    </p>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3 bg-gray-50/50">
                  <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
                    <Settings size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium">เช็คระยะล่าสุด</p>
                    <p className="text-[11px] text-gray-800 font-medium mt-0.5">
                      {selectedTruck.lastCheckDate || '-'}<br/>
                      {selectedTruck.lastCheckMileage?.toLocaleString() || '-'} กม.
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 mt-2 border border-blue-200 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors text-sm">
                ดูประวัติการซ่อมบำรุง
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-400 space-y-3">
              <TruckIcon size={48} strokeWidth={1} />
              <p className="text-sm">เลือกรายการรถเพื่อดูรายละเอียด</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
