// ==================== DUMMY DATA ====================
// This file contains all dummy/mock data used in the frontend
// Replace these with actual API calls when backend is ready

export const DUMMY_ROLES = [
  { id: '1', title: 'Software Developer', order: 1 },
  { id: '2', title: 'Full Stack Engineer', order: 2 },
  { id: '3', title: 'AI Enthusiast', order: 3 },
  { id: '4', title: 'Problem Solver', order: 4 },
];

export const DUMMY_REVIEWS = [
  { id: '1', type: 'blog', title: 'Getting Started with React Hooks', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400', description: 'A comprehensive guide to understanding and using React Hooks effectively in your projects.' },
  { id: '2', type: 'blog', title: 'Building Scalable APIs with Node.js', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400', description: 'Learn best practices for building robust and scalable REST APIs using Node.js and Express.' },
  { id: '3', type: 'movie', title: 'Inception', image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400', description: 'A mind-bending thriller about dreams within dreams. Christopher Nolan at his finest.' },
  { id: '4', type: 'movie', title: 'The Matrix', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400', description: 'A revolutionary sci-fi film that redefined the genre and visual effects in cinema.' },
  { id: '5', type: 'book', title: 'Clean Code', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', description: 'Robert C. Martin\'s guide to writing clean, maintainable, and professional code.' },
  { id: '6', type: 'book', title: 'The Pragmatic Programmer', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400', description: 'A timeless classic on software development practices and career advice.' },
  { id: '7', type: 'product', title: 'MacBook Pro M3', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', description: 'The ultimate laptop for developers with incredible performance and battery life.' },
  { id: '8', type: 'product', title: 'Mechanical Keyboard', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400', description: 'A premium mechanical keyboard that enhances typing experience for developers.' },
];

export const DUMMY_CONTACTS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', subject: 'Project Inquiry', message: 'Hi, I would like to discuss a potential project collaboration.', createdAt: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', subject: 'Job Opportunity', message: 'We have an exciting opportunity at our company that might interest you.', createdAt: '2024-01-14' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', subject: 'Technical Question', message: 'I had a question about your blog post on React Hooks.', createdAt: '2024-01-13' },
];

export const DUMMY_ANALYTICS = {
  totalVisits: 1542,
  uniqueVisitors: 876,
  pageViews: {
    home: 654,
    about: 234,
    blogs: 312,
    movies: 156,
    books: 98,
    products: 88,
    contact: 145
  },
  topPages: [
    { page: 'Home', views: 654 },
    { page: 'Blogs', views: 312 },
    { page: 'About', views: 234 },
    { page: 'Movies', views: 156 },
    { page: 'Contact', views: 145 }
  ]
};

export const DUMMY_ABOUT = `I'm a passionate Software Developer with expertise in building modern web applications and scalable backend systems. With a strong foundation in JavaScript, Python, and cloud technologies, I love turning complex problems into elegant solutions.

My journey in tech started with a curiosity about how things work, which led me to pursue a career in software development. Today, I specialize in full-stack development, working with technologies like React, Node.js, and various cloud platforms.

When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and technical articles.`;

export const DUMMY_SETTINGS = {
  navbar: { about: true, blogs: true, movies: true, books: true, products: true }
};

export const SKILLS = [
  { name: 'Roku', icon: 'Laptop', color: 'from-purple-500 to-indigo-500' },
  { name: 'Python', icon: 'Code', color: 'from-blue-600 to-yellow-500' },
  { name: 'MySQL', icon: 'Database', color: 'from-blue-500 to-blue-700' },
  { name: 'NLP', icon: 'Sparkles', color: 'from-green-500 to-emerald-600' },
  { name: 'RAG', icon: 'Layers', color: 'from-orange-500 to-red-500' },
  { name: 'MongoDB', icon: 'Database', color: 'from-green-600 to-teal-600' },
  { name: 'Kafka', icon: 'Zap', color: 'from-slate-700 to-slate-900' },
  { name: 'DSA', icon: 'Code', color: 'from-cyan-500 to-blue-600' }
];

export const WORK_EXPERIENCE = [
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
];

export const DOMAINS = [
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
];
