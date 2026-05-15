"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save, X, Loader2 } from "lucide-react";

export default function CreateCustomerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingNo, setIsLoadingNo] = useState(true);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    taxId: "",
    phone: "",
    address: "",
    group: "ทั่วไป",
    term: 30,
    limit: 0,
    status: "ใช้งาน"
  });

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const res = await fetch('/api/customers/generate-no');
        const data = await res.json();
        if (data.success) {
          setFormData(prev => ({ ...prev, code: data.code }));
        }
      } catch (error) {
        console.error("Error fetching code:", error);
      } finally {
        setIsLoadingNo(false);
      }
    };
    fetchCode();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          term: Number(formData.term),
          limit: Number(formData.limit)
        })
      });

      const data = await res.json();
      if (data.success) {
        router.push('/customers');
      } else {
        alert("Error saving customer: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error saving customer");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">เพิ่มลูกค้าใหม่</h1>
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">หน้าแรก</Link>
            <span className="mx-2">{'>'}</span>
            <Link href="/customers" className="hover:text-blue-600 transition-colors">ลูกค้า</Link>
            <span className="mx-2">{'>'}</span>
            <span className="text-gray-800 font-medium">เพิ่มลูกค้าใหม่</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">ข้อมูลทั่วไป</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">รหัสลูกค้า</label>
                <div className="relative">
                  <input type="text" name="code" value={formData.code} readOnly className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none font-medium" />
                  {isLoadingNo && <Loader2 size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin" />}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">ชื่อบริษัท / ลูกค้า <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="ระบุชื่อบริษัท" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">กลุ่มลูกค้า</label>
                <select name="group" value={formData.group} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option value="ทั่วไป">ทั่วไป</option>
                  <option value="VIP">VIP</option>
                  <option value="นิติบุคคล">นิติบุคคล</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">สถานะ</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option value="ใช้งาน">ใช้งาน</option>
                  <option value="ไม่ใช้งาน">ไม่ใช้งาน</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">ข้อมูลติดต่อและภาษี</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">เลขประจำตัวผู้เสียภาษี</label>
                <input type="text" name="taxId" value={formData.taxId} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="13 หลัก" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">เบอร์โทรศัพท์</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="02-xxx-xxxx" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">เครดิตเทอม (วัน)</label>
                <input type="number" name="term" value={formData.term} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">วงเงินเครดิต (บาท)</label>
                <input type="number" name="limit" value={formData.limit} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">ที่อยู่</label>
                <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" placeholder="ระบุที่อยู่สำหรับออกใบกำกับภาษี"></textarea>
              </div>
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <Link href="/customers" className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center">
              <X size={18} className="mr-2" />
              ยกเลิก
            </Link>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-sm flex items-center disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 size={18} className="mr-2 animate-spin" /> : <Save size={18} className="mr-2" />}
              บันทึกข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
