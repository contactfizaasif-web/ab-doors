import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV } from '@/lib/site';

const linkClass = ({ isActive }) =>
  cn(
    'relative py-2 text-[12.5px] font-medium uppercase tracking-[0.13em] transition-colors',
    'after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-copper after:transition-all after:duration-300 hover:after:w-full',
    isActive ? 'text-copper after:w-full' : 'text-espresso/80 hover:text-copper'
  );

export default function HeaderNav({ categories }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="hidden items-center gap-7 xl:gap-9 lg:flex" aria-label="Main navigation">
      {NAV.map((item) =>
        item.mega ? (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-haspopup="true"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1 py-2 text-[12.5px] font-medium uppercase tracking-[0.13em] text-espresso/80 transition-colors hover:text-copper"
            >
              {item.label}
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-300', open && 'rotate-180')} />
            </button>
            {open ? (
              <div className="absolute left-1/2 top-full z-50 w-[620px] -translate-x-1/2 pt-2">
                <div className="rounded-[6px] border border-beige bg-ivory p-6 shadow-[0_36px_70px_-45px_rgba(33,18,12,0.55)]">
                  <Link
                    to="/shop"
                    onClick={() => setOpen(false)}
                    className="mb-4 flex items-center justify-between border-b border-beige pb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-copper"
                  >
                    All Doors
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <div className="grid grid-cols-2 gap-x-8">
                    {categories.slice(0, 8).map((category) => (
                      <Link
                        key={category.slug}
                        to={`/category/${category.slug}`}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between border-b border-beige/70 py-3 text-[14px] text-espresso/85 transition-colors hover:text-copper last:border-b"
                      >
                        {category.name}
                        <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-bronze opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/categories"
                    onClick={() => setOpen(false)}
                    className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-copper"
                  >
                    View all categories <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <NavLink key={item.label} to={item.to} className={linkClass}>
            {item.label}
          </NavLink>
        )
      )}
    </nav>
  );
}