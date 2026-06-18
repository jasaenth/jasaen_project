"use client";

import { useState } from "react";

import CloudbedsHeader from "@/components/admin/cloudbeds/CloudbedsHeader";
import CloudbedsHero from "@/components/admin/cloudbeds/CloudbedsHero";
import CloudbedsTabs from "@/components/admin/cloudbeds/CloudbedsTabs";

import OverviewPanel from "@/components/admin/cloudbeds/overview/OverviewPanel";

import GuestsPanel from "@/components/admin/cloudbeds/guests/GuestsPanel";
import RoomsPanel from "@/components/admin/cloudbeds/rooms/RoomsPanel";
import PaymentsPanel from "@/components/admin/cloudbeds/payments/PaymentsPanel";
import RevenuePanel from "@/components/admin/cloudbeds/revenue/RevenuePanel";
import ReportsPanel from "@/components/admin/cloudbeds/reports/ReportsPanel";
import NotificationsPanel from "@/components/admin/cloudbeds/notifications/NotificationsPanel";
import { ReservationsPanel } from "@/components/admin/cloudbeds/reservations/ReservationsPanel";

export default function CloudbedsPage() {
  const [activeTab, setActiveTab] =
    useState("overview");

  return (
    <div className="space-y-6 p-6">
      <CloudbedsHeader />

      <CloudbedsHero />

      <CloudbedsTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "overview" && (
        <OverviewPanel />
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

      {activeTab === "notifications" && (
        <NotificationsPanel />
      )}
    </div>
  );
}