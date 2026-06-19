"use client";

import { useState } from "react";
import CloudbedsTabs from "@/components/admin/cloudbeds/CloudbedsTabs";
import GuestsPanel from "@/components/admin/cloudbeds/guests/GuestsPanel";
import RoomsPanel from "@/components/admin/cloudbeds/rooms/RoomsPanel";
import PaymentsPanel from "@/components/admin/cloudbeds/payments/PaymentsPanel";
import RevenuePanel from "@/components/admin/cloudbeds/revenue/RevenuePanel";
import ReportsPanel from "@/components/admin/cloudbeds/reports/ReportsPanel";
import ReservationsPanel from "@/components/admin/cloudbeds/reservations/ReservationsPanel";
import Dashboard from "@/components/admin/cloudbeds/overview/OverviewPanel";

export default function CloudbedsPage() {
  const [activeTab, setActiveTab] =
    useState("dashboard");

  return (
    <div className="space-y-6 ">
      
      <CloudbedsTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "dashboard" && (
        <Dashboard />
      )}

      {activeTab === "reservations" && (
        <ReservationsPanel />
      )}

      {activeTab === "guests" && (
        <GuestsPanel />
      )}

      {activeTab === "rooms" && (
        <RoomsPanel />
      )}

      {activeTab === "payments" && (
        <PaymentsPanel />
      )}

      {activeTab === "revenue" && (
        <RevenuePanel />
      )}

      {activeTab === "reports" && (
        <ReportsPanel />
      )}
    </div>
  );
}