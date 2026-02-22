import { NextResponse } from 'next/server';
import { createNews, listNews, updateNews, deleteNews } from '@/models/newsModel';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

async function verifyAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_jwt')?.value;
    if (!token) return false;
    try {
        const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        return decoded && decoded.role === 'admin';
    } catch (err) {
        return false;
    }
}

export async function GET(request) {
    if (!await verifyAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const data = await listNews({ q, page, limit });
    return NextResponse.json(data);
}

export async function POST(request) {
    if (!await verifyAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const result = await createNews(body);
    return NextResponse.json(result);
}

export async function PUT(request) {
    if (!await verifyAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const { id, ...data } = body;
    const success = await updateNews(id, data);
    return NextResponse.json({ success });
}

export async function DELETE(request) {
    if (!await verifyAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const success = await deleteNews(id);
    return NextResponse.json({ success });
}
