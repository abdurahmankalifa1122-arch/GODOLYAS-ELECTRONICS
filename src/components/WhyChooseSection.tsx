const TRUST_PILLARS = [
  {
    index: '01',
    title: 'Customer-Focused Service',
    description:
      'Attentive, straightforward communication designed to help every customer find the right electronic equipment for their needs.',
  },
  {
    index: '02',
    title: 'Quality Products',
    description:
      'Carefully selected electronics and modern technology solutions tailored for dependable everyday personal and business use.',
  },
  {
    index: '03',
    title: 'Professional Assistance',
    description:
      'Clear product guidance before you decide—confirm models, specifications, and Ethiopian Birr pricing directly with our staff.',
  },
  {
    index: '04',
    title: 'Convenient Communication',
    description:
      'Reach our team effortlessly across three dedicated telephone lines or submit an inquiry directly online at any time.',
  },
];

export function WhyChooseSection() {
  return (
    <section className="bg-[#0B132B] py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-blue-400">Our Standard</p>
          <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why Choose GODOLYAS ELECTRONICS?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            We focus on clear communication, dependable product offerings, and responsive personal
            assistance for customers across Ethiopia.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {TRUST_PILLARS.map((pillar) => (
            <div
              key={pillar.index}
              className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition-colors duration-200 hover:border-slate-700"
            >
              <div>
                <div className="font-mono-tabular text-xs font-semibold text-blue-400">
                  {pillar.index}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
