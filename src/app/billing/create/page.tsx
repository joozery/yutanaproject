"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Search, UploadCloud, Loader2 } from "lucide-react";

export default function CreateBillingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingNo, setIsLoadingNo] = useState(true);
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    customer: "บริษัท ABC จำกัด",
    customerAddress: "99/99 หมู่ 1 ต.บางโฉลง อ.บางพลี จ.สมุทรปราการ 10540",
    customerTaxId: "0115556009876",
    billingNo: "INV-2024-06-00019",
    cycle: "06/2024 (มิถุนายน 2567)",
    date: "2024-06-30",
    dueDate: "2024-07-30",
    creditTerm: "30 วัน",
    reference: "",
    note: "",
    discount: 0,
    paymentMethod: "โอนเงินเข้าบัญชี",
    bank: "ธนาคารกสิกรไทย",
    accountNo: "123-1-23456-7",
    accountName: "บริษัท ยุทธนากิจขนส่ง จำกัด",
  });

  const [trips, setTrips] = useState([
    { id: "TRP-2406-156", date: "20/06/2024", origin: "สมุทรสาคร", destination: "ชลบุรี", plate: "70-1234", price: 25000, selected: true },
    { id: "TRP-2406-155", date: "20/06/2024", origin: "กรุงเทพฯ", destination: "ระยอง", plate: "70-5678", price: 18000, selected: true },
    { id: "TRP-2406-154", date: "19/06/2024", origin: "บางปะอิน", destination: "นครราชสีมา", plate: "70-9012", price: 22000, selected: false },
    { id: "TRP-2406-153", date: "19/06/2024", origin: "สมุทรปราการ", destination: "ชลบุรี", plate: "70-3456", price: 16000, selected: false },
    { id: "TRP-2406-152", date: "19/06/2024", origin: "กรุงเทพฯ", destination: "จันทบุรี", plate: "70-7890", price: 20000, selected: false },
  ]);

  useEffect(() => {
    const fetchBillingNo = async () => {
      try {
        const res = await fetch('/api/billings/generate-no');
        const data = await res.json();
        if (data.success) {
          setFormData(prev => ({ ...prev, billingNo: data.billingNo }));
        }
      } catch (error) {
        console.error("Error generating billing no:", error);
      } finally {
        setIsLoadingNo(false);
      }
    };
    fetchBillingNo();

    const fetchCustomers = async () => {
      try {
        const res = await fetch('/api/customers');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setCustomers(data.data);
          // Auto-fill the first customer if current formData is default
          const firstCus = data.data[0];
          setFormData(prev => ({
            ...prev,
            customer: firstCus.name,
            customerAddress: firstCus.address || "",
            customerTaxId: firstCus.taxId || ""
          }));
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setIsLoadingCustomers(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto-fill address and tax ID when customer name changes
    if (name === "customer") {
      const selectedCus = customers.find(c => c.name === value);
      if (selectedCus) {
        setFormData(prev => ({
          ...prev,
          customerAddress: selectedCus.address || "",
          customerTaxId: selectedCus.taxId || ""
        }));
      }
    }
  };

  const handleTripToggle = (id: string) => {
    setTrips(trips.map(trip => trip.id === id ? { ...trip, selected: !trip.selected } : trip));
  };

  // Calculations
  const selectedTrips = trips.filter(t => t.selected);
  const subTotal = selectedTrips.reduce((sum, trip) => sum + trip.price, 0);
  const preTaxAmount = subTotal - Number(formData.discount || 0);
  const taxAmount = preTaxAmount * 0.07;
  const totalAmount = preTaxAmount + taxAmount;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        cycle: formData.cycle.split(' ')[0], // Extract just the mm/yyyy part if needed
        trips: selectedTrips.map(t => ({
          tripNo: t.id,
          date: t.date,
          origin: t.origin,
          destination: t.destination,
          plate: t.plate,
          price: t.price
        })),
        subTotal,
        discount: Number(formData.discount || 0),
        preTaxAmount,
        taxAmount,
        totalAmount,
        dueAmount: totalAmount,
        status: "รอชำระเงิน",
      };

      const res = await fetch('/api/billings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        router.push('/billing');
      } else {
        alert("Error saving billing: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error saving billing");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-20">
      {/* Top Actions */}
      <div className="flex justify-end items-center gap-3">
        <Link href="/billing" className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm">
          ยกเลิก
        </Link>
        <button className="px-6 py-2.5 bg-white border border-blue-200 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors text-sm">
          บันทึกแบบร่าง
        </button>
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting || selectedTrips.length === 0}
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-sm disabled:opacity-50"
        >
          {isSubmitting ? "กำลังบันทึก..." : "บันทึกและสร้างใบวางบิล"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Left Content */}
        <div className="lg:col-span-2 xl:col-span-3 space-y-6">
          
          {/* ข้อมูลใบวางบิล (Billing Info) */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">ข้อมูลใบวางบิล</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
              {/* Column 1 */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">ลูกค้า <span className="text-red-500">*</span></label>
                  <select name="customer" value={formData.customer} onChange={handleInputChange} disabled={isLoadingCustomers} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none">
                    {isLoadingCustomers ? (
                      <option>กำลังโหลดข้อมูลลูกค้า...</option>
                    ) : (
                      customers.map(cus => (
                        <option key={cus._id} value={cus.name}>{cus.name}</option>
                      ))
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">ที่อยู่</label>
                  <textarea name="customerAddress" value={formData.customerAddress} onChange={handleInputChange} readOnly className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none resize-none h-20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">เลขประจำตัวผู้เสียภาษี</label>
                  <input type="text" name="customerTaxId" value={formData.customerTaxId} onChange={handleInputChange} readOnly className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none" />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">เลขที่ใบวางบิล</label>
                  <div className="relative">
                    <input type="text" name="billingNo" value={formData.billingNo} readOnly className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none font-medium" />
                    {isLoadingNo && <Loader2 size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin" />}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">รอบบิล <span className="text-red-500">*</span></label>
                  <select name="cycle" value={formData.cycle} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none">
                    <option value="06/2024 (มิถุนายน 2567)">06/2024 (มิถุนายน 2567)</option>
                    <option value="07/2024 (กรกฎาคม 2567)">07/2024 (กรกฎาคม 2567)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">เครดิตเทอม</label>
                  <input type="text" name="creditTerm" value={formData.creditTerm} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-5">
                <div>
                  <div className="relative">
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">ครบกำหนดชำระ</label>
                  <div className="relative">
                    <input type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">อ้างอิง (ถ้ามี)</label>
                  <input type="text" name="reference" value={formData.reference} onChange={handleInputChange} placeholder="เช่น ใบเสนอราคา, PO" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {/* เลือกเที่ยวรถเพื่อวางบิล (Select Trips) */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">เลือกเที่ยวรถเพื่อวางบิล</h3>
            
            {/* Table */}
            <div className="overflow-x-auto border border-gray-100 rounded-xl mb-4">
              <table className="w-full text-xs text-left">
                <thead className="text-gray-500 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-medium w-12 text-center">เลือก</th>
                    <th className="px-4 py-3 font-medium">เลขที่เที่ยว</th>
                    <th className="px-4 py-3 font-medium">วันที่เที่ยว</th>
                    <th className="px-4 py-3 font-medium">จุดรับสินค้า</th>
                    <th className="px-4 py-3 font-medium">จุดส่งสินค้า</th>
                    <th className="px-4 py-3 font-medium">ทะเบียนรถ</th>
                    <th className="px-4 py-3 font-medium text-right">ราคา/เที่ยว (บาท)</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((item) => (
                    <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 text-center">
                        <input type="checkbox" checked={item.selected} onChange={() => handleTripToggle(item.id)} className="rounded border-gray-300 w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                      </td>
                      <td className="px-4 py-3 font-medium text-blue-600">{item.id}</td>
                      <td className="px-4 py-3 text-gray-600">{item.date}</td>
                      <td className="px-4 py-3 text-gray-600">{item.origin}</td>
                      <td className="px-4 py-3 text-gray-600">{item.destination}</td>
                      <td className="px-4 py-3 text-gray-600">{item.plate}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-800">{item.price.toLocaleString('th-TH', {minimumFractionDigits: 2})}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">เลือกแล้ว <span className="font-bold text-blue-600">{selectedTrips.length}</span> เที่ยว</span>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">รวมราคา</span>
                <span className="text-lg font-bold text-gray-800">{subTotal.toLocaleString('th-TH', {minimumFractionDigits: 2})} <span className="text-sm font-normal">บาท</span></span>
              </div>
            </div>
          </div>

          {/* หมายเหตุ (Note) */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">หมายเหตุ</h3>
            <textarea name="note" value={formData.note} onChange={handleInputChange} placeholder="ระบุหมายเหตุ (ถ้ามี)" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 min-h-[100px] resize-none"></textarea>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-1 xl:col-span-1 space-y-6">
          
          {/* สรุปยอดวางบิล (Summary) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-800 mb-6">สรุปยอดวางบิล</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">รวมค่าเที่ยว</span>
                <span className="text-gray-800 font-medium">{subTotal.toLocaleString('th-TH', {minimumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">ส่วนลด</span>
                <div className="flex items-center w-32 relative">
                  <input type="number" name="discount" value={formData.discount} onChange={handleInputChange} className="w-full px-3 py-1.5 text-right border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  <span className="ml-2 text-gray-500 text-xs">บาท</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-gray-500">ยอดก่อนภาษี</span>
                <span className="text-gray-800 font-medium">{preTaxAmount.toLocaleString('th-TH', {minimumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">ภาษีมูลค่าเพิ่ม 7%</span>
                <span className="text-gray-800 font-medium">{taxAmount.toLocaleString('th-TH', {minimumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between items-end pt-4 mt-2 border-t border-gray-100">
                <span className="text-sm font-bold text-gray-800">ยอดรวมทั้งสิ้น</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{totalAmount.toLocaleString('th-TH', {minimumFractionDigits: 2})}</div>
                  <div className="text-xs text-blue-600 font-medium mt-1">บาท</div>
                </div>
              </div>
            </div>
          </div>

          {/* การชำระเงิน (Payment) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-800 mb-5">การชำระเงิน</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium">วิธีการชำระเงิน</label>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none">
                  <option value="โอนเงินเข้าบัญชี">โอนเงินเข้าบัญชี</option>
                  <option value="เงินสด">เงินสด</option>
                  <option value="เช็ค">เช็ค</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium">ธนาคาร</label>
                <select name="bank" value={formData.bank} onChange={handleInputChange} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none">
                  <option value="ธนาคารกสิกรไทย">ธนาคารกสิกรไทย</option>
                  <option value="ธนาคารไทยพาณิชย์">ธนาคารไทยพาณิชย์</option>
                  <option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium">เลขที่บัญชี</label>
                <input type="text" name="accountNo" value={formData.accountNo} onChange={handleInputChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium">ชื่อบัญชี</label>
                <input type="text" name="accountName" value={formData.accountName} onChange={handleInputChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none" />
              </div>
            </div>
          </div>

          {/* ไฟล์แนบ (Attachments) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-800 mb-4">ไฟล์แนบ (ถ้ามี)</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 hover:border-blue-300 transition-colors mb-4 group">
              <UploadCloud size={28} className="text-gray-400 group-hover:text-blue-500 mb-3" />
              <p className="text-sm font-medium text-gray-700 mb-1">คลิกหรือลากไฟล์มาวางที่นี่</p>
              <p className="text-xs text-gray-500">รองรับไฟล์ .pdf, .jpg, .png (ขนาดไม่เกิน 10MB)</p>
            </div>
            <p className="text-xs text-gray-500">ยังไม่มีแนบไฟล์</p>
          </div>

        </div>
      </div>
    </div>
  );
}
