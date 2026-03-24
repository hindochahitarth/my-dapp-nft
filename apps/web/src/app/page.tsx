'use client';

import { useEffect, useMemo, useState } from 'react';
import { ItemCard } from '@/components/ItemCard';
import { getItems } from '@/lib/store';
import type { Category, Item } from '@/lib/types';

type FilterCategory = 'All' | Category;

const FILTERS: readonly FilterCategory[] = [
  'All',
  'Books',
  'Electronics',
  'Furniture',
  'Cycles',
  'Other',
] as const;

function filterPillClass(active: boolean) {
  if (active) {
    return 'bg-primary-600 text-white shadow-sm';
  }
  return 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-950/30 dark:text-slate-200 dark:ring-slate-800 dark:hover:bg-slate-900/40';
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [category, setCategory] = useState<FilterCategory>('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setItems(getItems());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === 'All' ? true : item.category === category;
      const matchesQuery = q ? item.title.toLowerCase().includes(q) : true;
      return matchesCategory && matchesQuery;
    });
  }, [items, category, query]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/30">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 md:text-3xl">
                Browse Listings
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Find great deals from fellow students. Filter by category or search by title.
              </p>
            </div>

            <div className="w-full md:max-w-sm">
              <label className="mb-1 block text-sm font-semibold text-slate-800 dark:text-slate-100">
                Search
              </label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search items..."
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-primary-300 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-50 dark:focus:ring-primary-800/50"
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
              Categories
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((c) => {
                const active = c === category;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={[
                      'rounded-full px-4 py-2 text-sm font-semibold transition',
                      filterPillClass(active),
                    ].join(' ')}
                    aria-pressed={active}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-slate-600 dark:text-slate-300">
            Showing <span className="font-semibold text-slate-900 dark:text-slate-50">{filtered.length}</span>{' '}
            item{filtered.length === 1 ? '' : 's'}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-950/30">
            <div className="text-base font-semibold text-slate-900 dark:text-slate-50">
              No items found
            </div>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Try a different category or search term.
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}