"use client";

type BookingFormProps = {
  className?: string;
  containerClassName?: string;
};

const BookingForm = ({
  className = "",
  containerClassName = "",
}: BookingFormProps) => {
  return (
    <div className={className}>
      <div
        className={`bg-bgmain backdrop-blur-md rounded-2xl p-6 shadow-2xl ${containerClassName}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Check In */}
          <div>
            <label className="block text-textmain text-sm font-semibold mb-2">
              CHECK-IN
            </label>

            <input
              type="date"
              className="w-full px-4 py-3 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-textmain"
            />
          </div>

          {/* Check Out */}
          <div>
            <label className="block text-textmain text-sm font-semibold mb-2">
              CHECK-OUT
            </label>

            <input
              type="date"
              className="w-full px-4 py-3 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-textmain"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block text-textmain text-sm font-semibold mb-2">
              GUESTS
            </label>

            <select className="w-full px-4 py-3 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-textmain">
              <option>1 Adult</option>
              <option>2 Adults</option>
              <option>3 Adults</option>
              <option>4 Adults</option>
              <option>2 Adults + 1 Child</option>
              <option>2 Adults + 2 Children</option>
            </select>
          </div>

          {/* CTA */}
          <div className="flex items-end">
            <button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md">
              CHECK AVAILABILITY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;