export interface PhoneContact {
  id: string;
  number: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const BUSINESS_INFO = {
  name: 'GODOLYAS ELECTRONICS',
  market: 'Ethiopia',
  currency: 'ETB',
  language: 'English',
  headline: 'Technology That Connects You to More.',
  subheadline:
    'Discover quality electronics and modern technology solutions with GODOLYAS ELECTRONICS.',
  /**
   * Configure your official WhatsApp business number in international format
   * without '+' or spaces (e.g., "251960318181") once confirmed.
   * Leave empty if WhatsApp inquiry is not yet activated.
   */
  whatsappNumber: '',
  phones: [
    { id: 'line-1', number: '0116597020', label: 'Primary Telephone' },
    { id: 'line-2', number: '0960318181', label: 'Direct Mobile' },
    { id: 'line-3', number: '0116597030', label: 'Customer Inquiry Line' },
  ] as PhoneContact[],
  /**
   * Add verified social media URLs here when available.
   * Links remain hidden unless actual URLs are configured.
   */
  socialLinks: [] as SocialLink[],
} as const;
