'use client';

import { Card, CardContent } from '@/components/ui/card';
import { FolderKanban, Sparkles } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';

export default function ProjectsPage() {
  const { darkMode } = useTheme();

  return (
    <div className="min-h-screen max-w-6xl mx-auto relative pt-8 px-4 sm:px-6 lg:px-8" data-testid="projects-page">
      <Card className={`backdrop-blur-sm border shadow-xl overflow-hidden relative ${
        darkMode
          ? 'bg-slate-900/50 border-purple-500/10'
          : 'bg-white/80 border-purple-100'
      }`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"></div>
        <CardContent className="py-24 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-purple-500/25">
            <FolderKanban className="w-10 h-10 text-white" />
          </div>
          <h1 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            Projects <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">Coming Soon</span>
          </h1>
          <p className={`flex items-center justify-center gap-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} data-testid="projects-coming-soon-text">
            <Sparkles className="w-4 h-4 text-purple-500" />
            Exciting projects are on the way. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
