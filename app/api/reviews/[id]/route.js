import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getCollection, COLLECTIONS } from '@/app/lib/db';
import { serializeReview } from '@/app/lib/reviews-server';

export const dynamic = 'force-dynamic';

function toObjectId(id) {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

export async function GET(request, { params }) {
  const _id = toObjectId(params.id);
  if (!_id) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  try {
    const collection = await getCollection(COLLECTIONS.REVIEWS);
    const doc = await collection.findOne({ _id });
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ review: serializeReview(doc) });
  } catch (error) {
    console.error('GET /api/reviews/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch review' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const _id = toObjectId(params.id);
  if (!_id) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  try {
    const body = await request.json();
    const allowed = ['type', 'title', 'description', 'image', 'content', 'date'];
    const update = {};
    for (const key of allowed) {
      if (body[key] !== undefined) update[key] = body[key];
    }
    update.updatedAt = new Date().toISOString();
    const collection = await getCollection(COLLECTIONS.REVIEWS);
    const result = await collection.findOneAndUpdate(
      { _id },
      { $set: update },
      { returnDocument: 'after' }
    );
    if (!result) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ review: serializeReview(result) });
  } catch (error) {
    console.error('PUT /api/reviews/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const _id = toObjectId(params.id);
  if (!_id) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  try {
    const collection = await getCollection(COLLECTIONS.REVIEWS);
    const result = await collection.deleteOne({ _id });
    if (result.deletedCount === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/reviews/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
