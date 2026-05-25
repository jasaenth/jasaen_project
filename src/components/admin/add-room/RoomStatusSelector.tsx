"use client";

interface Props {
  status: "ACTIVE" | "INACTIVE";
  setStatus: (
    status: "ACTIVE" | "INACTIVE"
  ) => void;
}

const RoomStatusSelector = ({
  status,
  setStatus,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-borderlight p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-2">
        Room Status
      </h2>

      <p className="text-textmuted mb-6">
        Set availability status for this room
      </p>

      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setStatus("ACTIVE")}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border transition ${
            status === "ACTIVE"
              ? "border-green-500 bg-green-50"
              : "border-borderlight"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full border-2 ${
              status === "ACTIVE"
                ? "border-green-600 bg-green-600"
                : "border-gray-400"
            }`}
          />

          <div>
            <p className="font-semibold text-left">
              Active
            </p>

            <span className="text-sm text-green-700">
              Displayed and available for booking
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setStatus("INACTIVE")}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border transition ${
            status === "INACTIVE"
              ? "border-red-500 bg-red-50"
              : "border-borderlight"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full border-2 ${
              status === "INACTIVE"
                ? "border-red-600 bg-red-600"
                : "border-gray-400"
            }`}
          />

          <div>
            <p className="font-semibold text-left">
              Inactive
            </p>

            <span className="text-sm text-red-700">
              Hidden and not available for booking
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default RoomStatusSelector;