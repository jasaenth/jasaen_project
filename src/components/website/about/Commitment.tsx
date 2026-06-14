const stats = [
  {
    number: "5000+",
    label: "Happy Guests",
  },
  {
    number: "32",
    label: "Unique Rooms",
  },
  {
    number: "10+",
    label: "Years of Hospitality",
  },
  {
    number: "4.8/5",
    label: "Guest Satisfaction",
  },
];

const Commitment = () => {
  return (
    <section className="pb-24 bg-bgmain">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center">
          <span className="gold-divider justify-center mb-5">
            Our Commitment
          </span>

          <h2 className="font-display text-5xl lg:text-6xl text-maroon leading-tight">
            Your Comfort,
            Our Passion
          </h2>

         
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-3xl
                p-8
                text-center
                border
                border-borderlight
                shadow-soft
                hover:shadow-luxe
                hover:-translate-y-2
                transition-all
                duration-500
              "
            >
              <div className="font-playfair text-4xl text-maroon mb-3">
                {stat.number}
              </div>

              <div className="w-12 h-px bg-gold mx-auto mb-4" />

              <p className="text-xs uppercase tracking-[0.25em] text-textmuted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Quote Card */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-[2rem] border border-borderlight shadow-soft p-8 md:p-10 text-center">
            <p className="italic text-lg md:text-xl text-textmuted leading-relaxed">
              "We believe hospitality is not simply about providing a room —
              it is about creating meaningful experiences, genuine connections,
              and unforgettable memories for every guest."
            </p>

            <div className="mt-5">
              <span className="text-maroon font-medium">
                — Jasaen Boutique Hotel
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Commitment;