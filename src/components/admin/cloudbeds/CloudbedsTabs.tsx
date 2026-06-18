"use client";

import {
  Cloud,
  Calendar,
  Users,
  BedDouble,
  CreditCard,
  TrendingUp,
  FileBarChart,
  Bell,
} from "lucide-react";

const tabs = [
  {
    id: "overview",
    label: "Overview",
    icon: Cloud,
  },
  {
    id: "reservations",
    label: "Reservations",
    icon: Calendar,
  },
  {
    id: "guests",
    label: "Guests",
    icon: Users,
  },
  {
    id: "rooms",
    label: "Rooms",
    icon: BedDouble,
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
  },
  {
    id: "revenue",
    label: "Revenue",
    icon: TrendingUp,
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileBarChart,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
];

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function CloudbedsTabs({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-1 border-b border-border">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() =>
              setActiveTab(tab.id)
            }
            className={`
              inline-flex
              items-center
              gap-2
              px-4
              py-2.5
              text-sm
              rounded-t-lg
              whitespace-nowrap
              border-b-2
              transition
              ${
                activeTab === tab.id
                  ? "border-maroon text-maroon font-medium bg-maroon/5"
                  : "border-transparent text-muted-foreground hover:text-charcoal"
              }
            `}
          >
            <Icon size={15} />

            {tab.label}
          </button>
        );
      })}
    </div>
  );
}