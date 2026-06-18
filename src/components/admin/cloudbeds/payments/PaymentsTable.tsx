"use client";

const payments = [
  {
    id: "PAY-001",
    guest: "John Smith",
    amount: "฿8,500",
    method: "Credit Card",
    date: "2025-08-01",
    status: "Paid",
  },
  {
    id: "PAY-002",
    guest: "Emily Johnson",
    amount: "฿12,800",
    method: "Stripe",
    date: "2025-08-02",
    status: "Paid",
  },
  {
    id: "PAY-003",
    guest: "David Brown",
    amount: "฿4,900",
    method: "Cash",
    date: "2025-08-03",
    status: "Pending",
  },
  {
    id: "PAY-004",
    guest: "Sophia Lee",
    amount: "฿18,200",
    method: "Bank Transfer",
    date: "2025-08-04",
    status: "Failed",
  },
];

export default function PaymentsTable() {
  return (
    <div className="bg-white border rounded-3xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">
                Payment ID
              </th>

              <th className="px-6 py-4 text-left">
                Guest
              </th>

              <th className="px-6 py-4 text-left">
                Amount
              </th>

              <th className="px-6 py-4 text-left">
                Method
              </th>

              <th className="px-6 py-4 text-left">
                Date
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-t"
              >
                <td className="px-6 py-4 font-semibold">
                  {payment.id}
                </td>

                <td className="px-6 py-4">
                  {payment.guest}
                </td>

                <td className="px-6 py-4 font-semibold">
                  {payment.amount}
                </td>

                <td className="px-6 py-4">
                  {payment.method}
                </td>

                <td className="px-6 py-4">
                  {payment.date}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      payment.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : payment.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}