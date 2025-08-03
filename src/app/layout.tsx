import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js + Elysia Template',
  description: 'A minimal template with Next.js, Elysia API, and modern tooling',
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang='ja'>
    <body className={notoSansJP.className}>{children}</body>
  </html>
);

export default Layout;
