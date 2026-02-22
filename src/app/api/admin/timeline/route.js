import { NextResponse } from 'next/server';
import { createTimelineItem, listTimelineItems, updateTimelineItem, deleteTimelineItem } from '@/models/timelineModel';
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

export async function GET() {
    if (!await verifyAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const data = await listTimelineItems();
    return NextResponse.json(data);
}

export async function POST(request) {
    if (!await verifyAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const result = await createTimelineItem(body);
    return NextResponse.json(result);
}

export async function PUT(request) {
    if (!await verifyAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const { id, ...data } = body;
    const success = await updateTimelineItem(id, data);
    return NextResponse.json({ success });
}

export async function DELETE(request) {
    if (!await verifyAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const success = await deleteTimelineItem(id);
    return NextResponse.json({ success });
}
