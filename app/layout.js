import './globals.css'
import PublicShell from '@/components/shared/PublicShell';

export const metadata = {
  metadataBase: new URL('https://pranavwrites.com'),
  title: {
    default: 'Pranav Writes | Software Developer & Streaming Media Engineer',
    template: '%s | Pranav Writes',
  },
  description:
    'Personal portfolio of Pranav — Software Developer specializing in Roku, streaming media pipelines, AWS Media Services, and backend engineering. Blogs, reviews, and more.',
  keywords: [
    'Pranav',
    'software developer',
    'Roku developer',
    'streaming media pipeline',
    'AWS Media Services',
    'DRM',
    'OTT',
    'portfolio',
    'tech blog',
  ],
  authors: [{ name: 'Pranav' }],
  creator: 'Pranav',
  openGraph: {
    type: 'website',
    url: 'https://pranavwrites.com',
    siteName: 'Pranav Writes',
    title: 'Pranav Writes | Software Developer & Streaming Media Engineer',
    description:
      'Portfolio of Pranav — Roku, streaming media pipelines, AWS Media Services, and backend engineering. Blogs, reviews, and more.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pranav Writes | Software Developer & Streaming Media Engineer',
    description:
      'Portfolio of Pranav — Roku, streaming media pipelines, AWS Media Services, and backend engineering.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
