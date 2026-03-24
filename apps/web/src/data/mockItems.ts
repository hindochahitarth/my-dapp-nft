import type { Item } from '@/lib/types';

export const mockItems: Item[] = [
  {
    id: '1',
    title: 'Engineering Mathematics Textbook',
    description:
      'Well-maintained engineering mathematics textbook with minimal highlighting. Great for SEM exams and practice problems.',
    priceInr: 250,
    category: 'Books',
    seller: { name: 'Raj Patel', contact: '9876543210' },
    imageUrl: 'https://placehold.co/800x600/png?text=Math+Textbook',
    createdAt: new Date('2026-03-01T10:00:00.000Z').toISOString(),
  },
  {
    id: '2',
    title: 'Casio FX-991ES Calculator',
    description:
      'Original Casio FX-991ES scientific calculator. All buttons working, display clear. Includes cover.',
    priceInr: 400,
    category: 'Electronics',
    seller: { name: 'Priya Shah', contact: '9123456789' },
    imageUrl: 'https://placehold.co/800x600/png?text=Calculator',
    createdAt: new Date('2026-03-03T12:30:00.000Z').toISOString(),
  },
  {
    id: '3',
    title: 'Hero Cycle (used 1 year)',
    description:
      'Smooth ride, recently serviced. Ideal for campus commute. Minor cosmetic scratches, no functional issues.',
    priceInr: 2500,
    category: 'Cycles',
    seller: { name: 'Amit Kumar', contact: '9988776655' },
    imageUrl: 'https://placehold.co/800x600/png?text=Hero+Cycle',
    createdAt: new Date('2026-03-05T08:15:00.000Z').toISOString(),
  },
  {
    id: '4',
    title: 'Wooden Study Chair',
    description:
      'Comfortable wooden study chair with sturdy back support. Perfect for hostel/study room setup.',
    priceInr: 800,
    category: 'Furniture',
    seller: { name: 'Sneha Mehta', contact: '9765432109' },
    imageUrl: 'https://placehold.co/800x600/png?text=Study+Chair',
    createdAt: new Date('2026-03-06T16:45:00.000Z').toISOString(),
  },
  {
    id: '5',
    title: 'Data Structures Book (Cormen)',
    description:
      'Cormen (CLRS) reference book in good condition. A few notes on margins. Great for DSA prep.',
    priceInr: 350,
    category: 'Books',
    seller: { name: 'Rohan Joshi', contact: '9654321098' },
    imageUrl: 'https://placehold.co/800x600/png?text=CLRS+Book',
    createdAt: new Date('2026-03-08T09:20:00.000Z').toISOString(),
  },
  {
    id: '6',
    title: 'Scientific Lab Coat (Medium)',
    description:
      'Medium-size lab coat, clean and ready to use. Used for one semester only.',
    priceInr: 150,
    category: 'Other',
    seller: { name: 'Kavya Nair', contact: '9543210987' },
    imageUrl: 'https://placehold.co/800x600/png?text=Lab+Coat',
    createdAt: new Date('2026-03-10T11:05:00.000Z').toISOString(),
  },
];

