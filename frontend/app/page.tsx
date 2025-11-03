import Carousel from '@/components/layout/Carousel';
import ProductSection from '@/components/prodcuts/ProductSection';

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Carousel />
      <ProductSection />
    </main>
  );
}
