"use client";

const reservations = [
  {
    id: "RSV-001",
    guest: "John Smith",
    room: "Deluxe Double",
    checkIn: "2025-08-01",
    checkOut: "2025-08-04",
    amount: "฿8,500",
    status: "Confirmed",
  },
  {
    id: "RSV-002",
    guest: "Emily Johnson",
    room: "Executive Suite",
    checkIn: "2025-08-05",
    checkOut: "2025-08-08",
    amount: "฿15,200",
    status: "Pending",
  },
  {
    id: "RSV-003",
    guest: "David Brown",
    room: "Standard Twin",
    checkIn: "2025-08-07",
    checkOut: "2025-08-09",
    amount: "฿5,900",
    status: "Confirmed",
  },
];

export default function ReservationsTable() {
  return (
    <div className="bg-white border rounded-3xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">
                Reservation ID
              </th>

              <th className="px-6 py-4 text-left">
                Guest
              </th>

              <th className="px-6 py-4 text-left">
                Room
              </th>

              <th className="px-6 py-4 text-left">
                Check In
              </th>

              <th className="px-6 py-4 text-left">
                Check Out
              </th>

              <th className="px-6 py-4 text-left">
                Amount
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((item) => (
              <tr
                key={item.id}
                className="border-t"
              >
                <td className="px-6 py-4 font-semibold">
                  {item.id}
                </td>

                <td className="px-6 py-4">
                  {item.guest}
                </td>

                <td className="px-6 py-4">
                  {item.room}
                </td>

                <td className="px-6 py-4">
                  {item.checkIn}
                </td>

                <td className="px-6 py-4">
                  {item.checkOut}
                </td>

                <td className="px-6 py-4 font-semibold">
                  {item.amount}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      ${
                        item.status ===
                        "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {item.status}
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