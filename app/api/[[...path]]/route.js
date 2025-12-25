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

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

export async function GET(request, { params }) {
  try {
    const db = await connectDB();
    const path = params.path?.join('/') || '';
    const url = new URL(request.url);

    if (path === 'reviews') {
      const type = url.searchParams.get('type');
      const query = type ? { type } : {};
      const reviews = await db.collection('reviews').find(query).sort({ date: -1 }).toArray();
      return NextResponse.json(reviews);
    }

    if (path.startsWith('reviews/')) {
      const id = path.split('/')[1];
      const review = await db.collection('reviews').findOne({ id });
      if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });
      return NextResponse.json(review);
    }

    if (path === 'about') {
      let about = await db.collection('about').findOne({});
      if (!about) {
        about = { content: 'Welcome to my portfolio.' };
        await db.collection('about').insertOne(about);
      }
      return NextResponse.json(about);
    }

    if (path === 'analytics') {
      const token = request.headers.get('authorization');
      if (token !== 'admin-session') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      let analytics = await db.collection('analytics').findOne({});
      if (!analytics) {
        analytics = { totalViews: 0, totalVisits: 0, pageViews: { home: 0, blogs: 0, movies: 0, books: 0, products: 0, about: 0, contact: 0 }, recentViews: [] };
        await db.collection('analytics').insertOne(analytics);
      }
      return NextResponse.json(analytics);
    }

    if (path === 'contacts') {
      const token = request.headers.get('authorization');
      if (token !== 'admin-session') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      const contacts = await db.collection('contacts').find({}).sort({ date: -1 }).toArray();
      return NextResponse.json(contacts);
    }

    if (path === 'roles') {
      const roles = await db.collection('roles').find({ active: true }).sort({ order: 1 }).toArray();
      if (roles.length === 0) {
        const defaultRoles = [
          { id: uuidv4(), title: 'Software Developer', order: 1, active: true },
          { id: uuidv4(), title: 'Streaming Engineer', order: 2, active: true },
          { id: uuidv4(), title: 'NLP Engineer', order: 3, active: true },
          { id: uuidv4(), title: 'Backend Developer', order: 4, active: true }
        ];
        await db.collection('roles').insertMany(defaultRoles);
        return NextResponse.json(defaultRoles);
      }
      return NextResponse.json(roles);
    }

    if (path === 'settings') {
      let settings = await db.collection('settings').findOne({});
      if (!settings) {
        settings = { navbar: { about: true, blogs: true, movies: true, books: true, products: true } };
        await db.collection('settings').insertOne(settings);
      }
      return NextResponse.json(settings);
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

    if (path === 'auth/login') {
      const { username, password } = body;
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        return NextResponse.json({ success: true, token: 'admin-session' });
      }
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (path === 'reviews') {
      const token = request.headers.get('authorization');
      if (token !== 'admin-session') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      const review = { id: uuidv4(), type: body.type, title: body.title, image: body.image, description: body.description, date: new Date().toISOString() };
      await db.collection('reviews').insertOne(review);
      return NextResponse.json(review);
    }

    if (path === 'contacts') {
      const contact = { id: uuidv4(), name: body.name, email: body.email, subject: body.subject, message: body.message, date: new Date().toISOString() };
      await db.collection('contacts').insertOne(contact);
      return NextResponse.json({ success: true, contact });
    }

    if (path === 'analytics/track') {
      const { page } = body;
      await db.collection('analytics').updateOne({}, { $inc: { totalViews: 1, [`pageViews.${page}`]: 1 }, $push: { recentViews: { $each: [{ page, timestamp: new Date().toISOString() }], $slice: -50 } } }, { upsert: true });
      return NextResponse.json({ success: true });
    }

    if (path === 'roles') {
      const token = request.headers.get('authorization');
      if (token !== 'admin-session') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      const maxOrder = await db.collection('roles').find().sort({ order: -1 }).limit(1).toArray();
      const newOrder = maxOrder.length > 0 ? maxOrder[0].order + 1 : 1;
      const role = { id: uuidv4(), title: body.title, order: newOrder, active: true };
      await db.collection('roles').insertOne(role);
      return NextResponse.json(role);
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

    if (token !== 'admin-session') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (path.startsWith('reviews/')) {
      const id = path.split('/')[1];
      const updateData = { type: body.type, title: body.title, image: body.image, description: body.description };
      await db.collection('reviews').updateOne({ id }, { $set: updateData });
      return NextResponse.json({ success: true });
    }

    if (path === 'about') {
      await db.collection('about').updateOne({}, { $set: { content: body.content } }, { upsert: true });
      return NextResponse.json({ success: true });
    }

    if (path.startsWith('roles/')) {
      const id = path.split('/')[1];
      await db.collection('roles').updateOne({ id }, { $set: { title: body.title, order: body.order, active: body.active } });
      return NextResponse.json({ success: true });
    }

    if (path === 'settings') {
      await db.collection('settings').updateOne({}, { $set: { navbar: body.navbar } }, { upsert: true });
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

    if (token !== 'admin-session') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (path.startsWith('reviews/')) {
      const id = path.split('/')[1];
      await db.collection('reviews').deleteOne({ id });
      return NextResponse.json({ success: true });
    }

    if (path.startsWith('roles/')) {
      const id = path.split('/')[1];
      await db.collection('roles').deleteOne({ id });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}