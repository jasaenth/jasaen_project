"use client";

import SectionHead from "../SectionHead";
import PaymentStats from "./PaymentStats";
import PaymentsTable from "./PaymentsTable";

export default function PaymentsPanel() {
  return (
    <div className="space-y-6">
      <SectionHead
        title="Payments"
        subtitle="Track hotel transactions, payment methods and revenue collection."
      />

      <PaymentStats />

      <PaymentsTable />
    </div>
  );
}