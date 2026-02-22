import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function createTimelineItem(data) {
    const { db } = await connectToDatabase();
    const item = {
        ...data,
        year: String(data.year),
        createdAt: new Date(),
    };
    const result = await db.collection('timeline').insertOne(item);
    return { id: result.insertedId, ...item };
}

export async function listTimelineItems() {
    const { db } = await connectToDatabase();
    const rows = await db.collection('timeline')
        .find({})
        .sort({ year: -1, createdAt: -1 })
        .toArray();
    return rows.map(r => {
        const { _id, ...rest } = r;
        return { ...rest, id: _id.toString(), createdAt: r.createdAt?.toISOString() };
    });
}

export async function getTimelineItemById(id) {
    const { db } = await connectToDatabase();
    const item = await db.collection('timeline').findOne({ _id: new ObjectId(id) });
    if (!item) return null;
    const { _id, ...rest } = item;
    return { ...rest, id: _id.toString(), createdAt: item.createdAt?.toISOString() };
}

export async function updateTimelineItem(id, data) {
    const { db } = await connectToDatabase();
    const result = await db.collection('timeline').updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...data, year: String(data.year), updatedAt: new Date() } }
    );
    return result.modifiedCount > 0;
}

export async function deleteTimelineItem(id) {
    const { db } = await connectToDatabase();
    const result = await db.collection('timeline').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}
