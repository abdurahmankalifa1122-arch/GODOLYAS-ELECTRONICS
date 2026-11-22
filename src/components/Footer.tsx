import { Phone } from 'lucide-react';
import godolyasLogo from '../assets/godolyas-logo.png';
import { BUSINESS_INFO } from '../config/business';
import { CATEGORIES } from '../data/catalog';
import { buildTelHref } from '../utils/commerce';

interface FooterProps {
  onSelectCategory: (categoryId: string) => void;
}

export function Footer({ onSelectCategory }: FooterProps) {
  function handleFooterCategoryClick(categoryId: string) {
    onSelectCategory(categoryId);
    const productsEl = document.getElementById('products');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <footer className="border-t border-slate-800 bg-[#0B132B] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a href="#home" className="inline-flex items-center gap-3">
              <img
                src={godolyasLogo}
                alt="GODOLYAS ELECTRONICS logo"
                className="h-11 w-11 rounded-lg object-contain ring-1 ring-white/15"
              />
              <span className="font-display text-lg font-bold tracking-tight text-white">
                {BUSINESS_INFO.name}
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Quality electronics and modern technology solutions tailored for customers in
              Ethiopia. Reach our team directly for availability and Ethiopian Birr (ETB) pricing.
            </p>

            {BUSINESS_INFO.socialLinks.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {BUSINESS_INFO.socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-slate-300 underline-offset-4 hover:text-white hover:underline"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold text-white">Navigation</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#home" className="transition-colors hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="transition-colors hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="#categories" className="transition-colors hover:text-white">
                  Categories
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Product Category Links */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold text-white">Categories</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => handleFooterCategoryClick(category.id)}
                    className="text-left transition-colors hover:text-white"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Telephone Numbers */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold text-white">Telephone</h3>
            <ul className="mt-4 space-y-3">
              {BUSINESS_INFO.phones.map((phone) => (
                <li key={phone.id}>
                  <a
                    href={buildTelHref(phone.number)}
                    className="group inline-flex items-center gap-2.5 text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    <Phone
                      className="h-4 w-4 shrink-0 text-blue-400 transition-colors group-hover:text-blue-300"
                      aria-hidden="true"
                    />
                    <span className="font-mono-tabular font-semibold text-white">
                      {phone.number}
                    </span>
                    <span className="text-xs text-slate-400">· {phone.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
          </p>
          <p>Market: {BUSINESS_INFO.market} · Currency: {BUSINESS_INFO.currency}</p>
        </div>
      </div>
    </footer>
  );
}
