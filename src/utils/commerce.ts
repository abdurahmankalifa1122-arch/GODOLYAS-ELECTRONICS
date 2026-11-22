import type { ProductItem } from '../data/catalog';

export interface ProductFilterCriteria {
  categoryId: string;
  searchQuery: string;
}

export interface ContactFormInput {
  fullName: string;
  contactInfo: string;
  interest: string;
  message: string;
}

export interface ContactFormErrors {
  fullName?: string;
  contactInfo?: string;
  message?: string;
}

/**
 * Formats an optional ETB price cleanly or returns "Contact for Price".
 */
export function formatPriceEtb(priceEtb: number | null | undefined): string {
  if (typeof priceEtb !== 'number' || !Number.isFinite(priceEtb) || priceEtb <= 0) {
    return 'Contact for Price';
  }
  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(Math.round(priceEtb));
  return `ETB ${formatted}`;
}

/**
 * Filters products deterministically by categoryId ('all' matches all) and search query.
 */
export function filterProducts(
  products: ProductItem[],
  criteria: ProductFilterCriteria
): ProductItem[] {
  const normalizedCategory = criteria.categoryId.trim().toLowerCase();
  const query = criteria.searchQuery.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory =
      normalizedCategory === '' ||
      normalizedCategory === 'all' ||
      product.categoryId.toLowerCase() === normalizedCategory;

    if (!matchesCategory) {
      return false;
    }

    if (!query) {
      return true;
    }

    const searchableText = [
      product.name,
      product.categoryLabel,
      product.shortDescription,
      product.fullDescription,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(query);
  });
}

/**
 * Normalizes a phone number into a safe tel: URI.
 */
export function buildTelHref(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');
  return `tel:${cleaned}`;
}

/**
 * Builds a WhatsApp click-to-chat URL if a valid business number is configured.
 * Returns null when the configurable WhatsApp number is empty or invalid.
 */
export function buildWhatsAppInquiryUrl(
  whatsappNumber: string,
  message: string
): string | null {
  const digits = whatsappNumber.replace(/\D/g, '');
  if (digits.length < 7) {
    return null;
  }
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${digits}?text=${encodedText}`;
}

/**
 * Validates customer contact/inquiry form submissions.
 */
export function validateContactForm(input: ContactFormInput): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const contact = input.contactInfo.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const phoneDigits = contact.replace(/\D/g, '');
  const isPhone = phoneDigits.length >= 7 && phoneDigits.length <= 15;

  if (!contact) {
    errors.contactInfo = 'Please provide a phone number or email address.';
  } else if (!isEmail && !isPhone) {
    errors.contactInfo = 'Enter a valid phone number (e.g., 0911223344) or email address.';
  }

  if (input.message.trim().length < 10) {
    errors.message = 'Please include a brief inquiry message (at least 10 characters).';
  }

  return errors;
}

/**
 * Builds a clean plain-text inquiry summary for copying or WhatsApp dispatch.
 */
export function buildInquiryMessage(params: {
  productName?: string;
  categoryLabel?: string;
  customerName?: string;
  note?: string;
}): string {
  const lines = ['Hello GODOLYAS ELECTRONICS,'];
  if (params.productName) {
    lines.push(
      `I would like to inquire about availability and pricing for: ${params.productName}${
        params.categoryLabel ? ` (${params.categoryLabel})` : ''
      }.`
    );
  } else {
    lines.push('I would like to make a product inquiry.');
  }
  if (params.note && params.note.trim()) {
    lines.push(`Details: ${params.note.trim()}`);
  }
  if (params.customerName && params.customerName.trim()) {
    lines.push(`From: ${params.customerName.trim()}`);
  }
  return lines.join('\n');
}
