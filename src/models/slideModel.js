import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function createSlide(data) {
    const { db } = await connectToDatabase();
    const slide = {
        ...data,
        order: Number(data.order || 0),
        createdAt: new Date(),
    };
    const result = await db.collection('slides').insertOne(slide);
    return { id: result.insertedId, ...slide };
}

export async function listSlides() {
    const { db } = await connectToDatabase();
    const rows = await db.collection('slides')
        .find({})
        .sort({ order: 1, createdAt: -1 })
        .toArray();
    return rows.map(r => ({ ...r, id: r._id.toString() }));
}

export async function updateSlide(id, data) {
    const { db } = await connectToDatabase();
    const result = await db.collection('slides').updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...data, order: Number(data.order || 0), updatedAt: new Date() } }
    );
    return result.modifiedCount > 0;
}

export async function deleteSlide(id) {
    const { db } = await connectToDatabase();
    const result = await db.collection('slides').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}
