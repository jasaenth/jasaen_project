"use client";

import DistributionChannels from "./DistributionChannels";
import RecentActivity from "./RecentActivity";

export default function OverviewPanel() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500 text-sm">
            Total Reservations
          </p>

          <h3 className="text-3xl font-bold mt-2">
            648
          </h3>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500 text-sm">
            Occupancy Rate
          </p>

          <h3 className="text-3xl font-bold mt-2">
            82%
          </h3>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500 text-sm">
            Revenue
          </p>

          <h3 className="text-3xl font-bold mt-2">
            ฿485,000
          </h3>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500 text-sm">
            Guests
          </p>

          <h3 className="text-3xl font-bold mt-2">
            324
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <DistributionChannels />
        </div>

        <RecentActivity />
      </div>
    </div>
  );
}