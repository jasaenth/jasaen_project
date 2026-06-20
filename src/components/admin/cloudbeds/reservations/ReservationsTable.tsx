"use client";

interface Props {
  reservations: any[];
}

export default function ReservationsTable({ reservations }: Props) {
  return (
    <div className="bg-white border rounded-3xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">Reservation ID</th>

              <th className="px-6 py-4 text-left">Guest</th>

              <th className="px-6 py-4 text-left">Booking Date</th>

              <th className="px-6 py-4 text-left">Check In</th>

              <th className="px-6 py-4 text-left">Check Out</th>

              <th className="px-6 py-4 text-left">Source</th>

              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-6 py-4 font-semibold">{item.reservationID}</td>

                <td className="px-6 py-4">{item.guestName}</td>

                <td className="px-6 py-4">{item.dateCreated}</td>

                <td className="px-6 py-4">{item.startDate}</td>

                <td className="px-6 py-4">{item.endDate}</td>

                <td className="px-6 py-4 font-semibold">{item.sourceName}</td>

                <td className="px-6 py-4">
                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      ${
                        item.status === "Confirmed"
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
