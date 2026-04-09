// MongoDB connection helper for Next.js App Router APIs
// Uses a cached global connection to avoid reconnecting in development/hot reloads.
// Includes timeout and graceful failure handling.
let cached = global._mongo;
if (!cached) cached = global._mongo = { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI environment variable");

  if (!cached.promise) {
    cached.promise = (async () => {
      const { MongoClient } = await import('mongodb');
      const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,  // 5s timeout instead of default 30s
        connectTimeoutMS: 5000,
        socketTimeoutMS: 10000,
      });
      await client.connect();
      const dbName = process.env.MONGODB_DB || undefined;
      const db = dbName ? client.db(dbName) : client.db();
      return { client, db };
    })();
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    // Reset the promise so next call will retry
    cached.promise = null;
    cached.conn = null;
    throw err;
  }
}
