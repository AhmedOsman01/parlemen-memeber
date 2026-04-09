import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

/**
 * Generate a human-readable reference number: CMP-XXXXXX
 */
function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `CMP-${code}`;
}

/**
 * Statuses: جديد → قيد المراجعة → تم التحويل → تم الحل
 */
export async function createComplaint(data) {
  const { db } = await connectToDatabase();
  const record = {
    name: data.name,
    email: data.email || '',
    phone: data.phone || '',
    category: data.category || 'عام', // شكوى, طلب خدمة, اقتراح, لقاء
    subject: data.subject,
    description: data.description,
    refNumber: generateRef(),
    status: 'جديد',
    statusHistory: [{ status: 'جديد', date: new Date(), note: 'تم استلام الطلب' }],
    adminNotes: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await db.collection('complaints').insertOne(record);
  return { id: result.insertedId.toString(), ...record, createdAt: record.createdAt.toISOString() };
}

export async function listComplaints({ page = 1, limit = 20, q = '', status = '' } = {}) {
  const { db } = await connectToDatabase();
  const query = {};
  if (q) {
    query.$or = [
      { name: { $regex: q, $options: 'i' } },
      { subject: { $regex: q, $options: 'i' } },
      { refNumber: { $regex: q, $options: 'i' } },
    ];
  }
  if (status) query.status = status;

  const total = await db.collection('complaints').countDocuments(query);
  const rows = await db.collection('complaints')
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

export async function getComplaintByRef(refNumber) {
  const { db } = await connectToDatabase();
  const record = await db.collection('complaints').findOne({ refNumber: refNumber.toUpperCase() });
  if (!record) return null;
  const { _id, ...rest } = record;
  return { ...rest, id: _id.toString(), createdAt: record.createdAt?.toISOString(), updatedAt: record.updatedAt?.toISOString() };
}

export async function updateComplaintStatus(refNumber, newStatus, note = '') {
  const { db } = await connectToDatabase();
  const result = await db.collection('complaints').updateOne(
    { refNumber },
    {
      $set: { status: newStatus, updatedAt: new Date() },
      $push: { statusHistory: { status: newStatus, date: new Date(), note } },
    }
  );
  return result.modifiedCount > 0;
}
