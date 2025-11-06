import './globals.css';
import type { ReactNode } from 'react';
import Headers from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";

export const metadata = {
  title: 'Nhà thuốc Benzen',
  description: 'Trang bán thuốc trực tuyến',
  metadataBase: new URL('https://nhathuocbenzen.com'),
  openGraph: {
    title: 'Nhà thuốc Benzen',
    description: 'Xây dựng Website nhà thuốc Benzen',
    url: 'https://nhathuocbenzen.com',
    siteName: 'Nhà thuốc Benzen',
    images: [{ url: '/images/logo.jpg', width: 600, height: 600, alt: 'Logo Nhà thuốc Benzen' }],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nhà thuốc Benzen',
    description: 'Xây dựng Website nhà thuốc Benzen',
    creator: '@benzenpharmacy',
    images: ['/images/logo.jpg'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}