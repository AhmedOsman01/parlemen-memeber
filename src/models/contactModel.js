import { connectToDatabase } from "@/lib/mongodb";

/**
 * Contact model functions
 */
import { ObjectId } from "mongodb";

export async function createContactRecord(payload) {
  const { db } = await connectToDatabase();
  const coll = db.collection("contacts");
  const now = new Date();
  const doc = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone || "",
    subject: payload.subject,
    message: payload.message,
    createdAt: now,
  };
  const res = await coll.insertOne(doc);
  return { id: res.insertedId.toString(), ...doc };
}

/**
 * List contacts with optional pagination and query filter.
 *
 * options: { page = 1, limit = 50, q }
 */
export async function listContacts(options = {}) {
  const { page = 1, limit = 50, q } = options;
  const skip = Math.max(0, (Number(page) - 1) * Number(limit));
  const { db } = await connectToDatabase();
  const coll = db.collection("contacts");
  const filter = {};
  if (q) {
    // text search across name, email, subject, message
    const re = new RegExp(q, "i");
    filter.$or = [
      { name: re },
      { email: re },
      { subject: re },
      { message: re },
    ];
  }
  const cursor = coll.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
  const rows = await cursor.toArray();
  const total = await coll.countDocuments(filter);
  return { rows: rows.map((r) => ({ id: String(r._id), ...r })), total };
}

export async function getContactById(id) {
  const { db } = await connectToDatabase();
  const coll = db.collection("contacts");
  let objId;
  try {
    objId = new ObjectId(id);
  } catch (e) {
    return null;
  }
  const row = await coll.findOne({ _id: objId });
  return row ? { id: String(row._id), ...row } : null;
}
