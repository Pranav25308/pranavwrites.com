// Admin-side dummy data: roles, contacts, analytics

export const DUMMY_ROLES = [
  { id: '1', title: 'Software Developer', order: 1 },
  { id: '2', title: 'Full Stack Engineer', order: 2 },
  { id: '3', title: 'AI Enthusiast', order: 3 },
  { id: '4', title: 'Problem Solver', order: 4 }
];

export const DUMMY_CONTACTS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Project Inquiry',
    message: 'Hi, I would like to discuss a potential project collaboration.',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Job Opportunity',
    message:
      'We have an exciting opportunity at our company that might interest you.',
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    subject: 'Technical Question',
    message: 'I had a question about your blog post on React Hooks.',
    createdAt: '2024-01-13'
  }
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


