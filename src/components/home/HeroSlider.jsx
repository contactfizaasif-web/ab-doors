import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';

export default function HeroSlider({ slides }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);

  const go = useCallback(
    (next) => setIndex(((next % slides.length) + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (paused) return undefined;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 7500);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  const onTouchStart = (e) => {
    touchX.current = e.changedTouches[0]?.clientX ?? null;
    setPaused(true);
  };

  const onTouchEnd = (e) => {
    const start = touchX.current;
    const end = e.changedTouches[0]?.clientX ?? null;
    touchX.current = null;
    if (start !== null && end !== null && Math.abs(end - start) > 45) {
      go(index + (end < start ? 1 : -1));
    }
  };

  const active = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured door collections"
      className="relative bg-espresso"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1);
        if (e.key === 'ArrowLeft') go(index - 1);
      }}
    >
      <div className="relative h-[86svh] min-h-[540px] max-h-[820px] w-full overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            aria-hidden={i !== index}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-out',
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              className={cn(
                'h-full w-full object-cover transition-transform duration-1000 ease-out',
                i === index ? 'scale-[1.04]' : 'scale-100'
              )}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-espresso/92 via-espresso/65 to-espresso/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-transparent to-espresso/20" />
          </div>
        ))}

        <div className="relative z-10 flex h-full items-center">
          <div className="shell w-full pb-28 pt-8 sm:pb-24">
            <div key={active.id} className="max-w-[640px] animate-fade-in motion-reduce:animate-none">
              <p className="eyebrow text-bronze">{active.eyebrow}</p>
              <h1 className="mt-6 text-[38px] font-bold leading-[1.05] tracking-[-0.025em] text-ivory sm:text-[54px] lg:text-[66px]">
                {active.title}
              </h1>
              <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ivory/75 sm:text-[17px]">
                {active.description}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link to={active.primary.to} className="btn btn-primary px-7">
                  {active.primary.label} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to={active.secondary.to} className="btn btn-light px-7">
                  {active.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="shell flex items-end justify-between gap-6">
            <div className="flex items-center gap-3" role="tablist" aria-label="Choose slide">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1}: ${slide.title}`}
                  onClick={() => go(i)}
                  className={cn(
                    'h-[3px] transition-all duration-500',
                    i === index ? 'w-12 bg-bronze' : 'w-6 bg-ivory/35 hover:bg-ivory/60'
                  )}
                />
              ))}
            </div>

            <div className="flex items-center border border-bronze/40">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="flex h-12 w-12 items-center justify-center text-ivory/85 transition-colors hover:bg-ivory/10 hover:text-ivory"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <span className="h-6 w-px bg-bronze/40" aria-hidden="true" />
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="flex h-12 w-12 items-center justify-center text-ivory/85 transition-colors hover:bg-ivory/10 hover:text-ivory"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}