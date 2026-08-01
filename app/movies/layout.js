export const metadata = {
  title: 'Movie Reviews',
  description: 'Movie reviews and recommendations by Pranav.',
  alternates: { canonical: '/movies' },
  openGraph: {
    title: 'Movie Reviews | Pranav Writes',
    description: 'Movie reviews and recommendations by Pranav.',
    url: '/movies',
  },
};

export default function MoviesLayout({ children }) {
  return children;
}
