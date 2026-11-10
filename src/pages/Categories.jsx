import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { imageFor } from '@/lib/media';
import { useCatalog } from '@/hooks/useCatalog';
import PageHeader from '@/components/site/PageHeader';
import Reveal from '@/components/site/Reveal';

export default function Categories() {
  const { data, isLoading } = useCatalog();
  const categories = data?.categories ?? [];
  const countFor = (slug) => (data?.products ?? []).filter((p) => p.category_slug === slug).length;

  return (
    <>
      <PageHeader
        eyebrow="Explore our collections"
        title="Door Categories"
        description="Every collection we list, sorted by where the door is used and how it is made. Choose a collection to see the doors available in it."
        crumbs={[{ label: 'Categories' }]}
      />

      <section className="shell py-12 lg:py-16">
        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-[6px] bg-beige/60" />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <Reveal key={category.slug} delay={(i % 3) * 80}>
                <Link
                  to={`/category/${category.slug}`}
                  className="group block overflow-hidden rounded-[6px] border border-beige bg-white"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-beige">
                    <Image
                      src={imageFor(category)}
                      alt={`${category.name} in Lahore`}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4 p-5">
                    <div>
                      <h2 className="font-heading text-[18px] font-semibold text-espresso">{category.name}</h2>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-clay">{category.description}</p>
                      <span className="mt-3 block text-[10.5px] uppercase tracking-[0.16em] text-bronze">
                        {countFor(category.slug)} door{countFor(category.slug) === 1 ? '' : 's'}
                      </span>
                    </div>
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-beige text-copper transition-colors group-hover:border-copper group-hover:bg-copper group-hover:text-ivory">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}