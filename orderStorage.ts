// ─── Order Storage ───────────────────────────────────────────────────────────
// Uses localStorage to persist per-location order counters and order history.
// Key: "bakers_order_data"

export interface StoredOrder {
  orderId: string;
  name: string;
  phone: string;
  location: string;
  address: string;
  items: { name: string; weight: string; quantity: number; price: number }[];
  total: number;
  timestamp: string;
}

interface OrderData {
  counters: Record<string, number>; // e.g. { MG: 5, RE: 12 }
  orders: StoredOrder[];
}

const STORAGE_KEY = 'bakers_order_data';

function load(): OrderData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as OrderData;
  } catch {
    // corrupted data — reset
  }
  return { counters: {}, orders: [] };
}

function save(data: OrderData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** Returns the NEXT sequential number for the given location code (does NOT increment). */
export function peekNextOrderNumber(locationCode: string): number {
  const data = load();
  return (data.counters[locationCode] ?? 0) + 1;
}

/** Formats a location code + number into the canonical Order ID string. */
export function formatOrderId(locationCode: string, num: number): string {
  return `BAKERS-${locationCode}-${String(num).padStart(3, '0')}`;
}

/**
 * Saves the order and increments the counter.
 * Returns the final confirmed Order ID.
 */
export function commitOrder(order: Omit<StoredOrder, 'orderId' | 'timestamp'>, locationCode: string): string {
  const data = load();
  const num = (data.counters[locationCode] ?? 0) + 1;
  data.counters[locationCode] = num;

  const orderId = formatOrderId(locationCode, num);
  data.orders.push({ ...order, orderId, timestamp: new Date().toISOString() });
  save(data);
  return orderId;
}

/** Returns all stored orders (for admin/debugging purposes). */
export function getAllOrders(): StoredOrder[] {
  return load().orders;
}
