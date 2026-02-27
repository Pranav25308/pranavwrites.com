import './globals.css'
import PublicNav from "@/components/shared/PublicNav";
import Footer from "@/components/shared/Footer";

export const metadata = {
  title: 'Next.js MongoDB Template',
  description: 'A simple template with App Router, MongoDB, and shadcn/ui',
}

export default function RootLayout({ children }) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/93dacc2c-0e60-40d5-9ec1-7ba2dfaec91a', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: `log_${Date.now()}_rootLayout`,
      runId: 'initial',
      hypothesisId: 'H2',
      location: 'app/layout.js:10',
      message: 'RootLayout rendering with PublicNav and Footer',
      data: {},
      timestamp: Date.now()
    })
  }).catch(() => {});
  // #endregion

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

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         {children}
//       </body>
//     </html>
//   )
// }