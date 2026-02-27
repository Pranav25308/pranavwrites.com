'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings({ settings, setSettings }) {
  const handleToggle = (key) => {
    setSettings({
      ...settings,
      navbar: { ...settings.navbar, [key]: !settings.navbar[key] }
    });
  };

  return (
    <div className="min-h-screen max-w-3xl mx-auto">
      <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">
        Navigation Settings
      </h1>

      <Card className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Toggle visibility of navigation menu items. (Demo - changes apply to current session only)
            </p>

            <div className="space-y-4">
              {Object.entries(settings.navbar).map(([key, value]) => (
                <div 
                  key={key} 
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-300"
                >
                  <Label 
                    htmlFor={key} 
                    className="text-lg font-medium text-slate-800 dark:text-slate-100 capitalize cursor-pointer"
                  >
                    {key}
                  </Label>
                  <input 
                    id={key} 
                    type="checkbox" 
                    checked={value} 
                    onChange={() => handleToggle(key)}
                    className="w-6 h-6 text-blue-600 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500 cursor-pointer" 
                  />
                </div>
              ))}
            </div>

            <Button 
              onClick={() => alert('Settings applied to current session!')}
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
