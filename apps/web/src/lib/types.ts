export type Category = 'Books' | 'Electronics' | 'Furniture' | 'Cycles' | 'Other';

export type Seller = {
  name: string;
  contact: string; // phone number or email
};

export type Item = {
  id: string;
  title: string;
  description: string;
  priceInr: number;
  category: Category;
  seller: Seller;
  imageUrl?: string;
  createdAt: string; // ISO date
};

export const CATEGORIES: readonly Category[] = [
  'Books',
  'Electronics',
  'Furniture',
  'Cycles',
  'Other',
] as const;

