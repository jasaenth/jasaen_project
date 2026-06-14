import StatsCards from "@/components/admin/dashboard/StatsCards";
import RecentBookingsTable from "@/components/admin/dashboard/RecentBookingsTable";
import TodaysHouse from "@/components/admin/dashboard/TodaysHouse";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      {/* Heading */}
      <div>
        <h1 className="font-display text-2xl text-maroon">
          Dashboard
        </h1>
      </div>

      <StatsCards />

      <div className="grid xl:grid-cols-[2fr_1fr] gap-8">
        <RecentBookingsTable />

        <TodaysHouse />
      </div>
    </div>
  );
}