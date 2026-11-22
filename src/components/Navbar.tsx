import { useState, useRef, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import godolyasLogo from '../assets/godolyas-logo.png';
import { BUSINESS_INFO } from '../config/business';
import { buildTelHref } from '../utils/commerce';

interface NavbarProps {
  activeSection: string;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Products', href: '#products', id: 'products' },
  { label: 'Categories', href: '#categories', id: 'categories' },
  { label: 'About Us', href: '#about', id: 'about' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export function Navbar({ activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [callMenuOpen, setCallMenuOpen] = useState(false);
  const callMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (callMenuRef.current && !callMenuRef.current.contains(event.target as Node)) {
        setCallMenuOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setCallMenuOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#0B132B]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:gap-6 sm:px-6 lg:h-[72px] lg:gap-8 lg:px-8">
        {/* Zone 1: Brand Wordmark + Original Business Logo */}
        <a
          href="#home"
          className="flex min-w-0 shrink items-center gap-2 whitespace-nowrap rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 sm:gap-3 lg:shrink-0"
        >
          <img
            src={godolyasLogo}
            alt="GODOLYAS ELECTRONICS logo"
            className="h-9 w-9 shrink-0 rounded-lg object-contain ring-1 ring-white/15 sm:h-10 sm:w-10"
          />
          <span className="truncate font-display text-[12px] font-bold tracking-tight text-white sm:text-base lg:text-lg">
            {BUSINESS_INFO.name}
          </span>
        </a>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative shrink-0 whitespace-nowrap py-1 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 bg-blue-500 transition-opacity duration-150 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Mobile Menu Trigger */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="relative" ref={callMenuRef}>
            <button
              type="button"
              onClick={() => setCallMenuOpen((prev) => !prev)}
              aria-expanded={callMenuOpen}
              aria-haspopup="true"
              className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-blue-600 px-2.5 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 sm:gap-2 sm:px-4 sm:text-sm"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
              <span>Call Us</span>
              <ChevronDown
                className={`hidden h-3.5 w-3.5 shrink-0 transition-transform duration-150 sm:block ${
                  callMenuOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {callMenuOpen && (
              <div
                role="menu"
                aria-label="Official telephone numbers"
                className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
              >
                <div className="px-3 py-1.5 text-xs font-medium text-slate-500">
                  Direct Customer Lines
                </div>
                {BUSINESS_INFO.phones.map((phone) => (
                  <a
                    key={phone.id}
                    role="menuitem"
                    href={buildTelHref(phone.number)}
                    onClick={() => setCallMenuOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-900 transition-colors hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none"
                  >
                    <span className="font-mono-tabular font-semibold">{phone.number}</span>
                    <span className="text-xs text-slate-500">{phone.label}</span>
                  </a>
                ))}
                <div className="mt-1 border-t border-slate-100 pt-1">
                  <a
                    role="menuitem"
                    href="#contact"
                    onClick={() => setCallMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-center text-xs font-semibold text-blue-700 hover:bg-blue-50"
                  >
                    Open Inquiry Form
                  </a>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700/80 text-slate-200 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-2 focus-visible:outline-blue-400 lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-800 bg-[#0B132B] px-4 pb-6 pt-4 lg:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-slate-800/80 text-white'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 border-t border-slate-800 pt-4">
            <p className="px-3 text-xs font-medium text-slate-400">Direct Telephone</p>
            <div className="mt-2 grid grid-cols-1 gap-2">
              {BUSINESS_INFO.phones.map((phone) => (
                <a
                  key={phone.id}
                  href={buildTelHref(phone.number)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[44px] items-center justify-between rounded-lg border border-slate-800 bg-slate-900/70 px-3.5 py-2.5 text-sm text-white"
                >
                  <span className="font-mono-tabular font-semibold">{phone.number}</span>
                  <span className="text-xs text-slate-400">{phone.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
