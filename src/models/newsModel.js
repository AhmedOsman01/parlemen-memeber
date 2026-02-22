import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function createNews(data) {
    const { db } = await connectToDatabase();
    const news = {
        ...data,
        slug: data.slug || data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const result = await db.collection('news').insertOne(news);
    return { id: result.insertedId, ...news };
}

export async function listNews({ page = 1, limit = 10, q = '' } = {}) {
    const { db } = await connectToDatabase();
    const query = q ? { $or: [{ title: { $regex: q, $options: 'i' } }, { excerpt: { $regex: q, $options: 'i' } }] } : {};

    const total = await db.collection('news').countDocuments(query);
    const rows = await db.collection('news')
        .find(query)
        .sort({ date: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();

    return { rows: rows.map(r => ({ ...r, id: r._id.toString() })), total };
}

export async function getNewsBySlug(slug) {
    const { db } = await connectToDatabase();
    const article = await db.collection('news').findOne({ slug });
    if (!article) return null;
    return { ...article, id: article._id.toString() };
}

export async function updateNews(id, data) {
    const { db } = await connectToDatabase();
    const result = await db.collection('news').updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...data, updatedAt: new Date() } }
    );
    return result.modifiedCount > 0;
}

export async function deleteNews(id) {
    const { db } = await connectToDatabase();
    const result = await db.collection('news').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}
