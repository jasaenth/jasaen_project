"use client";

const channels = [
  {
    name: "Booking.com",
    bookings: 245,
    color: "bg-blue-500",
  },
  {
    name: "Agoda",
    bookings: 180,
    color: "bg-red-500",
  },
  {
    name: "Expedia",
    bookings: 125,
    color: "bg-yellow-500",
  },
  {
    name: "Direct Website",
    bookings: 98,
    color: "bg-green-500",
  },
];

export default function DistributionChannels() {
  return (
    <div className="bg-white border rounded-3xl p-6">
      <h3 className="text-lg font-bold mb-5">
        Distribution Channels
      </h3>

      <div className="space-y-4">
        {channels.map((channel) => (
          <div
            key={channel.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${channel.color}`}
              />

              <span>{channel.name}</span>
            </div>

            <span className="font-semibold">
              {channel.bookings}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}