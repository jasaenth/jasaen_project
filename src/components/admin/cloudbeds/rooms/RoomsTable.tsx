"use client";

const rooms = [
  {
    roomNo: "101",
    type: "Standard Single",
    floor: "1",
    status: "Available",
    rate: "฿1,200",
  },
  {
    roomNo: "102",
    type: "Deluxe Double",
    floor: "1",
    status: "Occupied",
    rate: "฿2,500",
  },
  {
    roomNo: "201",
    type: "Executive Suite",
    floor: "2",
    status: "Maintenance",
    rate: "฿4,800",
  },
  {
    roomNo: "202",
    type: "Standard Twin",
    floor: "2",
    status: "Available",
    rate: "฿1,500",
  },
  {
    roomNo: "301",
    type: "Deluxe Double A",
    floor: "3",
    status: "Occupied",
    rate: "฿2,800",
  },
];

export default function RoomsTable() {
  return (
    <div className="bg-white border rounded-3xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">
                Room No
              </th>

              <th className="px-6 py-4 text-left">
                Room Type
              </th>

              <th className="px-6 py-4 text-left">
                Floor
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Rate
              </th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr
                key={room.roomNo}
                className="border-t"
              >
                <td className="px-6 py-4 font-semibold">
                  {room.roomNo}
                </td>

                <td className="px-6 py-4">
                  {room.type}
                </td>

                <td className="px-6 py-4">
                  Floor {room.floor}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      room.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : room.status === "Occupied"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {room.status}
                  </span>
                </td>

                <td className="px-6 py-4 font-semibold">
                  {room.rate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}