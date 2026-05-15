import StatCards from "@/components/StatCards";
import ChartsSection from "@/components/ChartsSection";
import RecentTrips from "@/components/RecentTrips";
import Notifications from "@/components/Notifications";
import QuickActions from "@/components/QuickActions";

export default function Home() {
  return (
    <div className="w-full">
      <StatCards />
      
      <ChartsSection />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentTrips />
        <div className="lg:col-span-1">
          <Notifications />
        </div>
      </div>
      
      <QuickActions />
    </div>
  );
}
