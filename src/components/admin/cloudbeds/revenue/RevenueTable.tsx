"use client";

const data = [
  {
    month: "January",
    bookings: 122,
    occupancy: "71%",
    revenue: "฿280,000",
  },
  {
    month: "February",
    bookings: 141,
    occupancy: "76%",
    revenue: "฿340,000",
  },
  {
    month: "March",
    bookings: 158,
    occupancy: "80%",
    revenue: "฿390,000",
  },
  {
    month: "April",
    bookings: 174,
    occupancy: "84%",
    revenue: "฿460,000",
  },
  {
    month: "May",
    bookings: 188,
    occupancy: "87%",
    revenue: "฿520,000",
  },
  {
    month: "June",
    bookings: 221,
    occupancy: "91%",
    revenue: "฿610,000",
  },
];

export default function RevenueTable() {
  return (
    <div className="bg-white border rounded-3xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">
                Month
              </th>

              <th className="px-6 py-4 text-left">
                Bookings
              </th>

              <th className="px-6 py-4 text-left">
                Occupancy
              </th>

              <th className="px-6 py-4 text-left">
                Revenue
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr
                key={row.month}
                className="border-t"
              >
                <td className="px-6 py-4 font-semibold">
                  {row.month}
                </td>

                <td className="px-6 py-4">
                  {row.bookings}
                </td>

                <td className="px-6 py-4">
                  {row.occupancy}
                </td>

                <td className="px-6 py-4 font-bold text-green-600">
                  {row.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}