import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Reveal from '@/components/site/Reveal';

export default function PageHeader({ eyebrow, title, description, crumbs = [] }) {
  return (
    <section className="border-b border-beige bg-ivory pb-12 pt-10 lg:pb-16 lg:pt-14">
      <div className="shell">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.16em] text-clay">
          <Link to="/" className="transition-colors hover:text-copper">
            Home
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label} className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3 text-bronze" aria-hidden="true" />
              {crumb.to ? (
                <Link to={crumb.to} className="transition-colors hover:text-copper">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-espresso/70">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <Reveal className="mt-7 max-w-3xl">
          {eyebrow ? (
            <p className="eyebrow mb-4">{eyebrow}</p>
          ) : null}
          <h1 className="text-[30px] font-semibold leading-[1.1] text-espresso sm:text-[40px] lg:text-[46px]">{title}</h1>
          {description ? <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-clay">{description}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}