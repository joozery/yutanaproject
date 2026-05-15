"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  ChevronLeft, 
  Printer, 
  Download, 
  Mail, 
  Plus,
  Receipt,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function BillingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [billing, setBilling] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBilling = async () => {
      try {
        const response = await fetch(`/api/billings/${id}`);
        const result = await response.json();
        if (result.success) {
          setBilling(result.data);
        }
      } catch (error) {
        console.error("Error fetching billing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBilling();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!billing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <AlertCircle size={48} className="mb-4 text-red-500" />
        <p className="text-xl font-medium">ไม่พบข้อมูลใบวางบิล</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header (Hidden on Print) */}
      <div className="flex justify-between items-center mb-8 print:hidden">
        <div>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-gray-500 hover:text-gray-800 transition-colors mb-2"
          >
            <ChevronLeft size={20} className="mr-1" />
            <span className="text-sm font-medium">{billing.billingNo}</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">จัดการใบวางบิล</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => window.print()}
            className="flex items-center px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium text-sm shadow-sm"
          >
            <Printer size={18} className="mr-2" />
            พิมพ์
          </button>
          <button className="flex items-center px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium text-sm shadow-sm">
            <Download size={18} className="mr-2" />
            ดาวน์โหลด PDF
          </button>
          <button className="flex items-center px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium text-sm shadow-sm">
            <Mail size={18} className="mr-2" />
            ส่งอีเมล
          </button>
          <button className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold text-sm shadow-md shadow-blue-500/20">
            <Plus size={18} className="mr-2" />
            เพิ่มวางบิล
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Document (Left) */}
        <div className="xl:col-span-3 space-y-8">
          <div id="invoice-document" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden print:shadow-none print:border-none print:rounded-none">
            <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-10 print:p-0">
              
              {/* Document Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 relative">
                    <Image 
                      src="/logo/logo1.jpg" 
                      alt="YNK Transport Logo" 
                      fill 
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-base font-bold text-gray-800 uppercase">YUTANATAKIT TRANSPORT CO.,LTD.</h2>
                    <h3 className="text-blue-600 font-bold text-sm">บริษัท ยุทธนากิจขนส่ง จำกัด</h3>
                    <div className="text-[10px] text-gray-500 space-y-0.5 pt-2">
                      <p>88/9 หมู่ 4 ต.บางเพรียง อ.บางบ่อ จ.สมุทรปราการ 10560</p>
                      <p>เลขประจำตัวผู้เสียภาษี 0115565001234</p>
                      <p>โทร. 02-123-4567 | อีเมล info@ynktransport.com</p>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <h1 className="text-3xl font-bold text-gray-800">ใบวางบิล</h1>
                  <p className="text-gray-400 font-medium text-xs">(INVOICE)</p>
                  <p className="text-blue-600 font-bold text-xs pt-2">ต้นฉบับ</p>
                </div>
              </div>

              {/* Info Section */}
              <div className="grid grid-cols-2 gap-12 pt-8 border-t border-gray-100">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ลูกค้า</p>
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-gray-800">{billing.customer}</h3>
                    <div className="text-xs text-gray-500 space-y-1.5 leading-relaxed">
                      <div className="flex gap-4">
                        <span className="w-16 flex-shrink-0">ที่อยู่</span>
                        <p className="flex-1">{billing.customerAddress}</p>
                      </div>
                      <div className="flex gap-4">
                        <span className="w-16 flex-shrink-0">เลขผู้เสียภาษี</span>
                        <p>{billing.customerTaxId}</p>
                      </div>
                      <div className="flex gap-4">
                        <span className="w-16 flex-shrink-0">โทรศัพท์</span>
                        <p>{billing.customerPhone || "02-987-6543"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-400">เลขที่ใบวางบิล</span>
                    <span className="font-bold text-gray-800">{billing.billingNo}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-400">วันที่วางบิล</span>
                    <span className="text-gray-800 font-medium">{billing.date}</span>
                  </div>
                </div>
              </div>

              {/* Table Section */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">รายละเอียดเที่ยวรถ</h3>
                <table className="w-full text-[10px] text-left">
                  <thead>
                    <tr className="bg-gray-50 text-gray-400 uppercase tracking-wider">
                      <th className="px-4 py-3 font-bold w-12 text-center">ลำดับ</th>
                      <th className="px-4 py-3 font-bold">เลขที่เที่ยว</th>
                      <th className="px-4 py-3 font-bold">วันที่วิ่ง</th>
                      <th className="px-4 py-3 font-bold">ต้นทาง - ปลายทาง</th>
                      <th className="px-4 py-3 font-bold">ทะเบียนรถ</th>
                      <th className="px-4 py-3 font-bold text-right">ราคา/เที่ยว (บาท)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {billing.trips?.map((trip: any, index: number) => (
                      <tr key={index} className="border-b border-gray-50">
                        <td className="px-4 py-3 text-center text-gray-400">{index + 1}</td>
                        <td className="px-4 py-3 font-bold">{trip.tripNo}</td>
                        <td className="px-4 py-3">{trip.date}</td>
                        <td className="px-4 py-3">{trip.origin} - {trip.destination}</td>
                        <td className="px-4 py-3">{trip.plate}</td>
                        <td className="px-4 py-3 text-right font-bold">{trip.price?.toLocaleString('th-TH', {minimumFractionDigits: 2})}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Signature Section */}
              <div className="grid grid-cols-2 gap-12 pt-16">
                <div className="space-y-1 text-[10px]">
                  <div className="flex gap-4">
                    <span className="text-gray-400 w-16">ผู้วางบิล</span>
                    <span className="text-gray-800 font-bold">Admin</span>
                  </div>
                </div>
                <div className="text-center space-y-4">
                  <p className="text-[10px] font-bold text-gray-800">ผู้อนุมัติ</p>
                  <div className="pt-6 w-full italic text-gray-300">
                    ....................................................................
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Sidebar Summary (Right) */}
        <div className="space-y-6 print:hidden">
          {/* สรุปยอดวางบิล */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-sm font-bold text-gray-800">สรุปยอดวางบิล</h3>
            <div className="space-y-4 text-xs font-medium text-gray-500">
              <div className="flex justify-between">
                <span>รวมค่าเที่ยว</span>
                <span className="text-gray-800 font-bold">{billing.subTotal?.toLocaleString('th-TH', {minimumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between">
                <span>ส่วนลด</span>
                <span className="text-gray-800 font-bold">{billing.discount?.toLocaleString('th-TH', {minimumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-50">
                <span>ยอดก่อนภาษี</span>
                <span className="text-gray-800 font-bold">{billing.preTaxAmount?.toLocaleString('th-TH', {minimumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between">
                <span>ภาษีมูลค่าเพิ่ม 7%</span>
                <span className="text-gray-800 font-bold">{billing.taxAmount?.toLocaleString('th-TH', {minimumFractionDigits: 2})}</span>
              </div>
              <div className="pt-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-800 font-bold">ยอดรวมทั้งสิ้น</span>
                  <div className="text-right">
                    <div className="text-2xl font-black text-blue-600 leading-none">{billing.totalAmount?.toLocaleString('th-TH', {minimumFractionDigits: 2})}</div>
                    <span className="text-xs font-bold text-blue-600 uppercase">บาท</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* สถานะวางบิล */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-gray-800">สถานะวางบิล</h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${billing.status === 'ชำระเงินแล้ว' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                {billing.status}
              </span>
            </div>
            <div className="space-y-4 text-xs font-medium">
              <div className="flex justify-between text-gray-500">
                <span>วันที่ชำระเงิน</span>
                <span className="text-gray-800">-</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>ยอดชำระแล้ว</span>
                <span className="text-gray-800">0.00</span>
              </div>
              <div className="flex justify-between text-gray-500 pt-4 border-t border-gray-50">
                <span>ยอดคงเหลือ</span>
                <span className="text-red-500 font-bold text-base">{billing.totalAmount?.toLocaleString('th-TH', {minimumFractionDigits: 2})}</span>
              </div>
            </div>
          </div>

          {/* หมายเหตุ */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-sm font-bold text-gray-800">หมายเหตุ</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              {billing.note || "ขอความกรุณาชำระเงินภายในวันที่ครบกำหนด ขอบคุณที่ใช้บริการค่ะ"}
            </p>
          </div>

          {/* ประวัติการชำระเงิน */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-sm font-bold text-gray-800">ประวัติการชำระเงิน</h3>
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                <Receipt size={24} />
              </div>
              <p className="text-[10px] text-gray-400">ยังไม่มีประวัติการชำระเงิน</p>
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS for Print */}
      <style jsx global>{`
        @media print {
          /* 1. Hide everything by default */
          body * {
            visibility: hidden !important;
          }

          /* 2. Show ONLY the invoice document and its children */
          #invoice-document, #invoice-document * {
            visibility: visible !important;
          }

          /* 3. Position the isolated document at top-left */
          #invoice-document {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }

          /* 4. Reset layout container margins (from DashboardLayout) */
          div.flex.flex-col.min-h-screen {
            margin-left: 0 !important;
            padding-left: 0 !important;
          }

          /* 5. Force background colors for print */
          .bg-gray-50 {
            background-color: #f9fafb !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .text-blue-600 {
            color: #2563eb !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          /* Page settings */
          @page {
            size: A4;
            margin: 1.5cm;
          }

          /* Images visibility */
          img {
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
