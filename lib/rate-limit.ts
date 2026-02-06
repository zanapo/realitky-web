type RateLimitEntry = {
  count: number;
  expiresAt: number;
};

const store = new Map<string, RateLimitEntry>();

export const rateLimit = (
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000
) => {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || entry.expiresAt < now) {
    store.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }
  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }
  entry.count += 1;
  store.set(key, entry);
  return { allowed: true, remaining: Math.max(limit - entry.count, 0) };
};
