export const metadata = {
  title: 'Book Reviews',
  description: 'Book reviews and reading recommendations by Pranav.',
  alternates: { canonical: '/books' },
  openGraph: {
    title: 'Book Reviews | Pranav Writes',
    description: 'Book reviews and reading recommendations by Pranav.',
    url: '/books',
  },
};

export default function BooksLayout({ children }) {
  return children;
}
