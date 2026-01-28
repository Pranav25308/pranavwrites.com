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
  domains 
}) {
  return (
    <div className="min-h-screen max-w-6xl mx-auto relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Page Header */}
      <div className="text-center mb-16 relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6">
          <Brain className="w-4 h-4" />
          <span>About Me</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          Crafting <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Digital Experiences</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Passionate about building innovative solutions with cutting-edge technology
        </p>
      </div>
      
      {/* Bio Card */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/10 shadow-xl mb-16 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"></div>
        <CardContent className="pt-8 pb-8 px-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">Hello, World!</h2>
              <p className="text-purple-400 text-sm">Software Developer & AI Enthusiast</p>
            </div>
          </div>
          <div className="space-y-4">
            {aboutContent.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-slate-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Skills & <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Technologies</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Code;
            return (
              <Card 
                key={skill.name} 
                className="group bg-slate-900/50 backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/30 shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="pt-6 pb-6 text-center relative">
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <p className="font-semibold text-slate-200 group-hover:text-white transition-colors duration-300">{skill.name}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-500 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Work <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Experience</span>
          </h2>
        </div>

        <div className="space-y-6">
          {workExperience.map((job, index) => (
            <Card 
              key={index} 
              className="group bg-slate-900/50 backdrop-blur-sm border border-purple-500/10 hover:border-cyan-500/30 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden"
            >
              <CardContent className="pt-6 pb-6 px-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {job.position}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {job.duration}
                      </span>
                    </div>
                    <p className="text-purple-400 font-medium mb-3">{job.company}</p>
                    <p className="text-slate-400">{job.description}</p>
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
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-600 to-rose-500 flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Domain <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">Expertise</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {domains.map((domain, index) => {
            const IconComponent = iconMap[domain.icon] || Activity;
            return (
              <Card 
                key={domain.name} 
                className="group bg-slate-900/50 backdrop-blur-sm border border-purple-500/10 hover:border-pink-500/30 shadow-lg hover:shadow-pink-500/10 transition-all duration-500 hover:scale-[1.02] cursor-pointer overflow-hidden"
              >
                <CardContent className="pt-8 pb-8 text-center relative">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${domain.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className={`w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${domain.gradient} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors duration-300">
                    {domain.name}
                  </h3>
                  <p className="text-slate-400 text-sm">{domain.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
