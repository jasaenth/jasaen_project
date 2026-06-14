export default function TodaysHouse() {
  return (
    <div className="bg-white rounded-[2rem] border border-borderlight p-10">
      <h2 className="font-display text-4xl text-maroon mb-10">
        Today's house
      </h2>

      <div className="space-y-6">
        <Row
          label="Arrivals"
          value="7"
        />

        <Row
          label="Departures"
          value="5"
        />

        <Row
          label="In-house"
          value="29"
        />

        <Row
          label="VIP guests"
          value="3"
        />

        <Row
          label="Spa bookings"
          value="12"
        />

        <Row
          label="Restaurant covers"
          value="84"
        />
      </div>

      <div className="mt-10 rounded-2xl border bg-[#faf5f7] p-6">
        <p className="uppercase tracking-[0.3em] text-xs text-maroon mb-4">
          Note From Concierge
        </p>

        <p className="text-muted-foreground leading-7">
          Anniversary turn-down requested
          for Suite 1408. Champagne chilled
          by 7pm.
        </p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">
        {label}
      </span>

      <span className="font-semibold">
        {value}
      </span>
    </div>
  );
}