import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

/**
 * Generate a human-readable reference number: ASK-XXXXXX
 */
function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `ASK-${code}`;
}

export async function createAskMP(data) {
  const { db } = await connectToDatabase();
  const record = {
    name: data.name,
    email: data.email || '',
    question: data.question,
    refNumber: generateRef(),
    status: 'جديد', // جديد → قيد المراجعة → تم الرد
    reply: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await db.collection('askmp').insertOne(record);
  return { id: result.insertedId.toString(), ...record, createdAt: record.createdAt.toISOString() };
}

export async function listAskMP({ page = 1, limit = 20, q = '' } = {}) {
  const { db } = await connectToDatabase();
  const query = q ? { $or: [{ name: { $regex: q, $options: 'i' } }, { question: { $regex: q, $options: 'i' } }] } : {};
  const total = await db.collection('askmp').countDocuments(query);
  const rows = await db.collection('askmp')
    .find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  return {
    rows: rows.map(r => {
      const { _id, ...rest } = r;
      return { ...rest, id: _id.toString(), createdAt: r.createdAt?.toISOString(), updatedAt: r.updatedAt?.toISOString() };
    }),
    total,
  };
}

export async function getAskMPByRef(refNumber) {
  const { db } = await connectToDatabase();
  const record = await db.collection('askmp').findOne({ refNumber });
  if (!record) return null;
  const { _id, ...rest } = record;
  return { ...rest, id: _id.toString(), createdAt: record.createdAt?.toISOString(), updatedAt: record.updatedAt?.toISOString() };
}
