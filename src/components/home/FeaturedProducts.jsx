import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import SectionHeading from '@/components/site/SectionHeading';
import Reveal from '@/components/site/Reveal';

export default function FeaturedProducts({ products, categories, whatsapp }) {
  const nameFor = (slug) => categories.find((c) => c.slug === slug)?.name;

  return (
    <section id="doors" className="scroll-mt-32 border-y border-beige bg-white py-20 lg:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Our collection"
          title="Discover Doors Worth Coming Home To"
          description="Browse our available door designs and explore the details that matter when choosing the right door."
          action={
            <Link to="/shop" className="btn btn-outline h-11 min-h-0 px-6 text-[11px]">
              View All Doors
            </Link>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 4) * 70}>
              <ProductCard product={product} categoryName={nameFor(product.category_slug)} whatsapp={whatsapp} />
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex justify-center sm:hidden">
          <Link to="/shop" className="btn btn-primary w-full">
            View All Doors <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}