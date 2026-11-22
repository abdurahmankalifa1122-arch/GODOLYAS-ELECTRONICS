import heroShowcaseImg from '../assets/images/hero_electronics_showcase_1795375248799.jpg';
import smartphonesImg from '../assets/images/cat_smartphones_1795375248079.jpg';
import laptopsImg from '../assets/images/cat_laptops_1795375248364.jpg';
import tvDisplaysImg from '../assets/images/cat_tv_displays_1795375250986.jpg';
import homeAppliancesImg from '../assets/images/cat_home_appliances_1795375248006.jpg';
import audioAccessoriesImg from '../assets/images/cat_audio_accessories_1795375247791.jpg';
import gadgetsComputingImg from '../assets/images/cat_gadgets_computing_1795375248656.jpg';

export interface ProductCategory {
  id: string;
  index: string;
  name: string;
  summary: string;
  image: string;
  imageAlt: string;
}

export interface ProductItem {
  id: string;
  name: string;
  categoryId: string;
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  /**
   * Set to a numeric Ethiopian Birr amount (e.g., 45000) to display an ETB price,
   * or keep as null to display "Contact for Price".
   */
  priceEtb: number | null;
  image: string;
  imageAlt: string;
  inquiryNote: string;
}

export const HERO_MEDIA = {
  image: heroShowcaseImg,
  alt: 'Modern laptop, flagship smartphone, and wireless headphones displayed on dark slate stone',
};

/**
 * Editable product categories.
 * Offerings are subject to direct store confirmation.
 */
export const CATEGORIES: ProductCategory[] = [
  {
    id: 'smartphones',
    index: '01',
    name: 'Smartphones',
    summary: 'Modern mobile devices and everyday connectivity essentials. Availability confirmed upon inquiry.',
    image: smartphonesImg,
    imageAlt: 'Modern dark titanium smartphone positioned upright on light neutral stone',
  },
  {
    id: 'laptops',
    index: '02',
    name: 'Laptops & Computers',
    summary: 'Portable notebooks and personal computing systems for work, study, and creative workflows.',
    image: laptopsImg,
    imageAlt: 'Brushed aluminum laptop computer open on an architectural concrete surface',
  },
  {
    id: 'displays',
    index: '03',
    name: 'Televisions & Displays',
    summary: 'High-clarity screens and home entertainment displays suited for living and office spaces.',
    image: tvDisplaysImg,
    imageAlt: 'Ultra-thin frameless flat-screen television above a walnut console in a contemporary room',
  },
  {
    id: 'appliances',
    index: '04',
    name: 'Home Appliances',
    summary: 'Practical kitchen and residential appliances designed for reliable daily operation.',
    image: homeAppliancesImg,
    imageAlt: 'Modern brushed steel espresso appliance and air purifier on a stone countertop',
  },
  {
    id: 'audio',
    index: '05',
    name: 'Audio & Accessories',
    summary: 'Over-ear headphones, compact earbuds, and everyday charging and audio companions.',
    image: audioAccessoriesImg,
    imageAlt: 'Matte black wireless over-ear headphones and compact charging case on neutral surface',
  },
  {
    id: 'gadgets',
    index: '06',
    name: 'Electronics & Gadgets',
    summary: 'Keyboards, precision mice, portable storage, and practical desk technology tools.',
    image: gadgetsComputingImg,
    imageAlt: 'Wireless mechanical keyboard, ergonomic mouse, and portable drive on a gray desk mat',
  },
];

/**
 * Editable featured catalog items.
 * Prices default to null ("Contact for Price") until confirmed by store management.
 */
export const PRODUCTS: ProductItem[] = [
  {
    id: 'prod-smartphone-series',
    name: 'Flagship Mobile Devices',
    categoryId: 'smartphones',
    categoryLabel: 'Smartphones',
    shortDescription: 'Current-generation smartphones curated for dependable daily communication and photography.',
    fullDescription:
      'Explore modern smartphone options through GODOLYAS ELECTRONICS. Reach out to our team by phone or inquiry form to confirm current models, storage variants, color availability, and ETB pricing.',
    priceEtb: null,
    image: smartphonesImg,
    imageAlt: 'Modern dark titanium flagship smartphone',
    inquiryNote: 'Model options and ETB pricing confirmed upon direct inquiry',
  },
  {
    id: 'prod-ultrabook-series',
    name: 'Professional Notebooks & Laptops',
    categoryId: 'laptops',
    categoryLabel: 'Laptops & Computers',
    shortDescription: 'Sleek aluminum laptops built for business productivity, university study, and remote work.',
    fullDescription:
      'Looking for a reliable notebook or desktop computing setup in Ethiopia? Speak with our staff to verify available configurations, warranty details, and current Ethiopian Birr pricing.',
    priceEtb: null,
    image: laptopsImg,
    imageAlt: 'Minimalist brushed aluminum laptop on slate surface',
    inquiryNote: 'Configurations and ETB pricing confirmed upon direct inquiry',
  },
  {
    id: 'prod-smart-display-series',
    name: 'Widescreen Smart Televisions',
    categoryId: 'displays',
    categoryLabel: 'Televisions & Displays',
    shortDescription: 'Slim-bezel living room displays delivering crisp visuals for home entertainment and presentations.',
    fullDescription:
      'Discover modern television sizes and display panels tailored to residential living rooms and commercial spaces. Contact our customer lines to confirm screen sizes currently available.',
    priceEtb: null,
    image: tvDisplaysImg,
    imageAlt: 'Frameless widescreen television in modern living room',
    inquiryNote: 'Screen sizes and ETB pricing confirmed upon direct inquiry',
  },
  {
    id: 'prod-home-appliance-series',
    name: 'Modern Home & Kitchen Appliances',
    categoryId: 'appliances',
    categoryLabel: 'Home Appliances',
    shortDescription: 'Thoughtfully engineered appliances that bring dependable convenience to daily routines.',
    fullDescription:
      'From kitchen essentials to home air care, our team helps you select appliances suited to your household needs. Call us directly to verify stocked models and current ETB pricing.',
    priceEtb: null,
    image: homeAppliancesImg,
    imageAlt: 'Stainless steel kitchen appliance and air care unit',
    inquiryNote: 'Available appliance models confirmed upon direct inquiry',
  },
  {
    id: 'prod-wireless-audio-series',
    name: 'Wireless Headphones & Personal Audio',
    categoryId: 'audio',
    categoryLabel: 'Audio & Accessories',
    shortDescription: 'Comfortable over-ear headphones and compact wireless audio gear for work and travel.',
    fullDescription:
      'Experience balanced sound and everyday portability with audio equipment and genuine accessories. Contact GODOLYAS ELECTRONICS to inquire about current models and availability.',
    priceEtb: null,
    image: audioAccessoriesImg,
    imageAlt: 'Matte black wireless headphones and charging case',
    inquiryNote: 'Audio models and ETB pricing confirmed upon direct inquiry',
  },
  {
    id: 'prod-workspace-gadgets',
    name: 'Workspace Peripherals & Storage',
    categoryId: 'gadgets',
    categoryLabel: 'Electronics & Gadgets',
    shortDescription: 'Tactile keyboards, precision mice, external drives, and reliable desk electronics.',
    fullDescription:
      'Upgrade your home or office desk setup with dependable input devices, portable storage, and essential accessories. Reach out to confirm availability with our team.',
    priceEtb: null,
    image: gadgetsComputingImg,
    imageAlt: 'Wireless mechanical keyboard, ergonomic mouse, and portable drive',
    inquiryNote: 'Accessory stock and ETB pricing confirmed upon direct inquiry',
  },
];
