import { NextResponse } from 'next/server';
import { getCollection, COLLECTIONS } from '@/app/lib/db';
import { verifyAdminRequest } from '@/app/lib/auth-server';

export const dynamic = 'force-dynamic';

function serialize(doc) {
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
}

export async function GET(request) {
  const auth = verifyAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
    const body = await request.json();
    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Input sanitization and length limits to prevent DoS/injection
    const cleanName = String(name).trim().slice(0, 100);
    const cleanEmail = String(email).trim().slice(0, 150);
    const cleanSubject = String(subject).trim().slice(0, 200);
    const cleanMessage = String(message).trim().slice(0, 5000);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const collection = await getCollection(COLLECTIONS.CONTACTS);
    const doc = {
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
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
