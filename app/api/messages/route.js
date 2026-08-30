import { NextResponse } from 'next/server';
import { getCollection, COLLECTIONS } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

function serialize(doc) {
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
}

export async function GET() {
  try {
    const collection = await getCollection(COLLECTIONS.CONTACTS);
    const docs = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ messages: docs.map(serialize) });
  } catch (error) {
    console.error('GET /api/messages error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    const collection = await getCollection(COLLECTIONS.CONTACTS);
    const doc = {
      name,
      email,
      subject,
      message,
      read: false,
      createdAt: new Date().toISOString(),
    };
    const result = await collection.insertOne(doc);
    return NextResponse.json({ message: serialize({ _id: result.insertedId, ...doc }) }, { status: 201 });
  } catch (error) {
    console.error('POST /api/messages error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
