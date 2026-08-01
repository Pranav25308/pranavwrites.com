export const metadata = {
  title: 'Product Reviews',
  description: 'Honest product reviews and recommendations by Pranav.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Product Reviews | Pranav Writes',
    description: 'Honest product reviews and recommendations by Pranav.',
    url: '/products',
  },
};

export default function ProductsLayout({ children }) {
  return children;
}
