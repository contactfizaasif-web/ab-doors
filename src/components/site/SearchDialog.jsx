import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Image } from '@/components/ui/image';
import { useCatalog } from '@/hooks/useCatalog';
import { imageFor } from '@/lib/media';
import { priceLabel } from '@/lib/site';

export default function SearchDialog({ open, onOpenChange }) {
  const { data } = useCatalog();
  const [term, setTerm] = useState('');
  const products = data?.products ?? [];

  const results = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return products.slice(0, 4);
    return products
      .filter((p) =>
        [p.name, p.sku, p.material, p.finish, p.category_slug, p.short_description]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 6);
  }, [products, term]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden border-beige bg-ivory p-0">
        <DialogTitle className="sr-only">Search doors</DialogTitle>
        <div className="flex items-center gap-3 border-b border-beige px-5 py-4">
          <Search className="h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
          <input
            autoFocus
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search by door name, code, material or finish"
            aria-label="Search doors"
            className="h-8 w-full bg-transparent text-[15px] text-espresso outline-none placeholder:text-clay"
          />
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-4 py-10 text-center text-[14px] text-clay">
              No doors match “{term}”. Try a different word or browse the full collection.
            </p>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/product/${p.slug}`}
                    onClick={() => onOpenChange(false)}
                    className="flex items-center gap-4 rounded-[5px] px-3 py-3 transition-colors hover:bg-beige/40"
                  >
                    <div className="h-14 w-12 shrink-0 overflow-hidden rounded-[3px] bg-beige">
                      <Image src={imageFor(p)} alt={p.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-heading text-[14.5px] font-medium text-espresso">{p.name}</p>
                      <p className="mt-0.5 truncate text-[12px] text-clay">
                        {p.sku} · {priceLabel(p)}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-bronze" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-beige bg-white px-5 py-3">
          <Link
            to={term ? `/shop?q=${encodeURIComponent(term)}` : '/shop'}
            onClick={() => onOpenChange(false)}
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper"
          >
            View all doors
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}