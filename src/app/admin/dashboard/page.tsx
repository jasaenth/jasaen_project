import BookingsChart from "@/components/admin/dashboard/BookingsChart";
import BottomStats from "@/components/admin/dashboard/BottomStats";
import OccupancyChart from "@/components/admin/dashboard/OccupancyChart";
import RecentBookingsTable from "@/components/admin/dashboard/RecentBookingsTable";
import RevenueChart from "@/components/admin/dashboard/RevenueChart";
import StatsCards from "@/components/admin/dashboard/StatsCards";


export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <BookingsChart />
        </div>

        <OccupancyChart />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentBookingsTable />
        </div>

        <RevenueChart />
      </div>

      <BottomStats />
    </div>
  );
}