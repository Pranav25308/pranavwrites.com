import { NextResponse } from 'next/server';
import { getCollection, COLLECTIONS } from '@/app/lib/db';
import { DEFAULT_SETTINGS } from '@/app/config/siteSettings';

export const dynamic = 'force-dynamic';

function mergeWithDefaults(doc) {
  return {
    navbar: { ...DEFAULT_SETTINGS.navbar, ...(doc?.navbar || {}) },
    features: { ...DEFAULT_SETTINGS.features, ...(doc?.features || {}) },
    ads: { ...DEFAULT_SETTINGS.ads, ...(doc?.ads || {}) },
  };
}

export async function GET() {
  try {
    const collection = await getCollection(COLLECTIONS.SETTINGS);
    const doc = await collection.findOne({ type: 'site' });
    return NextResponse.json({ settings: mergeWithDefaults(doc) });
  } catch (error) {
    console.error('GET /api/settings error:', error);
    return NextResponse.json({ settings: DEFAULT_SETTINGS });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const settings = mergeWithDefaults(body);
    const collection = await getCollection(COLLECTIONS.SETTINGS);
    await collection.updateOne(
      { type: 'site' },
      { $set: { ...settings, type: 'site', updatedAt: new Date().toISOString() } },
      { upsert: true }
    );
    return NextResponse.json({ settings });
  } catch (error) {
    console.error('PUT /api/settings error:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
