// Server-side review helpers (shared by API routes and server pages)
import { ObjectId } from 'mongodb';
import { getCollection, COLLECTIONS } from '@/app/lib/db';

export function serializeReview(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id.toString(), likes: 0, dislikes: 0, ...rest };
}

export async function getReviewById(id, type) {
  try {
    const collection = await getCollection(COLLECTIONS.REVIEWS);
    const query = { _id: new ObjectId(id) };
    if (type) query.type = type;
    const doc = await collection.findOne(query);
    return serializeReview(doc);
  } catch {
    return null;
  }
}
