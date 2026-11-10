import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Search, SlidersHorizontal } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useCatalog } from '@/hooks/useCatalog';
import PageHeader from '@/components/site/PageHeader';
import ProductCard from '@/components/shop/ProductCard';
import { cn } from '@/lib/utils';

const SORTS = {
  sort_order: 'Recommended',
  '-created_date': 'Newest first',
  name: 'Name A–Z',
  '-name': 'Name Z–A',
};

function buildQuery(filters) {
  const query = { is_active: true };
  if (filters.category) query.category_slug = filters.category;
  if (filters.material) query.material = filters.material;
  if (filters.finish) query.finish = filters.finish;
  if (filters.availability) query.availability = filters.availability;
  const term = filters.q.trim();
  if (term) {
    const rx = { $regex: term, $options: 'i' };
    query.$or = [{ name: rx }, { sku: rx }, { material: rx }, { finish: rx }, { short_description: rx }];
  }
  return query;
}

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const { data: catalog } = useCatalog();
  const [filters, setFilters] = useState({
    q: params.get('q') || '',
    category: params.get('category') || '',
    material: '',
    finish: '',
    availability: '',
    sort: 'sort_order',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setFilters((f) => ({ ...f, q: params.get('q') || '', category: params.get('category') || '' }));
  }, [params]);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['shop', filters],
    queryFn: ({ pageParam }) =>
      base44.entities.Product.filter(buildQuery(filters), {
        sort: filters.sort,
        limit: 12,
        ...(pageParam ? { cursor: pageParam } : {}),
      }),
    initialPageParam: null,
    getNextPageParam: (last) => (last?.has_more ? last.next_cursor : undefined),
  });

  const products = data?.pages.flatMap((page) => page.items ?? []) ?? [];
  const categories = catalog?.categories ?? [];
  const materials = useMemo(
    () => [...new Set((catalog?.products ?? []).map((p) => p.material).filter(Boolean))],
    [catalog]
  );
  const finishes = useMemo(
    () => [...new Set((catalog?.products ?? []).map((p) => p.finish).filter(Boolean))],
    [catalog]
  );
  const nameFor = (slug) => categories.find((c) => c.slug === slug)?.name;

  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }));
  const clearAll = () => {
    setFilters({ q: '', category: '', material: '', finish: '', availability: '', sort: 'sort_order' });
    setParams({});
  };
  const activeCount = [filters.category, filters.material, filters.finish, filters.availability].filter(Boolean).length;

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="All Doors"
        description="Browse every door we currently list. Filter by collection, material or finish, and request a quotation for the doors that suit your space."
        crumbs={[{ label: 'Shop' }]}
      />

      <section className="shell py-10 lg:py-14">
        <div className="flex flex-col gap-4 border-b border-beige pb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-clay" aria-hidden="true" />
              <input
                value={filters.q}
                onChange={(e) => update('q', e.target.value)}
                placeholder="Search doors, codes or finishes"
                aria-label="Search doors"
                className="field pl-10"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowFilters((v) => !v)}
                className="btn btn-outline h-12 min-h-0 px-4 text-[11px] lg:hidden"
                aria-expanded={showFilters}
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters{activeCount ? ` (${activeCount})` : ''}
              </button>
              <div className="w-[190px] shrink-0">
                <select
                  value={filters.sort}
                  onChange={(e) => update('sort', e.target.value)}
                  aria-label="Sort doors"
                  className="field"
                >
                  {Object.entries(SORTS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-4', !showFilters && 'hidden lg:grid')}>
            <select value={filters.category} onChange={(e) => update('category', e.target.value)} aria-label="Filter by collection" className="field">
              <option value="">All collections</option>
              {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
            <select value={filters.material} onChange={(e) => update('material', e.target.value)} aria-label="Filter by material" className="field">
              <option value="">All materials</option>
              {materials.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <select value={filters.finish} onChange={(e) => update('finish', e.target.value)} aria-label="Filter by finish" className="field">
              <option value="">All finishes</option>
              {finishes.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
            <select value={filters.availability} onChange={(e) => update('availability', e.target.value)} aria-label="Filter by availability" className="field">
              <option value="">Any availability</option>
              <option value="In Stock">In Stock</option>
              <option value="Made to Order">Made to Order</option>
            </select>
          </div>

          <div className="flex items-center justify-between text-[12.5px] text-clay">
            <p>{isLoading ? 'Loading doors…' : `${products.length} door${products.length === 1 ? '' : 's'} shown`}</p>
            {activeCount || filters.q ? (
              <button type="button" onClick={clearAll} className="text-[11px] font-medium uppercase tracking-[0.14em] text-copper">
                Clear filters
              </button>
            ) : null}
          </div>
        </div>

        {isLoading ? (
          <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] w-full rounded-[6px] bg-beige/60" />
                <div className="mt-4 h-3 w-1/3 rounded bg-beige/60" />
                <div className="mt-3 h-4 w-2/3 rounded bg-beige/60" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="mt-16 border border-beige bg-white px-6 py-16 text-center">
            <h2 className="font-heading text-[22px] font-semibold text-espresso">No doors match these filters</h2>
            <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-clay">
              Try a different collection or clear the filters. If you are looking for something specific, we can make it
              to your requirements.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={clearAll} className="btn btn-outline">Clear filters</button>
              <a href="/custom-door" className="btn btn-primary">Request a Custom Door</a>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categoryName={nameFor(product.category_slug)}
                  whatsapp={catalog?.settings?.whatsapp}
                />
              ))}
            </div>
            {hasNextPage ? (
              <div className="mt-14 flex justify-center">
                <button
                  type="button"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="btn btn-outline px-8"
                >
                  {isFetchingNextPage ? 'Loading…' : 'Load More Doors'}
                </button>
              </div>
            ) : null}
          </>
        )}
      </section>
    </>
  );
}