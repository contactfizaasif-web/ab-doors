import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { imageFor } from '@/lib/media';
import { priceLabel, availabilityTone } from '@/lib/site';
import QuoteDialog from '@/components/shop/QuoteDialog';

export default function ProductCard({ product, categoryName }) {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[8px] border border-beige bg-white transition-all duration-300 hover:border-bronze/60 hover:shadow-[0_28px_55px_-42px_rgba(33,18,12,0.65)]">
      <Link to={`/product/${product.slug}`} className="block overflow-hidden bg-beige" aria-label={`View ${product.name}`}>
        <div className="aspect-[4/5] w-full overflow-hidden">
          <Image
            src={imageFor(product)}
            alt={`${product.name}${product.sku ? ` (${product.sku})` : ''}`}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {categoryName ? (
          <Link
            to={`/category/${product.category_slug}`}
            className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper transition-colors hover:text-espresso"
          >
            {categoryName}
          </Link>
        ) : null}
        <h3 className="mt-2 font-heading text-[17px] font-semibold leading-snug text-espresso">
          <Link to={`/product/${product.slug}`} className="transition-colors hover:text-copper">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-[12.5px] text-clay">
          {[product.material, product.finish].filter(Boolean).join(' · ')}
        </p>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between border-t border-beige pt-3">
            <span className="text-[13px] font-medium text-espresso">{priceLabel(product)}</span>
            <span className={`text-[10.5px] uppercase tracking-[0.12em] ${availabilityTone(product.availability)}`}>
              {product.sku}
            </span>
          </div>

          <div className="mt-3 grid gap-2">
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="btn btn-primary h-10 min-h-0 w-full px-4 text-[10.5px]"
            >
              Request a Quote
            </button>
            <Link
              to={`/product/${product.slug}`}
              className="btn btn-outline h-10 min-h-0 w-full px-4 text-[10.5px]"
            >
              View Detail
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} product={product} />
    </article>
  );
}