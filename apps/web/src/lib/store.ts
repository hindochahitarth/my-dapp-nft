import { mockItems } from '@/data/mockItems';
import type { Item } from '@/lib/types';

const STORAGE_KEY = 'campus_marketplace_items_v1';

function isBrowser() {
  return typeof window !== 'undefined';
}

function safeParseItems(raw: string | null): Item[] | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed as Item[];
  } catch {
    return null;
  }
}

export function getItems(): Item[] {
  if (!isBrowser()) return mockItems;
  const fromStorage = safeParseItems(window.localStorage.getItem(STORAGE_KEY));
  if (fromStorage && fromStorage.length > 0) return fromStorage;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mockItems));
  return mockItems;
}

export function getItemById(id: string): Item | null {
  const items = getItems();
  return items.find((i) => i.id === id) ?? null;
}

export function addItem(
  input: Omit<Item, 'id' | 'createdAt'> & { id?: string; createdAt?: string }
): Item {
  if (!isBrowser()) {
    // In SSR we can't persist; still return a deterministic object.
    return {
      ...input,
      id: input.id ?? cryptoRandomId(),
      createdAt: input.createdAt ?? new Date().toISOString(),
    } as Item;
  }

  const next: Item = {
    ...input,
    id: input.id ?? cryptoRandomId(),
    createdAt: input.createdAt ?? new Date().toISOString(),
  } as Item;

  const items = getItems();
  const updated = [next, ...items];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return next;
}

export function isEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

export function toContactHref(contact: string): string {
  const trimmed = contact.trim();
  if (isEmail(trimmed)) return `mailto:${trimmed}`;
  const digits = trimmed.replace(/[^\d+]/g, '');
  return `tel:${digits}`;
}

function cryptoRandomId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

