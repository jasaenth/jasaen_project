"use client";

import DashboardCard from "./DashboardCard";

const BookingsChart = () => {
  return (
    <DashboardCard title="Bookings Overview">
      <div className="h-[350px] flex items-center justify-center text-textmuted">
        Booking chart here
      </div>
    </DashboardCard>
  );
};

export default BookingsChart;