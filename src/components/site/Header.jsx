import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useCatalog } from '@/hooks/useCatalog';
import TopBar from '@/components/site/TopBar';
import HeaderBar from '@/components/site/HeaderBar';

export default function Header() {
  const { data } = useCatalog();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-beige/80 bg-ivory">
      <div
        className={cn(
          'overflow-hidden transition-[height,opacity] duration-300 ease-out',
          scrolled ? 'h-0 opacity-0' : 'h-9 opacity-100'
        )}
      >
        <TopBar settings={data?.settings} />
      </div>
      <HeaderBar categories={data?.categories ?? []} settings={data?.settings} compact={scrolled} />
    </header>
  );
}