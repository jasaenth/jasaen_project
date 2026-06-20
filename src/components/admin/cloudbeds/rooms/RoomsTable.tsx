"use client";

interface Props {
  rooms: any[];
}

export default function RoomsTable({ rooms }: Props) {
  return (
    <div className="bg-white border rounded-3xl overflow-hidden">
      <div className="p-6 border-b bg-gray-50">
        <h3 className="text-xl font-semibold">Room Inventory</h3>

        <p className="text-gray-500 text-sm mt-1">{rooms.length} rooms found</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">Room</th>

              <th className="px-6 py-4 text-left">Room ID</th>

              <th className="px-6 py-4 text-left">Short Name</th>

              <th className="px-6 py-4 text-left">Type</th>

              

              <th className="px-6 py-4 text-left">Guests</th>

              <th className="px-6 py-4 text-left">Privacy</th>

              

              
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr
                key={room.roomID}
                className="
                  border-t
                  hover:bg-gray-50
                "
              >
                <td className="px-6 py-4 font-semibold">{room.roomName}</td>


              <td className="px-6 py-4 text-xs text-gray-500">
                  {room.roomID}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      
                    `}
                  >
                    {room.roomTypeNameShort}
                  </span>
                </td>

                <td className="px-6 py-4">{room.roomTypeName}</td>

                

                <td className="px-6 py-4">{room.maxGuests}</td>

                <td className="px-6 py-4">
                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      ${
                        room.isPrivate
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    {room.isPrivate ? "Private" : "Shared"}
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
