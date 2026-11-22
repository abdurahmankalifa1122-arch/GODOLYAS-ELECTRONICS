import godolyasLogo from '../assets/godolyas-logo.png';
import { BUSINESS_INFO } from '../config/business';

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-[72px] border-b border-slate-200 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-10 sm:p-14">
              <img
                src={godolyasLogo}
                alt="GODOLYAS ELECTRONICS official brand emblem"
                className="h-52 w-52 rounded-2xl object-contain shadow-md sm:h-64 sm:w-64"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-blue-700">About Us</p>
            <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Connecting Customers in Ethiopia to Reliable Technology
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
              <p>
                {BUSINESS_INFO.name} serves individuals, households, and professionals seeking
                dependable consumer electronics and modern technology solutions in Ethiopia.
              </p>
              <p>
                Choosing the right smartphone, laptop, television, or home appliance requires clear
                information and trustworthy support. Our team prioritizes honest guidance, transparent
                Ethiopian Birr (ETB) pricing inquiries, and direct personal communication so you can
                make confident technology decisions.
              </p>
              <p>
                Whether you are upgrading personal devices or equipping a workspace, we welcome
                direct phone inquiries and product questions across our dedicated telephone lines.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
              <div>
                <div className="text-xs font-medium text-slate-500">Market Focus</div>
                <div className="mt-1 font-display text-base font-semibold text-slate-900">
                  {BUSINESS_INFO.market}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500">Pricing Currency</div>
                <div className="mt-1 font-display text-base font-semibold text-slate-900">
                  Ethiopian Birr ({BUSINESS_INFO.currency})
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500">Customer Assistance</div>
                <div className="mt-1 font-display text-base font-semibold text-slate-900">
                  Direct Phone &amp; Inquiry
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
