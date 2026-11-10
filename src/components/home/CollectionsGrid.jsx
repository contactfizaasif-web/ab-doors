import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';
import { imageFor } from '@/lib/media';
import SectionHeading from '@/components/site/SectionHeading';
import Reveal from '@/components/site/Reveal';

export default function CollectionsGrid({ categories }) {
  return (
    <section id="collections" className="scroll-mt-32 bg-white py-20 lg:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Explore our collections"
          title="Find Your Perfect Door"
          description="Explore a range of door styles, materials, and finishes to find the right option for your space."
          action={
            <Link
              to="/categories"
              className="group inline-flex items-center gap-2 border-b border-copper/40 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-copper"
            >
              All collections
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />

        <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:auto-rows-[212px]">
          {categories.slice(0, 8).map((category, i) => (
            <Reveal
              key={category.slug}
              delay={(i % 4) * 70}
              className={cn(
                'group relative overflow-hidden rounded-[6px] bg-beige',
                i === 0 && 'col-span-2 lg:row-span-2',
                i === 1 && 'col-span-2',
                i > 1 && 'col-span-1'
              )}
            >
              <Link to={`/category/${category.slug}`} className="block h-full w-full">
                <div className="relative h-full min-h-[168px] w-full overflow-hidden">
                  <Image
                    src={imageFor(category)}
                    alt={`${category.name} in Lahore`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <h3
                      className={cn(
                        'font-heading font-semibold leading-tight text-ivory',
                        i === 0 ? 'text-[22px] sm:text-[26px]' : 'text-[15px] sm:text-[17px]'
                      )}
                    >
                      {category.name}
                    </h3>
                    <span className="mt-1.5 flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.16em] text-bronze">
                      Explore Collection
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}