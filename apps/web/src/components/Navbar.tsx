'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={[
        'text-sm font-medium transition-colors',
        active ? 'text-primary-700 dark:text-primary-200' : 'text-slate-700 hover:text-primary-700 dark:text-slate-200 dark:hover:text-primary-200',
      ].join(' ')}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
              CM
            </span>
            <div className="leading-tight">
              <div className="text-base font-semibold text-slate-900 dark:text-slate-50">
                Campus Marketplace
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Buy & sell within campus
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-3 md:flex">
            <NavLink href="/" label="Browse" />
            <NavLink href="/add-item" label="Add Item" />
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/add-item"
            className="inline-flex items-center justify-center rounded-xl bg-accent-amber px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-accent-amber/50"
          >
            + Add Item
          </Link>
        </div>
      </div>
    </header>
  );
}

