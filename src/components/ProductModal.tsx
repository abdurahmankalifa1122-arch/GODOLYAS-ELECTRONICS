import { useEffect, useState } from 'react';
import { X, Phone, MessageSquare, Check, Copy, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../config/business';
import type { ProductItem } from '../data/catalog';
import {
  buildInquiryMessage,
  buildTelHref,
  buildWhatsAppInquiryUrl,
  formatPriceEtb,
} from '../utils/commerce';
import { SafeImage } from './SafeImage';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onPrefillContact: (product: ProductItem) => void;
}

export function ProductModal({ product, onClose, onPrefillContact }: ProductModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!product) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [product, onClose]);

  if (!product) return null;

  const inquiryText = buildInquiryMessage({
    productName: product.name,
    categoryLabel: product.categoryLabel,
  });
  const whatsappUrl = buildWhatsAppInquiryUrl(BUSINESS_INFO.whatsappNumber, inquiryText);
  const priceLabel = formatPriceEtb(product.priceEtb);

  async function handleCopyInquiry() {
    try {
      await navigator.clipboard.writeText(inquiryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback: open prefilled contact form directly
      onPrefillContact(product!);
      onClose();
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="bg-slate-100 md:col-span-5">
            <div className="aspect-[4/3] h-full w-full md:aspect-auto">
              <SafeImage
                src={product.image}
                alt={product.imageAlt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-7">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span>{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{BUSINESS_INFO.name}</span>
              </div>

              <h3
                id="product-modal-title"
                className="mt-2 pr-8 font-display text-2xl font-bold text-slate-900"
              >
                {product.name}
              </h3>

              <div className="mt-4 flex items-baseline justify-between border-y border-slate-100 py-3">
                <span className="text-xs font-medium text-slate-500">Estimated Price (ETB)</span>
                <span
                  className={
                    product.priceEtb !== null
                      ? 'font-mono-tabular text-lg font-bold text-slate-900'
                      : 'font-display text-base font-semibold text-blue-700'
                  }
                >
                  {priceLabel}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {product.fullDescription}
              </p>

              <p className="mt-3 text-xs text-slate-500">{product.inquiryNote}</p>
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
              <div className="flex flex-wrap gap-3">
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
                  >
                    <MessageSquare className="h-4 w-4" aria-hidden="true" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onPrefillContact(product);
                      onClose();
                    }}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                  >
                    <span>Send Product Inquiry</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCopyInquiry}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                      <span>Inquiry Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>Copy Inquiry</span>
                    </>
                  )}
                </button>
              </div>

              {!whatsappUrl && (
                <p className="text-xs text-slate-500">
                  Prefer direct assistance? Call any of our official lines below or send a product
                  inquiry.
                </p>
              )}

              <div className="pt-2">
                <p className="text-xs font-medium text-slate-500">Or call our team directly:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {BUSINESS_INFO.phones.map((phone) => (
                    <a
                      key={phone.id}
                      href={buildTelHref(phone.number)}
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono-tabular text-xs font-semibold text-slate-800 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{phone.number}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
