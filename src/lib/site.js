export const BRAND = {
  name: 'Doorix',
  tagline: 'Premium Door Designs for Your Space',
  city: 'Lahore, Pakistan',
  intro:
    'Doorix supplies wooden entrance doors, interior doors and custom-made doors to homes across Lahore, Pakistan.',
};

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop', mega: true },
  { label: 'Custom Door', to: '/custom-door' },
  { label: 'About', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

export function formatPKR(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return `PKR ${n.toLocaleString('en-PK')}`;
}

export function priceLabel(product) {
  if (!product) return 'Request Pricing';
  if (product.price_on_request) return 'Request Pricing';
  return formatPKR(product.price) || 'Request Pricing';
}

export function slugify(value = '') {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function waLink(number, message) {
  const digits = String(number || '').replace(/\D/g, '');
  if (digits.length < 9) return null;
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

export function productInquiryText(product) {
  const parts = [`Assalam o Alaikum Doorix, I would like a quotation for:`];
  if (product?.name) parts.push(`Door: ${product.name}`);
  if (product?.sku) parts.push(`Code: ${product.sku}`);
  return parts.join('\n');
}

export function availabilityTone(status) {
  if (status === 'In Stock') return 'text-copper';
  if (status === 'Made to Order') return 'text-bronze';
  return 'text-clay';
}