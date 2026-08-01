export default function sitemap() {
  const base = 'https://pranavwrites.com';
  const routes = ['', '/about', '/contact', '/blogs', '/movies', '/books', '/products', '/projects'];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
