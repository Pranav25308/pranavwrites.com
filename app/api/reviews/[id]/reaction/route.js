import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getCollection, COLLECTIONS } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request, { params }) {
  let _id;
  try {
    _id = new ObjectId(params.id);
  } catch {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  try {
    const { action, previous = null } = await request.json();
    if (!['like', 'dislike', 'none'].includes(action)) {
      return NextResponse.json({ error: 'action must be like, dislike or none' }, { status: 400 });
    }
    const inc = {};
    if (action === 'like') inc.likes = 1;
    if (action === 'dislike') inc.dislikes = 1;
    if (previous === 'like') inc.likes = (inc.likes || 0) - 1;
    if (previous === 'dislike') inc.dislikes = (inc.dislikes || 0) - 1;

    const collection = await getCollection(COLLECTIONS.REVIEWS);
    if (Object.keys(inc).length > 0) {
      await collection.updateOne({ _id }, { $inc: inc });
      await collection.updateOne({ _id, likes: { $lt: 0 } }, { $set: { likes: 0 } });
      await collection.updateOne({ _id, dislikes: { $lt: 0 } }, { $set: { dislikes: 0 } });
    }
    const doc = await collection.findOne({ _id }, { projection: { likes: 1, dislikes: 1 } });
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ likes: doc.likes || 0, dislikes: doc.dislikes || 0 });
  } catch (error) {
    console.error('POST /api/reviews/[id]/reaction error:', error);
    return NextResponse.json({ error: 'Failed to save reaction' }, { status: 500 });
  }
}
