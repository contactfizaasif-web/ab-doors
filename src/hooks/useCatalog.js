import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

async function loadCatalog() {
  const [categories, products, promotions, settings] = await Promise.all([
    base44.entities.Category.list({ sort: 'sort_order', limit: 100 }),
    base44.entities.Product.list({ sort: 'sort_order', limit: 300 }),
    base44.entities.Promotion.list({ sort: '-created_date', limit: 50 }),
    base44.entities.StoreSettings.list({ limit: 1 }),
  ]);

  return {
    categories: (categories.items ?? []).filter((c) => c.is_active !== false),
    products: (products.items ?? []).filter((p) => p.is_active !== false),
    promotions: promotions.items ?? [],
    settings: settings.items?.[0] ?? {},
  };
}

export function useCatalog() {
  return useQuery({
    queryKey: ['catalog'],
    queryFn: loadCatalog,
    staleTime: 30_000,
  });
}