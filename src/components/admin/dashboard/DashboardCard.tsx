interface DashboardCardProps {
  title?: string;
  children: React.ReactNode;
}

const DashboardCard = ({
  title,
  children,
}: DashboardCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-borderlight shadow-sm p-6">
      {title && (
        <h3 className="text-lg font-semibold text-textmain mb-5">
          {title}
        </h3>
      )}

      {children}
    </div>
  );
};

export default DashboardCard;