"use client";

import SectionHead from "../SectionHead";
import ReportCard from "./ReportCard";

const reports = [
  {
    title: "Revenue Report",
    description:
      "Monthly revenue performance and financial analytics.",
    lastGenerated: "Today, 09:15 AM",
  },
  {
    title: "Occupancy Report",
    description:
      "Room occupancy, availability and utilization insights.",
    lastGenerated: "Today, 08:30 AM",
  },
  {
    title: "Guest Report",
    description:
      "Guest demographics, repeat guests and booking behavior.",
    lastGenerated: "Yesterday",
  },
  {
    title: "Payments Report",
    description:
      "Payment transactions, refunds and failed payments.",
    lastGenerated: "Yesterday",
  },
  {
    title: "Channel Performance",
    description:
      "OTA, direct bookings and channel comparison analytics.",
    lastGenerated: "2 days ago",
  },
  {
    title: "Forecast Report",
    description:
      "Upcoming reservations and revenue forecasting.",
    lastGenerated: "2 days ago",
  },
];

export default function ReportsPanel() {
  return (
    <div className="space-y-6">
      <SectionHead
        title="Reports & Analytics"
        subtitle="Generate and export hotel business reports."
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reports.map((report) => (
          <ReportCard
            key={report.title}
            title={report.title}
            description={report.description}
            lastGenerated={report.lastGenerated}
          />
        ))}
      </div>
    </div>
  );
}