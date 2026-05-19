const stats = [
  {
    number: "5000+",
    label: "HAPPY GUESTS",
  },
  {
    number: "50+",
    label: "COMFORTABLE ROOMS",
  },
  {
    number: "10+",
    label: "YEARS OF HOSPITALITY",
  },
  {
    number: "4.8/5",
    label: "GUEST SATISFACTION",
  },
];

const Commitment = () => {
  return (
    <section className="bg-bgmain py-8 px-6 md:px-12 lg:px-30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div>
            {/* Small Label */}
            <p className="text-secondary uppercase font-semibold tracking-wide text-sm mb-2">
              OUR COMMITMENT
            </p>

            {/* Heading */}
            <h2 className="heading-font text-3xl md:text-4xl font-bold text-primary leading-tight mb-4">
              YOUR COMFORT,
              <br />
              OUR PASSION
            </h2>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-[2px] bg-secondary"></div>
              <div className="w-2 h-2 rounded-full border border-secondary"></div>
              <div className="w-14 h-[2px] bg-secondary"></div>
            </div>

            {/* Description */}
            <p className="text-textmuted text-md leading-8 max-w-xl">
              At Jasaen Hotel, we are committed to providing exceptional
              service, comfortable stays, and unforgettable experiences.
              We look forward to welcoming you and making your visit truly
              special.
            </p>
          </div>

          {/* Right Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center ${
                  index !== stats.length - 1
                    ? "md:border-r border-borderlight"
                    : ""
                }`}
              >
                <h3 className="heading-font text-2xl md:text-3xl font-bold text-primary mb-3">
                  {stat.number}
                </h3>

                <p className="text-textmain text-sm  font-semibold  text-center">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Commitment;