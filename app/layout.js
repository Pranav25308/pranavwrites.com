import './globals.css'
import PublicShell from '@/components/shared/PublicShell';

export const metadata = {
  title: 'Pranav Writes',
  description: 'Personal portfolio of Pranav — reviews, blogs, and more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
