'use client';

import Link from 'next/link';
import type { Item } from '@/lib/types';

function categoryBadgeClass(category: Item['category']) {
  switch (category) {
    case 'Books':
      return 'bg-primary-50 text-primary-800 ring-primary-200 dark:bg-primary-950/40 dark:text-primary-200 dark:ring-primary-800/60';
    case 'Electronics':
      return 'bg-cyan-50 text-cyan-800 ring-cyan-200 dark:bg-cyan-950/30 dark:text-cyan-200 dark:ring-cyan-800/60';
    case 'Furniture':
      return 'bg-amber-50 text-amber-900 ring-amber-200 dark:bg-amber-950/30 dark:text-amber-200 dark:ring-amber-800/60';
    case 'Cycles':
      return 'bg-lime-50 text-lime-900 ring-lime-200 dark:bg-lime-950/30 dark:text-lime-200 dark:ring-lime-800/60';
    default:
      return 'bg-slate-50 text-slate-800 ring-slate-200 dark:bg-slate-900/60 dark:text-slate-200 dark:ring-slate-700';
  }
}

export function ItemCard({ item }: { item: Item }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/30">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        {/* Using plain img for simple placeholder URL support */}
        <img
          src={item.imageUrl || 'https://placehold.co/800x600/png?text=Campus+Item'}
          alt={item.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute left-3 top-3">
          <span
            className={[
              'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
              categoryBadgeClass(item.category),
            ].join(' ')}
          >
            {item.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-50">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Seller: <span className="font-medium text-slate-800 dark:text-slate-100">{item.seller.name}</span>
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            ₹{item.priceInr}
          </div>
          <Link
            href={`/item/${encodeURIComponent(item.id)}`}
            className="inline-flex items-center justify-center rounded-xl border border-primary-200 bg-primary-50 px-3 py-2 text-sm font-semibold text-primary-800 transition hover:bg-primary-100 dark:border-primary-900/40 dark:bg-primary-950/40 dark:text-primary-200 dark:hover:bg-primary-950/60"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

