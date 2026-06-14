import { CalendarDays, DollarSign, BedDouble, Users } from "lucide-react";

const stats = [
  {
    title: "ACTIVE BOOKINGS",
    value: "6",
    subtitle: "+2 pending",
    icon: CalendarDays,
  },
  {
    title: "REVENUE",
    value: "$12,860",
    subtitle: "All time",
    icon: DollarSign,
  },
  {
    title: "OCCUPANCY",
    value: "10%",
    subtitle: "3 room types",
    icon: BedDouble,
  },
  {
    title: "TEAM",
    value: "5",
    subtitle: "6 amenities live",
    icon: Users,
  },
];

export default function StatsCards() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              bg-white
              rounded-4xl
              border
              border-borderlight
              p-6
              shadow-sm
            "
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-[#f5ecef] flex items-center justify-center">
                <Icon size={22} className="text-maroon" />
              </div>

              <span className="text-green-600 text-sm font-medium">
                {item.subtitle}
              </span>
            </div>

            <h3 className="text-2xl font-playfair mt-4">{item.value}</h3>

            <p className="mt-2 text-xs  text-muted-foreground">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
