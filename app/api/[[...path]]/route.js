import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const client = new MongoClient(process.env.MONGO_URL);
let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db('portfolio');
  }
  return db;
}

// Admin credentials (in production, use hashed passwords)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

export async function GET(request, { params }) {
  try {
    const db = await connectDB();
    const path = params.path?.join('/') || '';
    const url = new URL(request.url);

    // Get all reviews or filter by type
    if (path === 'reviews') {
      const type = url.searchParams.get('type');
      const query = type ? { type } : {};
      const reviews = await db.collection('reviews')
        .find(query)
        .sort({ date: -1 })
        .toArray();
      return NextResponse.json(reviews);
    }

    // Get single review
    if (path.startsWith('reviews/')) {
      const id = path.split('/')[1];
      const review = await db.collection('reviews').findOne({ id });
      if (!review) {
        return NextResponse.json({ error: 'Review not found' }, { status: 404 });
      }
      return NextResponse.json(review);
    }

    // Get about content
    if (path === 'about') {
      let about = await db.collection('about').findOne({});
      if (!about) {
        about = { content: 'Welcome to my portfolio. This is a placeholder text.' };
        await db.collection('about').insertOne(about);
      }
      return NextResponse.json(about);
    }

    // Get analytics
    if (path === 'analytics') {
      const token = request.headers.get('authorization');
      if (token !== 'admin-session') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      let analytics = await db.collection('analytics').findOne({});
      if (!analytics) {
        analytics = {
          totalViews: 0,
          totalVisits: 0,
          pageViews: { home: 0, blogs: 0, movies: 0, books: 0, products: 0, about: 0 },
          recentViews: []
        };
        await db.collection('analytics').insertOne(analytics);
      }
      return NextResponse.json(analytics);
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const db = await connectDB();
    const path = params.path?.join('/') || '';
    const body = await request.json();

    // Admin login
    if (path === 'auth/login') {
      const { username, password } = body;
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        return NextResponse.json({ success: true, token: 'admin-session' });
      }
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create review (admin only)
    if (path === 'reviews') {
      const token = request.headers.get('authorization');
      if (token !== 'admin-session') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const review = {
        id: uuidv4(),
        type: body.type,
        title: body.title,
        image: body.image,
        description: body.description,
        date: new Date().toISOString()
      };
      await db.collection('reviews').insertOne(review);
      return NextResponse.json(review);
    }

    // Track analytics
    if (path === 'analytics/track') {
      const { page } = body;
      await db.collection('analytics').updateOne(
        {},
        {
          $inc: {
            totalViews: 1,
            [`pageViews.${page}`]: 1
          },
          $push: {
            recentViews: {
              $each: [{ page, timestamp: new Date().toISOString() }],
              $slice: -50
            }
          }
        },
        { upsert: true }
      );
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const db = await connectDB();
    const path = params.path?.join('/') || '';
    const token = request.headers.get('authorization');
    const body = await request.json();

    if (token !== 'admin-session') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Update review
    if (path.startsWith('reviews/')) {
      const id = path.split('/')[1];
      const updateData = {
        type: body.type,
        title: body.title,
        image: body.image,
        description: body.description
      };
      await db.collection('reviews').updateOne({ id }, { $set: updateData });
      return NextResponse.json({ success: true });
    }

    // Update about
    if (path === 'about') {
      await db.collection('about').updateOne(
        {},
        { $set: { content: body.content } },
        { upsert: true }
      );
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const db = await connectDB();
    const path = params.path?.join('/') || '';
    const token = request.headers.get('authorization');

    if (token !== 'admin-session') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete review
    if (path.startsWith('reviews/')) {
      const id = path.split('/')[1];
      await db.collection('reviews').deleteOne({ id });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}