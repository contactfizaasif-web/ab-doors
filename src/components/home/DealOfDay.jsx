import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { imageFor } from '@/lib/media';
import { formatPKR, priceLabel, waLink, productInquiryText } from '@/lib/site';
import DealCountdown from '@/components/home/DealCountdown';
import Reveal from '@/components/site/Reveal';

export default function DealOfDay({ promotion, product, whatsapp }) {
  if (!product) return null;

  const endsAt = promotion?.ends_at ? new Date(promotion.ends_at) : null;
  const liveOffer = Boolean(promotion?.is_active) && (!endsAt || endsAt.getTime() > Date.now());
  const offerPrice = liveOffer ? formatPKR(promotion.offer_price) : null;
  const originalPrice = liveOffer ? formatPKR(promotion.original_price) : null;
  const wa = waLink(whatsapp, productInquiryText(product));

  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="shell">
        <div className="grid items-stretch gap-0 overflow-hidden rounded-[6px] border border-beige bg-white lg:grid-cols-2">
          <Reveal className="relative min-h-[320px] overflow-hidden bg-beige lg:min-h-[520px]">
            <Image
              src={liveOffer && promotion.image_url ? promotion.image_url : imageFor(product)}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <span className="absolute left-5 top-5 bg-espresso px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-ivory">
              {liveOffer ? 'Deal of the Day' : 'Featured Door'}
            </span>
          </Reveal>

          <Reveal delay={120} className="flex flex-col justify-center p-7 sm:p-11 lg:p-14">
            <p className="eyebrow">
              {liveOffer ? 'A Special Offer for Your Space' : 'Featured door'}
            </p>
            <h2 className="mt-5 font-heading text-[28px] font-semibold leading-tight text-espresso sm:text-[34px]">
              {liveOffer && promotion.title ? promotion.title : product.name}
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-clay">
              {liveOffer && promotion.description
                ? promotion.description
                : 'Discover our featured door and explore the available offer.'}
            </p>

            <div className="mt-6 flex flex-wrap items-end gap-4">
              {offerPrice ? (
                <>
                  <span className="font-heading text-[26px] font-semibold text-copper">{offerPrice}</span>
                  {originalPrice ? (
                    <span className="pb-1 text-[15px] text-clay line-through">{originalPrice}</span>
                  ) : null}
                </>
              ) : (
                <span className="font-heading text-[20px] font-medium text-espresso">{priceLabel(product)}</span>
              )}
              <span className="pb-1 text-[12px] text-clay">Code {product.sku}</span>
            </div>

            {liveOffer && endsAt ? (
              <div className="mt-6">
                <DealCountdown endsAt={promotion.ends_at} />
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-beige py-4 text-[12.5px] text-clay">
              <span>{product.material}</span>
              <span className="text-bronze">·</span>
              <span>{product.finish}</span>
              <span className="text-bronze">·</span>
              <span>{product.availability}</span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={`/product/${product.slug}`} className="btn btn-primary px-7">
                {liveOffer ? 'View Deal' : 'View Door'} <ArrowRight className="h-4 w-4" />
              </Link>
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline px-7">
                  <MessageCircle className="h-4 w-4" /> Inquire on WhatsApp
                </a>
              ) : (
                <Link to="/contact" className="btn btn-outline px-7">
                  <MessageCircle className="h-4 w-4" /> Inquire Now
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}