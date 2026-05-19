import {
  CalendarDays,
  IndianRupee,
  BedDouble,
  PieChart,
} from "lucide-react";
import DashboardCard from "./DashboardCard";

const stats = [
  {
    title: "Total Bookings",
    value: "125",
    icon: CalendarDays,
    color: "text-purple-600",
  },
  {
    title: "Total Revenue",
    value: "₹ 2,45,000",
    icon: IndianRupee,
    color: "text-green-600",
  },
  {
    title: "Total Rooms",
    value: "40",
    icon: BedDouble,
    color: "text-blue-600",
  },
  {
    title: "Occupancy Rate",
    value: "68%",
    icon: PieChart,
    color: "text-orange-600",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <DashboardCard key={stat.title}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-bgmain flex items-center justify-center">
                <Icon className={stat.color} size={28} />
              </div>

              <div>
                <p className="text-sm text-textmuted">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </div>
          </DashboardCard>
        );
      })}
    </div>
  );
};

export default StatsCards;