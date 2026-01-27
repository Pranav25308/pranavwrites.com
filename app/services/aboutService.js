// ==================== ABOUT SERVICE ====================
// Handles About page content management

import { getCollection, COLLECTIONS } from '../lib/db';

const DEFAULT_ABOUT = {
  content: `I'm a passionate Software Developer with expertise in building modern web applications and scalable backend systems. With a strong foundation in JavaScript, Python, and cloud technologies, I love turning complex problems into elegant solutions.

My journey in tech started with a curiosity about how things work, which led me to pursue a career in software development. Today, I specialize in full-stack development, working with technologies like React, Node.js, and various cloud platforms.

When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and technical articles.`,
  skills: [
    { name: 'Roku', icon: 'Laptop', color: 'from-purple-500 to-indigo-500' },
    { name: 'Python', icon: 'Code', color: 'from-blue-600 to-yellow-500' },
    { name: 'MySQL', icon: 'Database', color: 'from-blue-500 to-blue-700' },
    { name: 'NLP', icon: 'Sparkles', color: 'from-green-500 to-emerald-600' },
    { name: 'RAG', icon: 'Layers', color: 'from-orange-500 to-red-500' },
    { name: 'MongoDB', icon: 'Database', color: 'from-green-600 to-teal-600' },
    { name: 'Kafka', icon: 'Zap', color: 'from-slate-700 to-slate-900' },
    { name: 'DSA', icon: 'Code', color: 'from-cyan-500 to-blue-600' }
  ],
  workExperience: [
    {
      company: 'Tudip Technologies',
      position: 'Software Developer',
      duration: 'July 2022 - Present',
      description: 'Developing scalable software solutions and working on cutting-edge technologies.'
    },
    {
      company: 'HSPM Solutions',
      position: 'Web Developer Intern',
      duration: 'Jan 2022 - July 2022',
      description: 'Built responsive web applications and gained hands-on experience in full-stack development.'
    }
  ],
  domains: [
    {
      name: 'Streaming',
      description: 'Real-time data processing and event-driven architectures with Kafka',
      icon: 'Activity',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      name: 'Game Development',
      description: 'Creating interactive gaming experiences on Roku platform',
      icon: 'Gamepad2',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      name: 'Data Engineering',
      description: 'Building robust data pipelines and ETL processes',
      icon: 'Server',
      gradient: 'from-orange-600 to-red-600'
    }
  ]
};

/**
 * Get About page content
 * @returns {Promise<Object>}
 */
export async function getAboutContent() {
  try {
    const collection = await getCollection(COLLECTIONS.ABOUT);
    const about = await collection.findOne({ type: 'main' });
    
    if (about) {
      return about;
    }
    
    return DEFAULT_ABOUT;
  } catch (error) {
    console.error('Error fetching about content:', error);
    return DEFAULT_ABOUT;
  }
}

/**
 * Update About page content
 * @param {Object} updateData - { content, skills, workExperience, domains }
 * @returns {Promise<{success: boolean, about?: Object}>}
 */
export async function updateAboutContent(updateData) {
  try {
    const collection = await getCollection(COLLECTIONS.ABOUT);
    
    const update = {
      ...updateData,
      type: 'main',
      updatedAt: new Date().toISOString()
    };

    const result = await collection.findOneAndUpdate(
      { type: 'main' },
      { $set: update },
      { upsert: true, returnDocument: 'after' }
    );

    return { success: true, about: result };
  } catch (error) {
    console.error('Error updating about content:', error);
    return { success: false, message: 'Failed to update about content' };
  }
}

/**
 * Update only the bio/content section
 * @param {string} content 
 * @returns {Promise<{success: boolean}>}
 */
export async function updateBio(content) {
  return updateAboutContent({ content });
}

/**
 * Update skills
 * @param {Array} skills 
 * @returns {Promise<{success: boolean}>}
 */
export async function updateSkills(skills) {
  return updateAboutContent({ skills });
}

/**
 * Add a new skill
 * @param {Object} skill - { name, icon, color }
 * @returns {Promise<{success: boolean}>}
 */
export async function addSkill(skill) {
  try {
    const about = await getAboutContent();
    const skills = about.skills || [];
    skills.push(skill);
    return updateSkills(skills);
  } catch (error) {
    console.error('Error adding skill:', error);
    return { success: false, message: 'Failed to add skill' };
  }
}

/**
 * Remove a skill by name
 * @param {string} skillName 
 * @returns {Promise<{success: boolean}>}
 */
export async function removeSkill(skillName) {
  try {
    const about = await getAboutContent();
    const skills = (about.skills || []).filter(s => s.name !== skillName);
    return updateSkills(skills);
  } catch (error) {
    console.error('Error removing skill:', error);
    return { success: false, message: 'Failed to remove skill' };
  }
}

/**
 * Update work experience
 * @param {Array} workExperience 
 * @returns {Promise<{success: boolean}>}
 */
export async function updateWorkExperience(workExperience) {
  return updateAboutContent({ workExperience });
}

/**
 * Add work experience
 * @param {Object} job - { company, position, duration, description }
 * @returns {Promise<{success: boolean}>}
 */
export async function addWorkExperience(job) {
  try {
    const about = await getAboutContent();
    const workExperience = about.workExperience || [];
    workExperience.unshift(job); // Add to beginning (most recent first)
    return updateWorkExperience(workExperience);
  } catch (error) {
    console.error('Error adding work experience:', error);
    return { success: false, message: 'Failed to add work experience' };
  }
}

/**
 * Update domains
 * @param {Array} domains 
 * @returns {Promise<{success: boolean}>}
 */
export async function updateDomains(domains) {
  return updateAboutContent({ domains });
}

/**
 * Reset about content to defaults
 * @returns {Promise<{success: boolean}>}
 */
export async function resetAboutContent() {
  try {
    const collection = await getCollection(COLLECTIONS.ABOUT);
    
    await collection.findOneAndUpdate(
      { type: 'main' },
      { $set: { ...DEFAULT_ABOUT, type: 'main', updatedAt: new Date().toISOString() } },
      { upsert: true }
    );

    return { success: true, about: DEFAULT_ABOUT };
  } catch (error) {
    console.error('Error resetting about content:', error);
    return { success: false, message: 'Failed to reset about content' };
  }
}

export default {
  getAboutContent,
  updateAboutContent,
  updateBio,
  updateSkills,
  addSkill,
  removeSkill,
  updateWorkExperience,
  addWorkExperience,
  updateDomains,
  resetAboutContent,
  DEFAULT_ABOUT
};
