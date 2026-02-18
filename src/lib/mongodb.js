// MongoDB connection helper for Next.js App Router APIs
// Uses a cached global connection to avoid reconnecting in development/hot reloads.
let cached = global._mongo;
if (!cached) cached = global._mongo = { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI environment variable");

  if (!cached.promise) {
    // dynamic import so bundlers don't require 'mongodb' unless used server-side
    cached.promise = (async () => {
      const { MongoClient } = await import('mongodb');
      const client = new MongoClient(uri, {}
      );
      await client.connect();
      const dbName = process.env.MONGODB_DB || undefined;
      const db = dbName ? client.db(dbName) : client.db();
      return { client, db };
    })();
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
