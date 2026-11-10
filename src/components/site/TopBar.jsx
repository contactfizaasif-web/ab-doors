import { Phone, Clock } from 'lucide-react';

export default function TopBar({ settings }) {
  return (
    <div className="bg-espresso text-ivory">
      <div className="shell flex h-9 items-center justify-center gap-3 text-center text-[11.5px]">
        <span className="truncate text-ivory/75">
          {settings?.tagline || 'Premium Door Designs for Your Space'}
        </span>
        {settings?.phone ? (
          <>
            <span className="hidden h-3 w-px bg-bronze/40 sm:block" aria-hidden="true" />
            <a
              href={`tel:${settings.phone.replace(/\s/g, '')}`}
              className="hidden items-center gap-1.5 text-ivory/80 transition-colors hover:text-bronze sm:flex"
            >
              <Phone className="h-3.5 w-3.5 text-bronze" aria-hidden="true" />
              {settings.phone}
            </a>
          </>
        ) : null}
        {settings?.hours ? (
          <>
            <span className="hidden h-3 w-px bg-bronze/40 md:block" aria-hidden="true" />
            <span className="hidden items-center gap-1.5 text-ivory/60 md:flex">
              <Clock className="h-3.5 w-3.5 text-bronze" aria-hidden="true" />
              {settings.hours}
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}