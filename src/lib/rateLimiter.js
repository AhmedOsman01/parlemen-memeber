// Optional Redis-backed rate limiter for contact submissions.
// Falls back to a simple in-memory limiter when Redis or the redis package is not available.

let _redisClient = null;

async function getRedisClient() {
  if (_redisClient) return _redisClient;
  if (!process.env.REDIS_URL) return null;
  try {
    // dynamic require - optional dependency
    const redis = require("redis");
    _redisClient = redis.createClient({ url: process.env.REDIS_URL });
    // connect may be async
    if (typeof _redisClient.connect === "function") {
      await _redisClient.connect();
    }
    return _redisClient;
  } catch (e) {
    console.warn("Redis client not available, falling back to in-memory rate limiter");
    _redisClient = null;
    return null;
  }
}

export async function consumeContactRate(ip) {
  const max = Number(process.env.CONTACT_RATE_LIMIT_MAX) || 5;
  const windowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS) || 60 * 60 * 1000;
  const windowSec = Math.max(1, Math.floor(windowMs / 1000));

  const client = await getRedisClient();
  if (client) {
    try {
      const key = `rate:contact:${ip}`;
      const cur = await client.incr(key);
      if (cur === 1) {
        // set expiry to window
        await client.expire(key, windowSec);
      }
      const ttl = await client.ttl(key);
      return {
        allowed: cur <= max,
        remaining: Math.max(0, max - cur),
        reset: Date.now() + (ttl > 0 ? ttl : windowSec) * 1000,
      };
    } catch (err) {
      console.error("Redis rate limiter error, falling back to memory", err);
      // fallthrough to memory
      _redisClient = null;
    }
  }

  // In-memory fallback (suitable for single-instance / development only)
  const map = global._contactRateMap || (global._contactRateMap = new Map());
  const now = Date.now();
  const state = map.get(ip) || { count: 0, resetAt: now + windowMs };
  if (now > state.resetAt) {
    state.count = 0;
    state.resetAt = now + windowMs;
  }
  state.count += 1;
  map.set(ip, state);
  return {
    allowed: state.count <= max,
    remaining: Math.max(0, max - state.count),
    reset: state.resetAt,
  };
}
