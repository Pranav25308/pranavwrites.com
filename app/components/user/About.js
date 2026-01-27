'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Briefcase, Award, Code, Laptop, Database, Layers, Zap, Activity, Gamepad2, Server } from 'lucide-react';

// Icon mapping for dynamic rendering
const iconMap = {
  Code, Laptop, Database, Layers, Zap, Sparkles, Activity, Gamepad2, Server
};

export default function About({ 
  aboutContent, 
  skills, 
  workExperience, 
  domains 
}) {
  return (
    <div className="min-h-screen max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">
        About Me
      </h1>
      
      {/* Bio Card */}
      <Card className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800 mb-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        <CardContent className="pt-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {aboutContent.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <div className="mb-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
        <h2 className="text-3xl font-bold mb-8 text-blue-800 dark:text-blue-400 flex items-center">
          <Sparkles className="w-8 h-8 mr-3" />
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Code;
            return (
              <Card 
                key={skill.name} 
                className="group bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-in fade-in-0 zoom-in-95"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="pt-6 text-center">
                  <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{skill.name}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="mb-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
        <h2 className="text-3xl font-bold mb-8 text-blue-800 dark:text-blue-400 flex items-center">
          <Briefcase className="w-8 h-8 mr-3" />
          Work Experience
        </h2>
        <div className="space-y-6">
          {workExperience.map((job, index) => (
            <Card 
              key={index} 
              className="bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 animate-in fade-in-0 slide-in-from-left-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{job.position}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">{job.company}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{job.duration}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-4">{job.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Domain Expertise Section */}
      <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-400">
        <h2 className="text-3xl font-bold mb-8 text-blue-800 dark:text-blue-400 flex items-center">
          <Award className="w-8 h-8 mr-3" />
          Domain Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {domains.map((domain, index) => {
            const IconComponent = iconMap[domain.icon] || Activity;
            return (
              <Card 
                key={domain.name} 
                className="group bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer animate-in fade-in-0 zoom-in-95"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-8 text-center">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${domain.gradient} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{domain.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{domain.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
