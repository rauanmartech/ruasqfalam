/**
 * Simple in-memory cache with TTL support.
 * Keys are stored with a timestamp; on read, stale entries are ignored.
 */
const store = new Map();

export const cache = {
  /** @param {string} key @param {any} value @param {number} ttlMs */
  set(key, value, ttlMs = 30_000) {
    store.set(key, { value, expiresAt: Date.now() + ttlMs });
  },

  /** @param {string} key @returns {any|null} */
  get(key) {
    const entry = store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) { store.delete(key); return null; }
    return entry.value;
  },

  /** @param {string} key */
  invalidate(key) {
    store.delete(key);
  },

  /** Invalidate all keys that start with prefix */
  invalidatePrefix(prefix) {
    for (const key of store.keys()) {
      if (key.startsWith(prefix)) store.delete(key);
    }
  },

  clear() {
    store.clear();
  },
};
