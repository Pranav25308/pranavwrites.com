export const metadata = {
  title: 'Blogs',
  description:
    'Technical blog posts by Pranav — software development, streaming media, backend engineering, and more.',
  alternates: { canonical: '/blogs' },
  openGraph: {
    title: 'Blogs | Pranav Writes',
    description: 'Technical blog posts on software development and streaming media.',
    url: '/blogs',
  },
};

export default function BlogsLayout({ children }) {
  return children;
}
