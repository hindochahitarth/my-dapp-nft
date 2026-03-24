'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addItem } from '@/lib/store';
import { CATEGORIES, type Category } from '@/lib/types';

type FormState = {
  title: string;
  description: string;
  priceInr: string;
  category: Category;
  sellerName: string;
  sellerContact: string;
  imageUrl: string;
};

const initialState: FormState = {
  title: '',
  description: '',
  priceInr: '',
  category: 'Books',
  sellerName: '',
  sellerContact: '',
  imageUrl: '',
};

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="mb-1 flex items-center gap-2">
      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
        {children}
      </span>
      {required ? (
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          Required
        </span>
      ) : null}
    </div>
  );
}

export function ItemForm() {
  const router = useRouter();
  const [state, setState] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const priceNumber = useMemo(() => {
    const n = Number(state.priceInr);
    return Number.isFinite(n) ? n : NaN;
  }, [state.priceInr]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const title = state.title.trim();
    const description = state.description.trim();
    const sellerName = state.sellerName.trim();
    const sellerContact = state.sellerContact.trim();
    const imageUrl = state.imageUrl.trim();

    if (!title || !description || !sellerName || !sellerContact) {
      setError('Please fill all required fields.');
      return;
    }
    if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
      setError('Please enter a valid price (₹).');
      return;
    }

    setSubmitting(true);
    try {
      addItem({
        title,
        description,
        priceInr: Math.round(priceNumber),
        category: state.category,
        seller: { name: sellerName, contact: sellerContact },
        imageUrl: imageUrl || undefined,
      });
      router.push('/');
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <FieldLabel required>Title</FieldLabel>
          <input
            value={state.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="e.g., Engineering Mathematics Textbook"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-primary-300 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-50 dark:focus:ring-primary-800/50"
            required
          />
        </div>

        <div className="md:col-span-2">
          <FieldLabel required>Description</FieldLabel>
          <textarea
            value={state.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="Add details like condition, pickup location, etc."
            rows={5}
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-primary-300 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-50 dark:focus:ring-primary-800/50"
            required
          />
        </div>

        <div>
          <FieldLabel required>Price (₹)</FieldLabel>
          <input
            value={state.priceInr}
            onChange={(e) => update('priceInr', e.target.value)}
            inputMode="numeric"
            placeholder="e.g., 250"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-primary-300 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-50 dark:focus:ring-primary-800/50"
            required
          />
        </div>

        <div>
          <FieldLabel required>Category</FieldLabel>
          <select
            value={state.category}
            onChange={(e) => update('category', e.target.value as Category)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-primary-300 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-50 dark:focus:ring-primary-800/50"
            required
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel required>Seller Name</FieldLabel>
          <input
            value={state.sellerName}
            onChange={(e) => update('sellerName', e.target.value)}
            placeholder="e.g., Raj Patel"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-primary-300 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-50 dark:focus:ring-primary-800/50"
            required
          />
        </div>

        <div>
          <FieldLabel required>Seller Phone/Email</FieldLabel>
          <input
            value={state.sellerContact}
            onChange={(e) => update('sellerContact', e.target.value)}
            placeholder="e.g., 9876543210 or name@email.com"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-primary-300 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-50 dark:focus:ring-primary-800/50"
            required
          />
        </div>

        <div className="md:col-span-2">
          <FieldLabel>Image URL (optional)</FieldLabel>
          <input
            value={state.imageUrl}
            onChange={(e) => update('imageUrl', e.target.value)}
            placeholder="https://..."
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-primary-300 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-50 dark:focus:ring-primary-800/50"
          />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Tip: leave empty to use a placeholder image.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-900/40"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? 'Saving…' : 'Add Listing'}
        </button>
      </div>
    </form>
  );
}

