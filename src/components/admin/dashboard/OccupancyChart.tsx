import DashboardCard from "./DashboardCard";

const OccupancyChart = () => {
  return (
    <DashboardCard title="Room Occupancy">
      <div className="h-[350px] flex items-center justify-center">
        Occupancy chart
      </div>
    </DashboardCard>
  );
};

export default OccupancyChart;