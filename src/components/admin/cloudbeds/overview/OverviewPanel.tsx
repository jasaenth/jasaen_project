"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { getDashboard } from "@/lib/api/cloudbeds";

interface DashboardData {
  roomsOccupied: number;
  percentageOccupied: number;
  arrivals: number;
  departures: number;
  inHouse: number;
  guestsInHouse: number;
  bookings: number;
  stayovers: number;
  cancellations: number;
  capacity: number;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0],);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, [selectedDate]);

  async function loadDashboard() {
    try {
      setLoading(true);

      const response = await getDashboard(selectedDate);

      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">Loading Dashboard...</div>
    );
  }

  if (!data) {
    return <div className="flex justify-center py-20">No Data Found</div>;
  }

  const occupancyChart = [
    {
      name: "Occupied",
      value: data.roomsOccupied,
    },
    {
      name: "Available",
      value: data.capacity - data.roomsOccupied,
    },
  ];

  const occupancyHealth =
    data.percentageOccupied >= 70
      ? "Excellent"
      : data.percentageOccupied >= 40
        ? "Moderate"
        : "Low";

  const healthColor =
    data.percentageOccupied >= 70
      ? "bg-green-100 text-green-700"
      : data.percentageOccupied >= 40
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold"> Live Cloudbeds Operations Dashboard</h1>
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() =>
              setSelectedDate(new Date().toISOString().split("T")[0])
            }
            className="
              px-4 py-2
              rounded-xl
              bg-black
              text-white
              text-sm
            "
          >
            Today
          </button>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="
              border
              rounded-xl
              px-4
              py-2
            "
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card
          title="Occupied Rooms"
          value={data.roomsOccupied}
          subtitle={`${data.capacity} Total Capacity`}
        />

        <Card
          title="Occupancy Rate"
          value={`${data.percentageOccupied}%`}
          subtitle={occupancyHealth}
          badgeClass={healthColor}
        />

        <Card
          title="Guests In House"
          value={data.guestsInHouse}
          subtitle={`${data.inHouse} Active Stays`}
        />

        <Card
          title="Bookings"
          value={data.bookings}
          subtitle={`${data.arrivals} Arrivals Today`}
        />
      </div>

      {/* Occupancy */}
      <div className="grid xl:grid-cols-3 gap-6">
        <div className="bg-white border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Occupancy Overview</h3>

            <span
              className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${healthColor}
              `}
            >
              {occupancyHealth}
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={occupancyChart}
                  innerRadius={65}
                  outerRadius={95}
                  dataKey="value"
                >
                  <Cell fill="#2563EB" />
                  <Cell fill="#E5E7EB" />
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold font-playfair">{data.percentageOccupied}%</h3>

            <p className="text-gray-500">Current Occupancy</p>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Occupancy</span>
              <span>
                {data.roomsOccupied}/{data.capacity}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{
                  width: `${data.percentageOccupied}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Operations */}
        <div className="xl:col-span-2 bg-white border rounded-3xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-6">Daily Operations</h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <OperationCard title="Arrivals" value={data.arrivals} />

            <OperationCard title="Departures" value={data.departures} />

            <OperationCard title="Stayovers" value={data.stayovers} />

            <OperationCard title="Bookings" value={data.bookings} />

            <OperationCard title="Cancelled" value={data.cancellations} />
          </div>

          <div className="mt-8 border-t pt-6">
            <h4 className="font-semibold mb-4">Property Insights</h4>

            <div className="grid md:grid-cols-2 gap-4">
              <Insight>
                {data.roomsOccupied} of {data.capacity} rooms are occupied.
              </Insight>

              <Insight>{data.arrivals} arrivals expected today.</Insight>

              <Insight>{data.guestsInHouse} guests currently in-house.</Insight>

              <Insight>{data.cancellations} cancellation(s) recorded.</Insight>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, subtitle, badgeClass }: any) {
  return (
    <div className="bg-white rounded-3xl border p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>

      <h2 className="text-3xl font-bold mt-3 font-playfair">{value}</h2>

      <div className="mt-3">
        <span
          className={`text-xs px-2 py-1 rounded-full ${badgeClass || "bg-gray-100"}`}
        >
          {subtitle}
        </span>
      </div>
    </div>
  );
}

function OperationCard({ title, value }: any) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4">
      <p className="text-sm text-gray-500 ">{title}</p>

      <h4 className="text-2xl mt-1 font-playfair">{value}</h4>
    </div>
  );
}

function Insight({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4 text-gray-700">• {children}</div>
  );
}
