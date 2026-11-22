import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatPriceEtb,
  filterProducts,
  buildTelHref,
  buildWhatsAppInquiryUrl,
  validateContactForm,
  buildInquiryMessage,
} from './commerce';
import type { ProductItem } from '../data/catalog';

const SAMPLE_PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    name: 'Flagship Mobile Devices',
    categoryId: 'smartphones',
    categoryLabel: 'Smartphones',
    shortDescription: 'Modern mobile phones.',
    fullDescription: 'Full description for smartphones.',
    priceEtb: null,
    image: 'img1.jpg',
    imageAlt: 'Smartphone',
    inquiryNote: 'Confirm in store',
  },
  {
    id: 'p2',
    name: 'Professional Notebooks',
    categoryId: 'laptops',
    categoryLabel: 'Laptops & Computers',
    shortDescription: 'Aluminum laptops for business.',
    fullDescription: 'Full description for laptops.',
    priceEtb: 85000,
    image: 'img2.jpg',
    imageAlt: 'Laptop',
    inquiryNote: 'Confirm in store',
  },
];

test('formatPriceEtb displays Contact for Price when null or invalid', () => {
  assert.equal(formatPriceEtb(null), 'Contact for Price');
  assert.equal(formatPriceEtb(undefined), 'Contact for Price');
  assert.equal(formatPriceEtb(0), 'Contact for Price');
  assert.equal(formatPriceEtb(-500), 'Contact for Price');
});

test('formatPriceEtb formats numeric Ethiopian Birr amounts properly', () => {
  assert.equal(formatPriceEtb(45000), 'ETB 45,000');
  assert.equal(formatPriceEtb(1250.4), 'ETB 1,250');
});

test('filterProducts filters by category and search query accurately', () => {
  assert.equal(filterProducts(SAMPLE_PRODUCTS, { categoryId: 'all', searchQuery: '' }).length, 2);
  assert.equal(
    filterProducts(SAMPLE_PRODUCTS, { categoryId: 'smartphones', searchQuery: '' }).length,
    1
  );
  assert.equal(
    filterProducts(SAMPLE_PRODUCTS, { categoryId: 'all', searchQuery: 'aluminum' })[0]?.id,
    'p2'
  );
  assert.equal(
    filterProducts(SAMPLE_PRODUCTS, { categoryId: 'smartphones', searchQuery: 'aluminum' }).length,
    0
  );
});

test('buildTelHref cleans phone formatting safely', () => {
  assert.equal(buildTelHref('0116597020'), 'tel:0116597020');
  assert.equal(buildTelHref('096 031 8181'), 'tel:0960318181');
  assert.equal(buildTelHref('+251 11 659 7030'), 'tel:+251116597030');
});

test('buildWhatsAppInquiryUrl respects unconfigured vs configured numbers', () => {
  assert.equal(buildWhatsAppInquiryUrl('', 'Hello'), null);
  assert.equal(buildWhatsAppInquiryUrl('123', 'Hello'), null);
  assert.equal(
    buildWhatsAppInquiryUrl('+251 96 031 8181', 'Hello Godolyas'),
    'https://wa.me/251960318181?text=Hello%20Godolyas'
  );
});

test('validateContactForm rejects incomplete inputs and accepts valid phone or email', () => {
  const emptyErrors = validateContactForm({
    fullName: '',
    contactInfo: '',
    interest: 'General Inquiry',
    message: 'Hi',
  });
  assert.ok(emptyErrors.fullName);
  assert.ok(emptyErrors.contactInfo);
  assert.ok(emptyErrors.message);

  const badContact = validateContactForm({
    fullName: 'Abebe Bikila',
    contactInfo: 'abc',
    interest: 'Smartphones',
    message: 'Checking availability for smartphones.',
  });
  assert.ok(badContact.contactInfo);

  const validPhone = validateContactForm({
    fullName: 'Sara Tadesse',
    contactInfo: '0960318181',
    interest: 'Smartphones',
    message: 'I would like to check current smartphone availability.',
  });
  assert.deepEqual(validPhone, {});

  const validEmail = validateContactForm({
    fullName: 'Dawit Mekonnen',
    contactInfo: 'dawit@example.com',
    interest: 'Laptops & Computers',
    message: 'Please share pricing and models for office laptops.',
  });
  assert.deepEqual(validEmail, {});
});

test('buildInquiryMessage constructs clean inquiry copy', () => {
  const msg = buildInquiryMessage({
    productName: 'Flagship Mobile Devices',
    categoryLabel: 'Smartphones',
  });
  assert.match(msg, /GODOLYAS ELECTRONICS/);
  assert.match(msg, /Flagship Mobile Devices \(Smartphones\)/);
});
