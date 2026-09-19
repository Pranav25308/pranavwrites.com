import { NextResponse } from 'next/server';
import { getCollection } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

const VISITS_COLLECTION = 'visits';

// Handle POST requests to record a new visit log in the database
export async function POST(request) {
  try {
    // Parse page name and unique visitor ID from the request payload
    const { page, visitorId } = await request.json();
    if (!page || !visitorId) {
      return NextResponse.json({ error: 'page and visitorId are required' }, { status: 400 });
    }
    // Retrieve the visits collection from the database
    // const collection = await getCollection(VISITS_COLLECTION);
    // Insert the visit log with a timestamp
    // await collection.insertOne({
    //   page,
    //   visitorId,
    //   createdAt: new Date().toISOString(),
    // });
    // Return a success response
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('POST /api/visits error:', error);
    return NextResponse.json({ error: 'Failed to track visit' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const collection = await getCollection(VISITS_COLLECTION);
    const [totalVisits, uniqueVisitorIds, pageAgg] = await Promise.all([
      collection.countDocuments({}),
      collection.distinct('visitorId'),
      collection
        .aggregate([
          { $group: { _id: '$page', views: { $sum: 1 } } },
          { $sort: { views: -1 } },
        ])
        .toArray(),
    ]);

    const topPages = pageAgg.map((p) => ({ page: p._id, views: p.views }));
    return NextResponse.json({
      totalVisits,
      uniqueVisitors: uniqueVisitorIds.length,
      topPages,
    });
  } catch (error) {
    console.error('GET /api/visits error:', error);
    return NextResponse.json({ totalVisits: 0, uniqueVisitors: 0, topPages: [] });
  }
}
