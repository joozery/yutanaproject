import { ShieldAlert, FileWarning, DollarSign, Wrench } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "ประกันรถ 70-1234 ใกล้หมดอายุ",
    subtitle: "หมดอายุวันที่ 30/06/2024",
    icon: ShieldAlert,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
    badge: "3 วัน",
    badgeColor: "text-red-600",
  },
  {
    id: 2,
    title: "ภาษีรถ 70-5678 ใกล้หมดอายุ",
    subtitle: "หมดอายุวันที่ 15/07/2024",
    icon: FileWarning,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    badge: "18 วัน",
    badgeColor: "text-orange-600",
  },
  {
    id: 3,
    title: "ลูกค้า บริษัท XYZ จำกัด ค้างชำระ",
    subtitle: "ยอดค้างชำระ 125,000 บาท",
    icon: DollarSign,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    badge: "ดูรายละเอียด",
    badgeColor: "text-blue-600",
    isButton: true,
  },
  {
    id: 4,
    title: "รถ 70-9012 ถึงระยะเช็คระยะ",
    subtitle: "ระยะทางที่ใช้งาน 95,000 กม.",
    icon: Wrench,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
    badge: "5,000 กม.",
    badgeColor: "text-purple-600",
  },
];

export default function Notifications() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">แจ้งเตือน</h3>
      </div>
      <div className="space-y-4 flex-1">
        {notifications.map((notif) => {
          const Icon = notif.icon;
          return (
            <div key={notif.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-50 hover:border-gray-100 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`p-2.5 rounded-xl ${notif.iconBg} ${notif.iconColor}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">{notif.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{notif.subtitle}</p>
                </div>
              </div>
              <div>
                {notif.isButton ? (
                  <button className={`text-xs px-3 py-1.5 rounded-lg border border-blue-100 bg-blue-50/50 font-medium ${notif.badgeColor} hover:bg-blue-50 transition-colors`}>
                    {notif.badge}
                  </button>
                ) : (
                  <span className={`text-xs font-semibold ${notif.badgeColor}`}>
                    {notif.badge}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button className="mt-4 w-full py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors text-center border border-transparent hover:border-blue-100">
        ดูทั้งหมด
      </button>
    </div>
  );
}
