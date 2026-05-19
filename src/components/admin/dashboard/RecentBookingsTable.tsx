import DashboardCard from "./DashboardCard";

const RecentBookingsTable = () => {
  return (
    <DashboardCard title="Recent Bookings">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-textmuted">
              <th>ID</th>
              <th>Guest</th>
              <th>Room</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>#BK1252</td>
              <td>Rohit Sharma</td>
              <td>Deluxe Room</td>
              <td>₹ 9,000</td>
              <td className="text-green-600">Confirmed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
};

export default RecentBookingsTable;