import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MessageCircle, ArrowRight, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useCatalog } from '@/hooks/useCatalog';
import { imageFor } from '@/lib/media';
import { priceLabel, waLink, productInquiryText } from '@/lib/site';
import PageHeader from '@/components/site/PageHeader';
import ProductCard from '@/components/shop/ProductCard';
import QuoteDialog from '@/components/shop/QuoteDialog';
import { Image } from '@/components/ui/image';

export default function ProductDetail() {
  const { slug } = useParams();
  const { data: catalog } = useCatalog();
  const [activeImage, setActiveImage] = useState(null);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => base44.entities.Product.filter({ slug }, { limit: 1 }),
    enabled: Boolean(slug),
  });

  const product = data?.items?.[0] ?? null;
  const category = (catalog?.categories ?? []).find((c) => c.slug === product?.category_slug);
  const settings = catalog?.settings ?? {};

  const related = (catalog?.products ?? [])
    .filter((p) => p.category_slug === product?.category_slug && p.slug !== product?.slug)
    .slice(0, 4);

  useEffect(() => {
    if (isLoading || product) return undefined;
    const meta = document.createElement('meta');
    meta.name = 'prerender-status-code';
    meta.content = '404';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, [isLoading, product]);

  useEffect(() => {
    document.title = product ? `${product.name} | Doorix Lahore` : 'Door | Doorix Lahore';
    return () => {
      document.title = 'Doorix Lahore | Wooden Doors & Custom Door Orders';
    };
  }, [product]);

  if (isLoading) {
    return (
      <div className="shell grid gap-10 py-16 lg:grid-cols-2">
        <div className="aspect-[4/5] animate-pulse rounded-[6px] bg-beige/60" />
        <div className="space-y-4">
          <div className="h-3 w-24 animate-pulse rounded bg-beige/60" />
          <div className="h-8 w-3/4 animate-pulse rounded bg-beige/60" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-beige/60" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <PageHeader title="Door not found" description="This door may have been removed or renamed." crumbs={[{ label: 'Shop', to: '/shop' }, { label: 'Not found' }]} />
        <div className="shell py-16">
          <Link to="/shop" className="btn btn-primary">
            Back to all doors <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </>
    );
  }

  const gallery = [imageFor(product), ...(product.gallery || []).filter(Boolean)].filter(Boolean);
  const current = activeImage || gallery[0];
  const wa = waLink(settings.whatsapp, productInquiryText(product));
  const specs = [
    ['Code', product.sku],
    ['Collection', category?.name],
    ['Material', product.material],
    ['Finish', product.finish],
    ['Availability', product.availability],
    [
      'Standard size',
      [product.width_mm, product.height_mm].filter(Boolean).length
        ? `${product.width_mm || '—'} × ${product.height_mm || '—'} mm${product.thickness_mm ? ` · ${product.thickness_mm} mm thick` : ''}`
        : null,
    ],
  ].filter(([, value]) => Boolean(value));

  return (
    <>
      <PageHeader
        eyebrow={category?.name}
        title={product.name}
        description={product.short_description}
        crumbs={[{ label: 'Shop', to: '/shop' }, { label: category?.name || 'Doors', to: category ? `/category/${category.slug}` : '/shop' }, { label: product.name }]}
      />

      <section className="shell py-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div className="overflow-hidden rounded-[6px] border border-beige bg-white">
              <div className="aspect-[4/5] w-full bg-beige">
                <Image src={current} alt={`${product.name} (${product.sku || 'door'})`} className="h-full w-full object-cover" />
              </div>
            </div>
            {gallery.length > 1 ? (
              <div className="mt-3 flex gap-3">
                {gallery.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(src)}
                    aria-label="View image"
                    className={`h-20 w-16 overflow-hidden rounded-[4px] border transition-colors ${current === src ? 'border-copper' : 'border-beige hover:border-bronze'}`}
                  >
                    <Image src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            {category ? (
              <Link to={`/category/${category.slug}`} className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-copper">
                {category.name}
              </Link>
            ) : null}
            <h2 className="mt-3 font-heading text-[26px] font-semibold leading-tight text-espresso sm:text-[32px]">{product.name}</h2>
            <p className="mt-3 text-[13.5px] text-clay">
              {[product.material, product.finish].filter(Boolean).join(' · ')}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-beige py-4">
              <span className="font-heading text-[22px] font-semibold text-espresso">{priceLabel(product)}</span>
              <span className="text-[12px] uppercase tracking-[0.14em] text-clay">{product.sku}</span>
              {product.availability ? (
                <span className="flex items-center gap-1.5 text-[12px] text-copper">
                  <Check className="h-3.5 w-3.5" /> {product.availability}
                </span>
              ) : null}
            </div>

            <p className="mt-6 text-[14.5px] leading-relaxed text-clay">{product.description || product.short_description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => setQuoteOpen(true)} className="btn btn-primary flex-1 px-6">
                {product.price_on_request || !product.price ? 'Request Pricing' : 'Request This Door'}
              </button>
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline flex-1 px-6">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Inquiry
                </a>
              ) : (
                <Link to="/contact" className="btn btn-outline flex-1 px-6">
                  <MessageCircle className="h-4 w-4" /> Contact Us
                </Link>
              )}
            </div>
            <p className="mt-3 text-[12px] text-clay">
              Quotations are confirmed by our team after reviewing your requirements — submitting a request does not
              place an order.
            </p>

            <dl className="mt-9 divide-y divide-beige border-t border-beige">
              {specs.map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-6 py-3">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-clay">{label}</dt>
                  <dd className="text-right text-[13.5px] text-espresso">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-[6px] border border-beige bg-white p-5">
              <p className="font-heading text-[14.5px] font-semibold text-espresso">Need a different size or finish?</p>
              <p className="mt-2 text-[13px] leading-relaxed text-clay">
                Each door can be discussed as a custom request with your own dimensions, material and finish.
              </p>
              <Link to="/custom-door" className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-copper">
                Start a custom request <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="border-t border-beige bg-white py-14 lg:py-20">
          <div className="shell">
            <h2 className="font-heading text-[22px] font-semibold text-espresso sm:text-[28px]">Related doors</h2>
            <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} categoryName={category?.name} whatsapp={settings.whatsapp} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} product={product} />
    </>
  );
}