interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHead({
  title,
  subtitle,
}: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-maroon">
        {title}
      </h2>

      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}