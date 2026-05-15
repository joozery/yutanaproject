"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save, X, Loader2, Truck as TruckIcon, Calendar, Camera } from "lucide-react";

export default function CreateTruckPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    plate: "",
    type: "6 ล้อ ตู้ทึบ",
    brand: "",
    year: "",
    driver: "",
    driverPhone: "",
    status: "ใช้งานอยู่",
    mileage: 0,
    vin: "",
    engineNo: "",
    color: "",
    payloadWeight: "",
    branch: "สาขาสมุทรปราการ",
    insuranceExpiry: "",
    actExpiry: "",
    taxExpiry: "",
    lastCheckDate: "",
    lastCheckMileage: 0,
    imageUrl: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/trucks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        router.push('/trucks');
      } else {
        alert("Error saving truck: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error saving truck");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">เพิ่มรถขนส่งใหม่</h1>
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">หน้าแรก</Link>
            <span className="mx-2">{'>'}</span>
            <Link href="/trucks" className="hover:text-blue-600 transition-colors">รถขนส่ง</Link>
            <span className="mx-2">{'>'}</span>
            <span className="text-gray-800 font-medium">เพิ่มรถขนส่งใหม่</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2 mb-6">ข้อมูลตัวรถ</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">ทะเบียนรถ <span className="text-red-500">*</span></label>
                <input type="text" name="plate" value={formData.plate} onChange={handleInputChange} required className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="เช่น 70-1234" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">ประเภทรถ <span className="text-red-500">*</span></label>
                <select name="type" value={formData.type} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option value="4 ล้อ ตู้ทึบ">4 ล้อ ตู้ทึบ</option>
                  <option value="6 ล้อ ตู้ทึบ">6 ล้อ ตู้ทึบ</option>
                  <option value="6 ล้อ กระบะคอก">6 ล้อ กระบะคอก</option>
                  <option value="10 ล้อ ตู้ทึบ">10 ล้อ ตู้ทึบ</option>
                  <option value="สิบล้อ พ่วง">สิบล้อ พ่วง</option>
                  <option value="หัวลาก">หัวลาก</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">ยี่ห้อ / รุ่น</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="เช่น HINO FC9J" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">ปีจดทะเบียน</label>
                <input type="text" name="year" value={formData.year} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="เช่น 2020" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">เลขตัวถัง (VIN)</label>
                <input type="text" name="vin" value={formData.vin} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">เลขเครื่องยนต์</label>
                <input type="text" name="engineNo" value={formData.engineNo} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">สีรถ</label>
                <input type="text" name="color" value={formData.color} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">น้ำหนักบรรทุก (กก.)</label>
                <input type="text" name="payloadWeight" value={formData.payloadWeight} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2 mb-6">ข้อมูลคนขับและสาขา</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">คนขับหลัก</label>
                <input type="text" name="driver" value={formData.driver} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">เบอร์โทรคนขับ</label>
                <input type="text" name="driverPhone" value={formData.driverPhone} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">สาขา</label>
                <select name="branch" value={formData.branch} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option value="สาขาสมุทรปราการ">สาขาสมุทรปราการ</option>
                  <option value="สาขาชลบุรี">สาขาชลบุรี</option>
                  <option value="สาขาระยอง">สาขาระยอง</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">สถานะปัจจุบัน</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option value="ใช้งานอยู่">ใช้งานอยู่</option>
                  <option value="เข้าซ่อม">เข้าซ่อม</option>
                  <option value="จอด">จอด</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2 mb-6">วันหมดอายุและไมล์</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">วันหมดอายุประกันภัย</label>
                <div className="relative">
                  <input type="date" name="insuranceExpiry" value={formData.insuranceExpiry} onChange={handleInputChange} className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">วันหมดอายุ พ.ร.บ.</label>
                <div className="relative">
                  <input type="date" name="actExpiry" value={formData.actExpiry} onChange={handleInputChange} className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">วันหมดอายุภาษีรถยนต์</label>
                <div className="relative">
                  <input type="date" name="taxExpiry" value={formData.taxExpiry} onChange={handleInputChange} className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">เลขไมล์ปัจจุบัน (กม.)</label>
                <input type="number" name="mileage" value={formData.mileage} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4">รูปรถขนส่ง</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 hover:border-blue-300 transition-colors group">
              <Camera size={28} className="text-gray-400 group-hover:text-blue-500 mb-3" />
              <p className="text-sm font-medium text-gray-700 mb-1">อัปโหลดรูปภาพรถ</p>
              <p className="text-xs text-gray-500">รองรับไฟล์ .jpg, .png</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 size={18} className="mr-2 animate-spin" /> : <Save size={18} className="mr-2" />}
              บันทึกข้อมูลรถขนส่ง
            </button>
            <Link href="/trucks" className="w-full px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
              <X size={18} className="mr-2" />
              ยกเลิก
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
