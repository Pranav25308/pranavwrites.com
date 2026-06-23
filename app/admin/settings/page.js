'use client';

import Settings from '@/components/admin/Settings';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function AdminSettingsPage() {
  const { settings, setSettings } = useSiteSettings();
  return <Settings settings={settings} setSettings={setSettings} />;
}
