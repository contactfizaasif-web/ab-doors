import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import Logo from '@/components/site/Logo';
import { useCatalog } from '@/hooks/useCatalog';
import { waLink } from '@/lib/site';

const shopLinks = [
  { label: 'Shop All Doors', to: '/shop' },
  { label: 'Main Entrance Doors', to: '/category/main-entrance-doors' },
  { label: 'Interior Doors', to: '/category/interior-doors' },
  { label: 'Wooden Doors', to: '/category/wooden-doors' },
  { label: 'Flush Doors', to: '/category/flush-doors' },
  { label: 'Custom-Made Doors', to: '/custom-door' },
];

const supportLinks = [
  { label: 'Contact Us', to: '/contact' },
  { label: 'Custom Door Order', to: '/custom-door' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Product Availability', to: '/shop' },
];

export default function Footer() {
  const { data } = useCatalog();
  const settings = data?.settings ?? {};
  const wa = waLink(settings.whatsapp, 'Assalam o Alaikum Doorix, I would like to inquire about your doors.');

  return (
    <footer className="bg-espresso text-ivory">
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-20">
        <div>
          <Logo variant="light" />
          <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-ivory/65">
            Doorix supplies wooden entrance doors, interior doors and custom-made doors to homes across Lahore.
          </p>
          <p className="mt-5 flex items-center gap-2 text-[13px] text-ivory/60">
            <MapPin className="h-4 w-4 text-bronze" aria-hidden="true" />
            Lahore, Pakistan
          </p>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">Shop</h3>
          <ul className="mt-5 space-y-3">
            {shopLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-[14px] text-ivory/70 transition-colors hover:text-bronze">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">Customer support</h3>
          <ul className="mt-5 space-y-3">
            {supportLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-[14px] text-ivory/70 transition-colors hover:text-bronze">
                  {l.label}
                </Link>
              </li>
            ))}
            {wa ? (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="text-[14px] text-ivory/70 transition-colors hover:text-bronze">
                  WhatsApp Inquiry
                </a>
              </li>
            ) : (
              <li>
                <Link to="/contact" className="text-[14px] text-ivory/70 transition-colors hover:text-bronze">
                  WhatsApp Inquiry
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">Contact</h3>
          <ul className="mt-5 space-y-3 text-[14px] text-ivory/70">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bronze" aria-hidden="true" />
              {settings.address || 'Lahore, Pakistan'}
            </li>
            {settings.phone ? (
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-bronze" aria-hidden="true" />
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-bronze">
                  {settings.phone}
                </a>
              </li>
            ) : null}
            {settings.email ? (
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-bronze" aria-hidden="true" />
                <a href={`mailto:${settings.email}`} className="transition-colors hover:text-bronze">
                  {settings.email}
                </a>
              </li>
            ) : null}
            {settings.hours ? (
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-bronze" aria-hidden="true" />
                {settings.hours}
              </li>
            ) : null}
            {!settings.phone && !settings.email ? (
              <li className="text-ivory/55">Send us a message and our team will respond with the right contact details.</li>
            ) : null}
          </ul>
          <Link to="/contact" className="btn btn-light mt-6 h-11 min-h-0 px-5 text-[11px]">
            <MessageCircle className="h-4 w-4" /> Send an inquiry
          </Link>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="shell flex flex-col gap-3 py-6 text-[12px] text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Doorix, Lahore. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="transition-colors hover:text-bronze">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-bronze">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}