import {
  Users,
  BedDouble,
  ImageIcon,
  Star,
} from "lucide-react";
import DashboardCard from "./DashboardCard";

const items = [
  { title: "New Users", value: "3", icon: Users },
  { title: "New Rooms Added", value: "2", icon: BedDouble },
  { title: "New Images Uploaded", value: "12", icon: ImageIcon },
  { title: "Active Amenities", value: "7", icon: Star },
];

const BottomStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <DashboardCard key={item.title}>
            <div className="flex items-center gap-4">
              <Icon size={26} />
              <div>
                <p>{item.title}</p>
                <h3 className="text-2xl font-bold">{item.value}</h3>
              </div>
            </div>
          </DashboardCard>
        );
      })}
    </div>
  );
};

export default BottomStats;