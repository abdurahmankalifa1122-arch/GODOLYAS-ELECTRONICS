import { useEffect, useState, type FormEvent } from 'react';
import { Phone, MessageSquare, CheckCircle2, Copy, Check, Send } from 'lucide-react';
import { BUSINESS_INFO } from '../config/business';
import { CATEGORIES, type ProductItem } from '../data/catalog';
import {
  buildInquiryMessage,
  buildTelHref,
  buildWhatsAppInquiryUrl,
  validateContactForm,
  type ContactFormErrors,
} from '../utils/commerce';

interface ContactSectionProps {
  prefilledProduct: ProductItem | null;
}

export function ContactSection({ prefilledProduct }: ContactSectionProps) {
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [interest, setInterest] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    if (prefilledProduct) {
      setInterest(prefilledProduct.categoryLabel);
      setMessage(
        `Hello GODOLYAS ELECTRONICS, I would like to inquire about availability and ETB pricing for ${prefilledProduct.name} (${prefilledProduct.categoryLabel}).`
      );
      setSubmittedSummary(null);
      setErrors({});
    }
  }, [prefilledProduct]);

  const directWhatsappUrl = buildWhatsAppInquiryUrl(
    BUSINESS_INFO.whatsappNumber,
    buildInquiryMessage({
      productName: prefilledProduct?.name,
      categoryLabel: prefilledProduct?.categoryLabel,
    })
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContactForm({
      fullName,
      contactInfo,
      interest,
      message,
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const summary = [
      `Name: ${fullName.trim()}`,
      `Contact: ${contactInfo.trim()}`,
      `Topic: ${interest}`,
      `Message: ${message.trim()}`,
    ].join('\n');
    setSubmittedSummary(summary);
  }

  async function handleCopySummary() {
    if (!submittedSummary) return;
    try {
      await navigator.clipboard.writeText(submittedSummary);
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      setCopiedSummary(false);
    }
  }

  function handleResetForm() {
    setFullName('');
    setContactInfo('');
    setInterest('General Inquiry');
    setMessage('');
    setErrors({});
    setSubmittedSummary(null);
  }

  return (
    <section id="contact" className="scroll-mt-[72px] bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-blue-700">Customer Contact</p>
          <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Speak Directly With GODOLYAS ELECTRONICS
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Call any of our three official telephone lines for immediate assistance, or prepare a
            business inquiry below.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Official Telephone Numbers & WhatsApp */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Official Telephone Lines
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Tap or click any number below to place a call directly.
              </p>

              <div className="mt-5 space-y-3">
                {BUSINESS_INFO.phones.map((phone) => (
                  <a
                    key={phone.id}
                    href={buildTelHref(phone.number)}
                    className="group flex min-h-[56px] items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-150 hover:border-blue-500 hover:bg-blue-50/60 focus-visible:outline-2 focus-visible:outline-blue-600"
                  >
                    <div>
                      <div className="text-xs font-medium text-slate-500">{phone.label}</div>
                      <div className="font-mono-tabular mt-0.5 text-lg font-bold text-slate-900 group-hover:text-blue-700">
                        {phone.number}
                      </div>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-700 shadow-xs transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Configurable WhatsApp Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    WhatsApp Inquiry
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {directWhatsappUrl
                      ? 'Message our team directly on WhatsApp regarding product availability and ETB pricing.'
                      : 'WhatsApp direct messaging will activate automatically once an official WhatsApp number is configured.'}
                  </p>
                </div>
                <MessageSquare className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
              </div>

              {directWhatsappUrl ? (
                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  <span>Start WhatsApp Chat</span>
                </a>
              ) : (
                <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600">
                  For immediate real-time messaging or inquiries right now, please call{' '}
                  <a
                    href={buildTelHref('0960318181')}
                    className="font-mono-tabular font-semibold text-blue-700 underline underline-offset-2"
                  >
                    0960318181
                  </a>{' '}
                  or use the Business Inquiry form.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Business Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold text-slate-900">
                Business &amp; Product Inquiry
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Prepare a structured inquiry for product availability, Ethiopian Birr (ETB) pricing,
                or commercial orders.
              </p>

              {submittedSummary ? (
                <div
                  role="status"
                  className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/70 p-6"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                      aria-hidden="true"
                    />
                    <div className="flex-1">
                      <h4 className="font-display text-base font-semibold text-slate-900">
                        Inquiry Prepared Successfully
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-700">
                        Because this static website runs without a backend mail server, your
                        inquiry summary is ready below to copy or share directly with our team by
                        phone.
                      </p>

                      <pre className="mt-4 whitespace-pre-wrap rounded-lg border border-emerald-200/80 bg-white p-4 font-mono-tabular text-xs leading-relaxed text-slate-800">
                        {submittedSummary}
                      </pre>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={handleCopySummary}
                          className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                        >
                          {copiedSummary ? (
                            <>
                              <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                              <span>Copied to Clipboard</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" aria-hidden="true" />
                              <span>Copy Inquiry Summary</span>
                            </>
                          )}
                        </button>

                        <a
                          href={buildTelHref(BUSINESS_INFO.phones[0].number)}
                          className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                        >
                          <Phone className="h-4 w-4" aria-hidden="true" />
                          <span>Call {BUSINESS_INFO.phones[0].number}</span>
                        </a>

                        <button
                          type="button"
                          onClick={handleResetForm}
                          className="inline-flex min-h-[42px] items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                          New Inquiry
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="inquiry-name"
                        className="block text-sm font-medium text-slate-800"
                      >
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        placeholder="Your full name"
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'inquiry-name-error' : undefined}
                        className={`mt-1.5 min-h-[44px] w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          errors.fullName
                            ? 'border-red-500 focus:border-red-600 focus:ring-red-500/20'
                            : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/20'
                        }`}
                      />
                      {errors.fullName && (
                        <p id="inquiry-name-error" className="mt-1.5 text-xs font-medium text-red-600">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-contact"
                        className="block text-sm font-medium text-slate-800"
                      >
                        Phone Number or Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="inquiry-contact"
                        type="text"
                        value={contactInfo}
                        onChange={(e) => {
                          setContactInfo(e.target.value);
                          if (errors.contactInfo) {
                            setErrors((prev) => ({ ...prev, contactInfo: undefined }));
                          }
                        }}
                        placeholder="e.g. 0911223344 or email"
                        aria-invalid={Boolean(errors.contactInfo)}
                        aria-describedby={errors.contactInfo ? 'inquiry-contact-error' : undefined}
                        className={`mt-1.5 min-h-[44px] w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          errors.contactInfo
                            ? 'border-red-500 focus:border-red-600 focus:ring-red-500/20'
                            : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/20'
                        }`}
                      />
                      {errors.contactInfo && (
                        <p
                          id="inquiry-contact-error"
                          className="mt-1.5 text-xs font-medium text-red-600"
                        >
                          {errors.contactInfo}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-interest"
                      className="block text-sm font-medium text-slate-800"
                    >
                      Product Category or Subject
                    </label>
                    <select
                      id="inquiry-interest"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                      <option value="Business & Bulk Order">Business &amp; Bulk Order</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-message"
                      className="block text-sm font-medium text-slate-800"
                    >
                      Message <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      placeholder="Tell us which electronics product or category you are looking for..."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
                      className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        errors.message
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-500/20'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/20'
                      }`}
                    />
                    {errors.message && (
                      <p id="inquiry-message-error" className="mt-1.5 text-xs font-medium text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-500">
                      Prepares a formatted inquiry summary for immediate phone or direct follow-up.
                    </p>
                    <button
                      type="submit"
                      className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Submit Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
