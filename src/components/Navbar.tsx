import { Menu, Search, Bell, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const pathname = usePathname();
  let title = "Dashboard";
  if (pathname === '/billing') {
    title = "รายการใบวางบิล";
  } else if (pathname === '/billing/create') {
    title = "สร้างใบวางบิล";
  } else if (pathname.startsWith('/billing/')) {
    title = `ใบวางบิล / ${pathname.split('/').pop()}`;
  } else if (pathname === '/customers') {
    title = "ลูกค้า";
  } else if (pathname === '/trucks') {
    title = "รถขนส่ง";
  } else if (pathname === '/trips') {
    title = "จัดการเที่ยวรถ";
  }

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg mr-4 transition-colors">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center space-x-6">
        {/* Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="ค้นหา..."
            className="w-64 pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          />
          <Search
            size={18}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
          <Bell size={22} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-3 cursor-pointer p-1.5 pr-3 hover:bg-gray-50 rounded-full transition-colors border border-transparent hover:border-gray-100">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700">Admin</p>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}
