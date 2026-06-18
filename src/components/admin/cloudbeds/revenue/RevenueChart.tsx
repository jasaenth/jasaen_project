"use client";

const revenueData = [
  { month: "Jan", value: 280000 },
  { month: "Feb", value: 340000 },
  { month: "Mar", value: 390000 },
  { month: "Apr", value: 460000 },
  { month: "May", value: 520000 },
  { month: "Jun", value: 610000 },
];

export default function RevenueChart() {
  const max = Math.max(
    ...revenueData.map((item) => item.value)
  );

  return (
    <div className="bg-white border rounded-3xl p-6">
      <h3 className="text-xl font-bold mb-8">
        Revenue Trend
      </h3>

      <div className="h-[320px] flex items-end justify-between gap-4">
        {revenueData.map((item) => (
          <div
            key={item.month}
            className="flex-1 flex flex-col items-center"
          >
            <div
              className="
                w-full
                bg-blue-500
                rounded-t-2xl
                transition-all
              "
              style={{
                height: `${
                  (item.value / max) * 250
                }px`,
              }}
            />

            <p className="text-sm mt-3 font-medium">
              {item.month}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}