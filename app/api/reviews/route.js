import { NextResponse } from 'next/server';
import { getCollection, COLLECTIONS } from '@/app/lib/db';
import { serializeReview } from '@/app/lib/reviews-server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '0', 10);
    const collection = await getCollection(COLLECTIONS.REVIEWS);
    const query = type ? { type } : {};
    let cursor = collection.find(query).sort({ createdAt: -1 });
    if (limit > 0) cursor = cursor.limit(limit);
    const docs = await cursor.toArray();
    return NextResponse.json({ reviews: docs.map(serializeReview) });
  } catch (error) {
    console.error('GET /api/reviews error:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, title, description, image = '', content = '', date = '' } = body;
    if (!type || !title || !description) {
      return NextResponse.json({ error: 'type, title and description are required' }, { status: 400 });
    }
    const collection = await getCollection(COLLECTIONS.REVIEWS);
    const doc = {
      type,
      title,
      description,
      image,
      content,
      date,
      likes: 0,
      dislikes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const result = await collection.insertOne(doc);
    return NextResponse.json({ review: serializeReview({ _id: result.insertedId, ...doc }) }, { status: 201 });
  } catch (error) {
    console.error('POST /api/reviews error:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
