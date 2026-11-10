import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Logo from '@/components/site/Logo';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'prerender-status-code';
    meta.content = '404';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-ivory px-5">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between py-7">
        <Link to="/" aria-label="Doorix home">
          <Logo />
        </Link>
        <Link to="/shop" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">
          Shop doors
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center py-16">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-5 text-[40px] font-semibold leading-[1.05] text-espresso sm:text-[54px]">
          This door doesn’t open.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-clay">
          We couldn’t find <span className="text-espresso">/{pageName}</span>. It may have moved, or the link may be out
          of date. Explore the collection instead, or contact our team in Lahore.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link to="/shop" className="btn btn-primary px-7">
            Browse Doors <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/" className="btn btn-outline px-7">Back to Home</Link>
          <Link to="/contact" className="btn btn-outline px-7">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}