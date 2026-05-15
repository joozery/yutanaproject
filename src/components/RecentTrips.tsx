const trips = [
  { id: "TRP-2406-156", date: "20/06/2024", customer: "บริษัท ABC จำกัด", pickup: "สมุทรสาคร", dropoff: "ชลบุรี", plate: "70-1234", price: "25,000", status: "เสร็จสิ้น" },
  { id: "TRP-2406-155", date: "20/05/2024", customer: "บริษัท DEF จำกัด", pickup: "กรุงเทพฯ", dropoff: "ระยอง", plate: "70-5678", price: "18,000", status: "กำลังวิ่งงาน" },
  { id: "TRP-2406-154", date: "19/06/2024", customer: "บริษัท GHI จำกัด", pickup: "บางปะอิน", dropoff: "นครราชสีมา", plate: "70-9012", price: "22,000", status: "เสร็จสิ้น" },
  { id: "TRP-2406-153", date: "19/06/2024", customer: "บริษัท JKL จำกัด", pickup: "สมุทรปราการ", dropoff: "ชลบุรี", plate: "70-3456", price: "16,000", status: "เสร็จสิ้น" },
  { id: "TRP-2406-152", date: "19/06/2024", customer: "บริษัท MNO จำกัด", pickup: "กรุงเทพฯ", dropoff: "จันทบุรี", plate: "70-7890", price: "20,000", status: "ยกเลิก" },
];

export default function RecentTrips() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "เสร็จสิ้น":
        return <span className="px-2.5 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">เสร็จสิ้น</span>;
      case "กำลังวิ่งงาน":
        return <span className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">กำลังวิ่งงาน</span>;
      case "ยกเลิก":
        return <span className="px-2.5 py-1 text-xs font-medium bg-red-50 text-red-600 rounded-full">ยกเลิก</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-medium bg-gray-50 text-gray-600 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">เที่ยวรถล่าสุด</h3>
        <button className="text-sm text-blue-600 font-medium hover:text-blue-700">ดูทั้งหมด</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 bg-gray-50 uppercase rounded-xl">
            <tr>
              <th className="px-4 py-3 rounded-l-lg font-medium">เลขเที่ยว</th>
              <th className="px-4 py-3 font-medium">วันที่</th>
              <th className="px-4 py-3 font-medium">ลูกค้า</th>
              <th className="px-4 py-3 font-medium">จุดรับสินค้า</th>
              <th className="px-4 py-3 font-medium">จุดส่งสินค้า</th>
              <th className="px-4 py-3 font-medium">ทะเบียนรถ</th>
              <th className="px-4 py-3 font-medium text-right">ราคา</th>
              <th className="px-4 py-3 rounded-r-lg font-medium text-center">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip, index) => (
              <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-4 font-medium text-blue-600">{trip.id}</td>
                <td className="px-4 py-4 text-gray-600">{trip.date}</td>
                <td className="px-4 py-4 text-gray-800">{trip.customer}</td>
                <td className="px-4 py-4 text-gray-600">{trip.pickup}</td>
                <td className="px-4 py-4 text-gray-600">{trip.dropoff}</td>
                <td className="px-4 py-4 text-gray-800">{trip.plate}</td>
                <td className="px-4 py-4 text-gray-800 text-right font-medium">{trip.price}</td>
                <td className="px-4 py-4 text-center">{getStatusBadge(trip.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
