interface Props {
  guest: any;
}

export default function GuestCard({
  guest,
}: Props) {
  return (
    <div
      className="
        bg-white
        border
        rounded-3xl
        p-6
        shadow-sm
        hover:shadow-md
        transition
      "
    >

      <div className="flex items-start justify-between">

        <div>

          <h3 className="font-semibold text-lg">
            {guest.guestName}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {guest.guestEmail ||
              "No Email"}
          </p>

        </div>

        {guest.isMainGuest && (
          <span
            className="
              px-3
              py-1
              rounded-full
              bg-green-100
              text-green-700
              text-xs
            "
          >
            Main Guest
          </span>
        )}

      </div>

      <div className="mt-5 space-y-2 text-sm">

        <div className="flex justify-between">
          <span className="text-gray-500">
            Guest ID
          </span>

          <span>
            {guest.guestID}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Reservation
          </span>

          <span>
            {guest.reservationID}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Created
          </span>

          <span>
            {guest.dateCreated?.split(
              " "
            )[0]}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Updated
          </span>

          <span>
            {guest.dateModified?.split(
              " "
            )[0]}
          </span>
        </div>

      </div>

    </div>
  );
}