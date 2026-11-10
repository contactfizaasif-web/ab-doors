import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV, waLink } from '@/lib/site';

export default function MobileMenu({ open, onOpenChange, categories, settings }) {
  const [expanded, setExpanded] = useState(false);
  const wa = waLink(settings?.whatsapp, 'Assalam o Alaikum Doorix, I would like help choosing a door.');

  useEffect(() => {
    if (!open) {
      setExpanded(false);
      return undefined;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ivory lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-beige px-5">
        <span className="font-heading text-[13px] font-semibold uppercase tracking-[0.24em] text-copper">Menu</span>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center text-espresso"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile navigation">
        <ul className="space-y-1">
          {NAV.map((item) => (
            <li key={item.label}>
              {item.mega ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    aria-expanded={expanded}
                    className="flex w-full items-center justify-between border-b border-beige/80 py-4 text-left font-heading text-[17px] text-espresso"
                  >
                    {item.label}
                    <ChevronDown className={cn('h-4 w-4 text-bronze transition-transform', expanded && 'rotate-180')} />
                  </button>
                  {expanded ? (
                    <ul className="mb-2 mt-1 space-y-1 border-l border-beige pl-4">
                      <li>
                        <Link to="/shop" onClick={() => onOpenChange(false)} className="block py-2.5 text-[14px] font-medium text-copper">
                          All doors
                        </Link>
                      </li>
                      {categories.map((c) => (
                        <li key={c.slug}>
                          <Link
                            to={`/category/${c.slug}`}
                            onClick={() => onOpenChange(false)}
                            className="block py-2.5 text-[14px] text-espresso/75"
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link to="/categories" onClick={() => onOpenChange(false)} className="block py-2.5 text-[14px] font-medium text-copper">
                          All categories
                        </Link>
                      </li>
                    </ul>
                  ) : null}
                </div>
              ) : (
                <Link
                  to={item.to}
                  onClick={() => onOpenChange(false)}
                  className="block border-b border-beige/80 py-4 font-heading text-[17px] text-espresso"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="shrink-0 space-y-3 border-t border-beige bg-white p-5">
        <Link to="/custom-door" onClick={() => onOpenChange(false)} className="btn btn-primary w-full">
          Order Custom Door <ArrowRight className="h-4 w-4" />
        </Link>
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full">
            <MessageCircle className="h-4 w-4" /> WhatsApp Us
          </a>
        ) : (
          <Link to="/contact" onClick={() => onOpenChange(false)} className="btn btn-outline w-full">
            <MessageCircle className="h-4 w-4" /> Contact Us
          </Link>
        )}
      </div>
    </div>
  );
}