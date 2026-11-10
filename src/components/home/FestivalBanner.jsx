import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { SECTION_IMAGES } from '@/lib/media';
import Reveal from '@/components/site/Reveal';

export default function FestivalBanner({ promotion }) {
  if (!promotion?.is_active) return null;
  const ends = promotion.ends_at ? new Date(promotion.ends_at) : null;
  if (ends && ends.getTime() <= Date.now()) return null;

  return (
    <section className="bg-espresso">
      <Reveal className="relative isolate overflow-hidden">
        <Image
          src={promotion.image_url || SECTION_IMAGES.festival}
          alt={promotion.title || 'Seasonal door offer at Doorix'}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/92 via-espresso/70 to-espresso/25" />
        <div className="relative shell flex min-h-[360px] flex-col justify-center py-16 lg:min-h-[420px]">
          <p className="eyebrow text-bronze">{promotion.eyebrow || 'Seasonal offer'}</p>
          <h2 className="mt-5 max-w-xl text-[30px] font-semibold leading-[1.1] text-ivory sm:text-[40px]">
            {promotion.title || 'A Fresh Look for Your Home'}
          </h2>
          {promotion.description ? (
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ivory/70">{promotion.description}</p>
          ) : null}
          <Link to={promotion.cta_link || '/shop'} className="btn btn-ghost-light mt-8 w-fit px-7">
            {promotion.cta_label || 'Explore the Collection'} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}