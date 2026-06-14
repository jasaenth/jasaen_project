export default function RecentBookingsTable() {
  const bookings = [
    {
      guest: "Aisha Verma",
      room: "Royal Executive Suite",
      checkin: "12 Mar",
      nights: 4,
      status: "Confirmed",
    },
    {
      guest: "Daniel Okafor",
      room: "Heritage Deluxe Room",
      checkin: "14 Mar",
      nights: 2,
      status: "Checked-in",
    },
    {
      guest: "Mira Tanaka",
      room: "Jasaen Presidential",
      checkin: "18 Mar",
      nights: 6,
      status: "Pending",
    },
    {
      guest: "Liam Chen",
      room: "Heritage Deluxe Room",
      checkin: "21 Mar",
      nights: 3,
      status: "Confirmed",
    },
  ];

  return (
    <div className="bg-white rounded-4xl border border-borderlight p-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-display text-4xl text-maroon">
          Recent bookings
        </h2>

        <button className="text-maroon font-medium">
          View all →
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="py-4 text-left tracking-[0.25em] text-xs">
              GUEST
            </th>

            <th className="text-left text-xs tracking-[0.25em]">
              ROOM
            </th>

            <th className="text-left text-xs tracking-[0.25em]">
              CHECK-IN
            </th>

            <th className="text-left text-xs tracking-[0.25em]">
              NIGHTS
            </th>

            <th className="text-left text-xs tracking-[0.25em]">
              STATUS
            </th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking, i) => (
            <tr
              key={i}
              className="border-b"
            >
              <td className="py-6">
                {booking.guest}
              </td>

              <td>{booking.room}</td>

              <td>{booking.checkin}</td>

              <td>{booking.nights}</td>

              <td>
                <span
                  className={`
                    px-4 py-2 rounded-full text-sm
                    ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Checked-in"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {booking.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}