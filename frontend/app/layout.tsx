import './globals.css';
import Headers from '@/components/layout/header';
import Footer from '@/components/layout/footer';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-gray-100 min-h-screen flex flex-col"
      cz-shortcut-listen="true">
        <Headers />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
