import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useCatalog } from '@/hooks/useCatalog';
import { imageFor } from '@/lib/media';
import PageHeader from '@/components/site/PageHeader';
import ProductCard from '@/components/shop/ProductCard';
import { Image } from '@/components/ui/image';

export default function CategoryDetail() {
  const { slug } = useParams();
  const { data: catalog } = useCatalog();
  const category = (catalog?.categories ?? []).find((c) => c.slug === slug);

  const { data, isLoading } = useQuery({
    queryKey: ['category-products', slug],
    queryFn: () => base44.entities.Product.filter({ category_slug: slug, is_active: true }, { sort: 'sort_order', limit: 60 }),
    enabled: Boolean(slug),
  });

  const products = data?.items ?? [];
  const others = (catalog?.categories ?? []).filter((c) => c.slug !== slug).slice(0, 4);

  return (
    <>
      <PageHeader
        eyebrow="Collection"
        title={category?.name || 'Door Collection'}
        description={category?.description || 'Doors in this collection.'}
        crumbs={[{ label: 'Categories', to: '/categories' }, { label: category?.name || 'Collection' }]}
      />

      {category ? (
        <div className="shell pt-8">
          <div className="relative h-[220px] overflow-hidden rounded-[6px] border border-beige bg-beige sm:h-[300px]">
            <Image src={imageFor(category)} alt={`${category.name} collection in Lahore`} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-espresso/70 via-espresso/20 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-md flex-col justify-end p-6 sm:p-9">
              <p className="eyebrow text-bronze">Doorix · Lahore</p>
              <p className="mt-2 font-heading text-[24px] font-semibold text-ivory sm:text-[30px]">{category.name}</p>
            </div>
          </div>
        </div>
      ) : null}

      <section className="shell py-12 lg:py-16">
        <div className="flex items-center justify-between border-b border-beige pb-4">
          <p className="text-[12.5px] text-clay">{isLoading ? 'Loading doors…' : `${products.length} door${products.length === 1 ? '' : 's'} in this collection`}</p>
          <Link to="/shop" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-copper">
            <ArrowLeft className="h-3.5 w-3.5" /> All doors
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-[6px] bg-beige/60" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="mt-10 border border-beige bg-white px-6 py-14 text-center">
            <h2 className="font-heading text-[21px] font-semibold text-espresso">No doors listed in this collection yet</h2>
            <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-clay">
              We may still be able to make this type of door to your requirements. Send us the details and we will
              confirm what is possible.
            </p>
            <Link to="/custom-door" className="btn btn-primary mt-7">Request a Custom Door</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryName={category?.name}
                whatsapp={catalog?.settings?.whatsapp}
              />
            ))}
          </div>
        )}
      </section>

      {others.length ? (
        <section className="border-t border-beige bg-white py-14">
          <div className="shell">
            <div className="flex items-end justify-between">
              <h2 className="font-heading text-[22px] font-semibold text-espresso sm:text-[26px]">Other collections</h2>
              <Link to="/categories" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-copper">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {others.map((c) => (
                <Link key={c.slug} to={`/category/${c.slug}`} className="group">
                  <div className="aspect-[4/3] overflow-hidden rounded-[6px] bg-beige">
                    <Image
                      src={imageFor(c)}
                      alt={c.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 font-heading text-[14.5px] font-medium text-espresso group-hover:text-copper">{c.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}