import { HERO_IMAGES } from '@/lib/media';

export const heroSlides = [
  {
    id: 'entrance',
    image: HERO_IMAGES[0],
    alt: 'Modern walnut entrance door at the entrance of a contemporary home in Lahore',
    eyebrow: 'DOORIX · LAHORE',
    title: 'Make Every Entrance Remarkable.',
    description:
      'Discover beautifully designed doors that bring character, style, and quality to your space.',
    primary: { label: 'Shop Entrance Doors', to: '/category/main-entrance-doors' },
    secondary: { label: 'Explore All Doors', to: '/shop' },
  },
  {
    id: 'interior',
    image: HERO_IMAGES[1],
    alt: 'Warm interior hallway with tall contemporary oak interior doors',
    eyebrow: 'DESIGNED FOR YOUR INTERIOR',
    title: 'Beautiful Doors. Thoughtful Details.',
    description: "Explore door designs and finishes to complement your home's style.",
    primary: { label: 'Explore Interior Doors', to: '/category/interior-doors' },
    secondary: { label: 'Browse Collections', to: '/categories' },
  },
  {
    id: 'custom',
    image: HERO_IMAGES[2],
    alt: 'Close-up of hand-finished walnut with a brushed bronze door handle',
    eyebrow: 'MADE TO YOUR REQUIREMENTS',
    title: 'Your Design. Your Dimensions.',
    description:
      'Looking for a particular size, material, or finish? Tell us what you need and request a custom door quotation.',
    primary: { label: 'Order a Custom Door', to: '/custom-door' },
    secondary: { label: 'Talk to Our Team', to: '/contact' },
  },
];