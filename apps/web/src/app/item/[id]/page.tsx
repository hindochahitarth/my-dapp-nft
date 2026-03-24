'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getItemById, toContactHref } from '@/lib/store';

export default function ItemDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';

  const item = useMemo(() => (id ? getItemById(id) : null), [id]);

  if (!item) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950/30">
          <div className="text-lg font-bold text-slate-900 dark:text-slate-50">Item not found</div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            The listing may have been removed or the link is incorrect.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-900/40"
            >
              Back to Browse
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const contactHref = toContactHref(item.seller.contact);
  const contactLabel = contactHref.startsWith('mailto:') ? 'Email Seller' : 'Call Seller';

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="mb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-900/40"
        >
          ← Back
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950/30 lg:col-span-3">
          <div className="aspect-[4/3] w-full bg-slate-100 dark:bg-slate-900">
            <img
              src={item.imageUrl || 'https://placehold.co/1200x900/png?text=Campus+Item'}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">{item.category}</div>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 md:text-3xl">
              {item.title}
            </h1>
            <div className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">
              ₹{item.priceInr}
            </div>
            <div className="mt-5">
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Description</div>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/30">
            <div className="text-base font-bold text-slate-900 dark:text-slate-50">Seller</div>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
              <div className="text-sm text-slate-600 dark:text-slate-300">Name</div>
              <div className="text-base font-semibold text-slate-900 dark:text-slate-50">{item.seller.name}</div>
              <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">Contact</div>
              <div className="text-base font-semibold text-slate-900 dark:text-slate-50">{item.seller.contact}</div>
            </div>

            <a
              href={contactHref}
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-accent-amber px-5 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-accent-amber/50"
            >
              Contact Seller ({contactLabel})
            </a>

            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              This is a POC: contact opens your phone/email app.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

