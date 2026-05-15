"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const lineData = [
  { name: "ม.ค.", income: 900000, expense: 600000, profit: 300000 },
  { name: "ก.พ.", income: 1100000, expense: 700000, profit: 400000 },
  { name: "มี.ค.", income: 1000000, expense: 600000, profit: 400000 },
  { name: "เม.ย.", income: 1100000, expense: 650000, profit: 450000 },
  { name: "พ.ค.", income: 1300000, expense: 800000, profit: 500000 },
  { name: "มิ.ย.", income: 1100000, expense: 600000, profit: 500000 },
];

const pieData = [
  { name: "ค่าน้ำมัน", value: 285600, color: "#3B82F6", percentage: 42 },
  { name: "ค่าแรง", value: 149600, color: "#8B5CF6", percentage: 22 },
  { name: "ค่าทางด่วน", value: 102000, color: "#F59E0B", percentage: 15 },
  { name: "ค่าซ่อมบำรุง", value: 68000, color: "#10B981", percentage: 10 },
  { name: "ค่าใช้จ่ายอื่นๆ", value: 74800, color: "#9CA3AF", percentage: 11 },
];

const topCustomers = [
  { rank: 1, name: "บริษัท ABC จำกัด", trips: 18, amount: "540,000" },
  { rank: 2, name: "บริษัท DEF จำกัด", trips: 15, amount: "420,000" },
  { rank: 3, name: "บริษัท GHI จำกัด", trips: 12, amount: "360,000" },
  { rank: 4, name: "บริษัท JKL จำกัด", trips: 9, amount: "270,000" },
  { rank: 5, name: "บริษัท MNO จำกัด", trips: 6, amount: "180,000" },
];

const formatYAxis = (tickItem: number) => {
  return `${tickItem / 1000000}M`;
};

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      {/* Line Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 xl:col-span-2">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">รายรับ - รายจ่าย ย้อนหลัง 6 เดือน</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>รายรับ</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-400 mr-2"></span>รายจ่าย</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-400 mr-2"></span>กำไร</div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={formatYAxis} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                formatter={(value: any) => new Intl.NumberFormat('th-TH').format(value)}
              />
              <Line type="monotone" dataKey="income" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="expense" stroke="#F87171" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="profit" stroke="#34D399" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col xl:col-span-1">
        <h3 className="text-lg font-bold text-gray-800 mb-2">สัดส่วนรายจ่าย</h3>
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => new Intl.NumberFormat('th-TH').format(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-sm text-gray-500">รวม</span>
            <span className="text-lg font-bold text-gray-800">680,000</span>
            <span className="text-xs text-gray-500">บาท</span>
          </div>
        </div>
        <div className="mt-2 space-y-2">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center w-1/2">
                <span className="w-2.5 h-2.5 rounded-sm mr-2" style={{ backgroundColor: item.color }}></span>
                <span className="text-gray-600 truncate">{item.name}</span>
              </div>
              <span className="text-gray-800 font-medium w-1/4 text-right">{new Intl.NumberFormat('th-TH').format(item.value)}</span>
              <span className="text-gray-500 font-semibold w-1/4 text-right">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col xl:col-span-1">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">ลูกค้าใช้บริการสูงสุด</h3>
        </div>
        <div className="space-y-4 flex-1">
          {topCustomers.map((customer) => (
            <div key={customer.rank} className="flex items-center justify-between">
              <div className="flex items-center space-x-3 w-1/2">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                  {customer.rank}
                </div>
                <span className="text-sm font-medium text-gray-700 truncate">{customer.name}</span>
              </div>
              <div className="flex justify-between w-1/2 text-xs">
                <span className="text-gray-500">{customer.trips} เที่ยว</span>
                <span className="font-semibold text-gray-800">{customer.amount} บาท</span>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors text-center">
          ดูทั้งหมด
        </button>
      </div>
    </div>
  );
}
