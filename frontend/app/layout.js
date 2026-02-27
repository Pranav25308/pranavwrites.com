import './globals.css'
import PublicNav from "./components/shared/PublicNav";
import Footer from "./components/shared/Footer";

export const metadata = {
  title: 'Pranav Writes',
  description: 'Personal portfolio showcasing software development, reviews, and insights',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PublicNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
