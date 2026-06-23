'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Settings as SettingsIcon, MessageCircle } from 'lucide-react';

const FEATURE_META = {
  chatbot: {
    label: 'Chatbot',
    description: 'Show floating AI chatbot on all user-facing pages',
    Icon: MessageCircle,
  },
};

export default function Settings({ settings, setSettings }) {
  const handleNavToggle = (key) => {
    setSettings({
      ...settings,
      navbar: { ...settings.navbar, [key]: !settings.navbar[key] },
    });
  };

  const handleFeatureToggle = (key) => {
    setSettings({
      ...settings,
      features: { ...(settings.features || {}), [key]: !settings?.features?.[key] },
    });
  };

  const features = settings?.features || {};

  return (
    <div className="min-h-screen max-w-3xl mx-auto">
      <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">
        Site Settings
      </h1>

      {/* Navigation settings */}
      <Card
        className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
        data-testid="navigation-settings-card"
      >
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-1">
                Navigation
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Toggle visibility of navigation menu items.
              </p>
            </div>

            <div className="space-y-4">
              {Object.entries(settings.navbar).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-300"
                >
                  <Label
                    htmlFor={`nav-${key}`}
                    className="text-lg font-medium text-slate-800 dark:text-slate-100 capitalize cursor-pointer"
                  >
                    {key}
                  </Label>
                  <input
                    id={`nav-${key}`}
                    type="checkbox"
                    checked={value}
                    onChange={() => handleNavToggle(key)}
                    data-testid={`nav-toggle-${key}`}
                    className="w-6 h-6 text-blue-600 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features settings */}
      <Card
        className="mt-8 shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
        data-testid="features-settings-card"
      >
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-1">
                Features
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Enable or disable site-wide widgets and features.
              </p>
            </div>

            <div className="space-y-4">
              {Object.entries(features).map(([key, value]) => {
                const meta = FEATURE_META[key] || { label: key, description: '', Icon: SettingsIcon };
                const Icon = meta.Icon;
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <Label
                          htmlFor={`feature-${key}`}
                          className="text-lg font-medium text-slate-800 dark:text-slate-100 cursor-pointer"
                        >
                          {meta.label}
                        </Label>
                        {meta.description && (
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {meta.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <input
                      id={`feature-${key}`}
                      type="checkbox"
                      checked={!!value}
                      onChange={() => handleFeatureToggle(key)}
                      data-testid={`feature-toggle-${key}`}
                      className="w-6 h-6 text-blue-600 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>

            <Button
              onClick={() => alert('Settings saved!')}
              data-testid="save-settings-btn"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              size="lg"
            >
              <SettingsIcon className="w-5 h-5 mr-2" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
