'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Briefcase, Award, Code, Laptop, Database, Layers, Zap, Activity, Gamepad2, Server, Brain, Cpu, Network } from 'lucide-react';

// Icon mapping for dynamic rendering
const iconMap = {
  Code, Laptop, Database, Layers, Zap, Sparkles, Activity, Gamepad2, Server, Brain, Cpu, Network
};

export default function About({ 
  aboutContent, 
  skills, 
  workExperience, 
  domains,
  darkMode 
}) {
  return (
    <div className="min-h-screen max-w-6xl mx-auto relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-purple-600/10' : 'bg-purple-400/20'
        }`}></div>
        <div className={`absolute bottom-1/3 left-0 w-80 h-80 rounded-full blur-3xl ${
          darkMode ? 'bg-cyan-600/10' : 'bg-cyan-400/20'
        }`}></div>
      </div>

      {/* Page Header */}
      <div className="text-center mb-16 relative">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6 ${
          darkMode 
            ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400' 
            : 'bg-purple-100 border border-purple-200 text-purple-700'
        }`}>
          <Brain className="w-4 h-4" />
          <span>About Me</span>
        </div>
        <h1 className={`text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          Crafting <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">Digital Experiences</span>
        </h1>
        <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Passionate about building innovative solutions with cutting-edge technology
        </p>
      </div>
      
      {/* Bio Card */}
      <Card className={`backdrop-blur-sm border shadow-xl mb-16 overflow-hidden relative ${
        darkMode 
          ? 'bg-slate-900/50 border-purple-500/10' 
          : 'bg-white/80 border-purple-100'
      }`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"></div>
        <CardContent className="pt-8 pb-8 px-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/25">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-xl font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Hello, World!</h2>
              <p className="text-purple-500 text-sm">Software Developer & AI Enthusiast</p>
            </div>
          </div>
          <div className="space-y-4">
            {/* {aboutContent.split('\n\n').map((paragraph, index) => (
              <p key={index} className={`leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {paragraph}
              </p>
            ))} */}
            {(aboutContent ?? "").split("\n\n").map((paragraph, index) => (
              <p key={index} className={`leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                {paragraph}
              </p>
            ))}

          </div>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            Skills & <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Technologies</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* {skills.map((skill, index) => { */}
          {(skills ?? []).map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Code;
            return (
              <Card 
                key={skill.name} 
                className={`group backdrop-blur-sm border shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden ${
                  darkMode 
                    ? 'bg-slate-900/50 border-purple-500/10 hover:border-purple-500/30 hover:shadow-purple-500/10' 
                    : 'bg-white/80 border-purple-100 hover:border-purple-300 hover:shadow-purple-500/20'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="pt-6 pb-6 text-center relative">
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <p className={`font-semibold transition-colors duration-300 ${
                    darkMode 
                      ? 'text-slate-200 group-hover:text-white' 
                      : 'text-slate-700 group-hover:text-slate-900'
                  }`}>{skill.name}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            Work <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Experience</span>
          </h2>
        </div>

        <div className="space-y-6">
          {(workExperience ?? []).map((job, index) => (
            <Card 
              key={index} 
              className={`group backdrop-blur-sm border shadow-lg transition-all duration-300 overflow-hidden ${
                darkMode 
                  ? 'bg-slate-900/50 border-purple-500/10 hover:border-cyan-500/30 hover:shadow-cyan-500/10' 
                  : 'bg-white/80 border-purple-100 hover:border-cyan-300 hover:shadow-cyan-500/20'
              }`}
            >
              <CardContent className="pt-6 pb-6 px-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-xl font-bold transition-colors duration-300 ${
                        darkMode 
                          ? 'text-white group-hover:text-cyan-400' 
                          : 'text-slate-800 group-hover:text-cyan-600'
                      }`}>
                        {job.position}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        darkMode 
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                          : 'bg-cyan-100 text-cyan-700 border border-cyan-200'
                      }`}>
                        {job.duration}
                      </span>
                    </div>
                    <p className="text-purple-500 font-medium mb-3">{job.company}</p>
                    <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>{job.description}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg ml-4 flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Domain Expertise Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-600 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/25">
            <Award className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            Domain <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Expertise</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(domains ?? []).map((domain, index) => {
            const IconComponent = iconMap[domain.icon] || Activity;
            return (
              <Card 
                key={domain.name} 
                className={`group backdrop-blur-sm border shadow-lg transition-all duration-500 hover:scale-[1.02] cursor-pointer overflow-hidden ${
                  darkMode 
                    ? 'bg-slate-900/50 border-purple-500/10 hover:border-pink-500/30 hover:shadow-pink-500/10' 
                    : 'bg-white/80 border-purple-100 hover:border-pink-300 hover:shadow-pink-500/20'
                }`}
              >
                <CardContent className="pt-8 pb-8 text-center relative">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${domain.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className={`w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${domain.gradient} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                    darkMode 
                      ? 'text-white group-hover:text-pink-400' 
                      : 'text-slate-800 group-hover:text-pink-600'
                  }`}>
                    {domain.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{domain.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
