"use client";

import SectionHead from "../SectionHead";
import RevenueCards from "./RevenueCards";
import RevenueChart from "./RevenueChart";
import RevenueTable from "./RevenueTable";

export default function RevenuePanel() {
  return (
    <div className="space-y-6">
      <SectionHead
        title="Revenue Analytics"
        subtitle="Track hotel revenue, ADR, RevPAR and performance metrics."
      />

      <RevenueCards />

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <h3 className="text-lg font-bold mb-4">
            Revenue Summary
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">
                Average Daily Rate
              </p>

              <h4 className="text-2xl font-bold">
                ฿3,250
              </h4>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                RevPAR
              </p>

              <h4 className="text-2xl font-bold">
                ฿2,665
              </h4>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Occupancy Rate
              </p>

              <h4 className="text-2xl font-bold">
                82%
              </h4>
            </div>
          </div>
        </div>
      </div>

      <RevenueTable />
    </div>
  );
}