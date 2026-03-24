'use client';

import { ItemForm } from '@/components/ItemForm';

export default function AddItemPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/30">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Add a New Listing
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Fill in the details below. Your listing is saved to localStorage (POC demo).
          </p>
        </div>

        <ItemForm />
      </div>
    </main>
  );
}

