import { ArrowRight, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../config/business';
import { HERO_MEDIA } from '../data/catalog';
import { buildTelHref } from '../utils/commerce';
import { SafeImage } from './SafeImage';

export function HeroSection() {
  return (
    <section id="home" className="relative scroll-mt-[72px] overflow-hidden bg-[#0B132B] text-white">
      {/* Subtle architectural gradient atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(30,58,138,0.2),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 lg:px-8 lg:pb-16 lg:pt-20">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Editorial Column */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-sm font-medium tracking-wide text-blue-300">
              GODOLYAS ELECTRONICS · Ethiopia
            </p>

            <h1 className="mt-4 text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              {BUSINESS_INFO.headline}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {BUSINESS_INFO.subheadline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                <span>Explore Products</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center whitespace-nowrap rounded-lg border border-slate-600/80 bg-slate-900/50 px-6 py-3 text-sm font-semibold text-slate-100 transition-colors duration-200 hover:border-slate-400 hover:bg-slate-800/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right Product Showcase Column */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
              <SafeImage
                src={HERO_MEDIA.image}
                alt={HERO_MEDIA.alt}
                loading="eager"
                className="h-full w-full object-cover object-center lg:min-h-[400px]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B132B]/55 via-transparent to-transparent"
              />
            </div>
          </div>
        </div>

        {/* Full-Width Direct Telephone & Inquiry Strip */}
        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-slate-800/90 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="flex flex-col justify-center">
            <span className="text-xs font-medium text-slate-400">Direct Telephone Lines</span>
            <span className="mt-1 text-sm font-medium text-slate-200">
              Speak directly with our team
            </span>
          </div>

          {BUSINESS_INFO.phones.map((phone) => (
            <a
              key={phone.id}
              href={buildTelHref(phone.number)}
              className="group flex min-h-[56px] items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 transition-colors duration-150 hover:border-blue-500/60 hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-blue-400"
            >
              <div>
                <div className="text-xs text-slate-400">{phone.label}</div>
                <div className="font-mono-tabular mt-0.5 text-base font-semibold text-white group-hover:text-blue-300">
                  {phone.number}
                </div>
              </div>
              <Phone
                className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-blue-400"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
