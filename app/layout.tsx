import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'V Tube',
  description: 'Watch, share, and discover videos on V Tube',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f0f0f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0f0f0f] text-[#f1f1f1] antialiased min-h-screen selection:bg-red-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
