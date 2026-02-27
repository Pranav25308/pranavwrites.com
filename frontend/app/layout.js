import './globals.css'
import NavigationWrapper from "./components/NavigationWrapper";

export const metadata = {
  title: 'Pranav Writes',
  description: 'Personal portfolio showcasing software development, reviews, and insights',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavigationWrapper>
          {children}
        </NavigationWrapper>
      </body>
    </html>
  );
}
