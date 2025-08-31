import type { Metadata } from 'next';
import { MathJaxContext } from 'better-react-mathjax';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import 'react-medium-image-zoom/dist/styles.css';

export const metadata: Metadata = {
  title: 'Feather Quill',
  description: 'A modern, AI-powered content platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mathjaxConfig = {
    loader: { load: ['[tex]/html'] },
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MathJaxContext config={mathjaxConfig}>
            {children}
            <Toaster />
          </MathJaxContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
