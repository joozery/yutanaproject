import { Wallet, FileText, TrendingUp, Truck, Users, ArrowUpRight, ArrowRight } from "lucide-react";

const stats = [
  {
    title: "รายรับเดือนนี้",
    value: "1,250,000",
    unit: "บาท",
    change: "+ 12.5%",
    trend: "up",
    icon: Wallet,
    color: "blue",
  },
  {
    title: "รายจ่ายเดือนนี้",
    value: "680,000",
    unit: "บาท",
    change: "+ 8.3%",
    trend: "up",
    icon: FileText,
    color: "red",
  },
  {
    title: "กำไรสุทธิ",
    value: "570,000",
    unit: "บาท",
    change: "+ 18.7%",
    trend: "up",
    icon: TrendingUp,
    color: "green",
  },
  {
    title: "เที่ยวรถทั้งหมด",
    value: "156",
    unit: "เที่ยว",
    change: "+ 15.2%",
    trend: "up",
    icon: Truck,
    color: "purple",
  },
  {
    title: "รถวิ่งงานวันนี้",
    value: "28",
    unit: "คัน",
    change: "--",
    trend: "neutral",
    icon: Truck,
    color: "orange",
  },
];

export default function StatCards() {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-500",
    red: "bg-red-50 text-red-500",
    green: "bg-green-50 text-green-500",
    purple: "bg-purple-50 text-purple-500",
    orange: "bg-orange-50 text-orange-500",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${colorMap[stat.color]}`}>
                <Icon size={24} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
              <div className="flex items-baseline space-x-1">
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <span className="text-sm text-gray-500">{stat.unit}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              {stat.trend === "up" ? (
                <div className="flex items-center text-green-500 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                  <ArrowUpRight size={16} className="mr-1" />
                  {stat.change}
                </div>
              ) : (
                <div className="flex items-center text-gray-400 font-medium">
                  <ArrowRight size={16} className="mr-1" />
                  เทียบกับเมื่อวาน
                </div>
              )}
              {stat.trend === "up" && <span className="text-gray-400 ml-2 text-xs">จากเดือนที่แล้ว</span>}
            </div>
          </div>
        );
      })}

      {/* Top Customer Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-500">
            <Users size={24} />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">ลูกค้าหลัก</p>
          <h3 className="text-lg font-bold text-gray-800">บริษัท ABC จำกัด</h3>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          ใช้บริการ <span className="font-semibold text-gray-800">18 เที่ยว</span>
        </div>
      </div>
    </div>
  );
}
