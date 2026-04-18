'use client';

import { useState } from 'react';
import Settings from '@/components/admin/Settings';
import { DUMMY_SETTINGS } from '@/app/config/siteSettings';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(DUMMY_SETTINGS);
  return <Settings settings={settings} setSettings={setSettings} />;
}
