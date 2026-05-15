import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Truck,
  MapPin,
  Receipt,
  FileText,
  BarChart2,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "ลูกค้า", icon: Users, href: "/customers" },
  { name: "รถขนส่ง", icon: Truck, href: "/trucks" },
  { name: "เที่ยวรถ", icon: MapPin, href: "/trips" },
  { name: "รายจ่าย", icon: Receipt, href: "/expenses" },
  { name: "วางบิล", icon: FileText, href: "/billing" },
  { name: "รายงาน", icon: BarChart2, href: "/reports" },
  { name: "ตั้งค่า", icon: Settings, href: "/settings" },
];

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();

  return (
    <aside className={`w-64 bg-white border-r border-gray-100 flex flex-col h-screen fixed left-0 top-0 transition-transform duration-300 z-20 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-50 flex items-center justify-center h-[120px]">
        <Image 
          src="/logo/logo1.jpg" 
          alt="YNK Transport Logo" 
          width={200} 
          height={80} 
          className="object-contain h-full w-auto mix-blend-multiply"
          priority
        />
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={20} className={isActive ? "text-blue-600" : "text-gray-400"} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Info */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center relative overflow-hidden mb-3">
           <Truck size={32} className="text-blue-500 mb-2" />
           {/* Simple map background representation */}
           <div className="absolute bottom-0 left-0 right-0 h-8 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]"></div>
        </div>
        <h4 className="font-bold text-gray-800 text-sm">YNK Transport</h4>
        <p className="text-xs text-gray-500 mt-1">ระบบบริหารจัดการงานขนส่ง</p>
        <p className="text-xs text-gray-400 mt-2">เวอร์ชัน 1.0.0</p>
      </div>
    </aside>
  );
}
