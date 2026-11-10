import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { waLink } from '@/lib/site';
import Logo from '@/components/site/Logo';
import HeaderNav from '@/components/site/HeaderNav';
import MobileMenu from '@/components/site/MobileMenu';
import SearchDialog from '@/components/site/SearchDialog';

export default function HeaderBar({ categories, settings, compact }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const wa = waLink(settings?.whatsapp, 'Assalam o Alaikum Doorix, I would like help choosing a door.');

  return (
    <div className="relative">
      <div
        className={cn(
          'shell flex items-center justify-between gap-4 transition-[height] duration-300',
          compact ? 'h-[62px]' : 'h-[76px]'
        )}
      >
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            className="-ml-2 flex h-11 w-11 items-center justify-center text-espresso transition-colors hover:text-copper lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" aria-label="Doorix home" className="shrink-0">
            <Logo compact={compact} />
          </Link>
        </div>

        <HeaderNav categories={categories} />

        <div className="flex items-center gap-1 md:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search doors"
            className="flex h-11 w-11 items-center justify-center text-espresso/75 transition-colors hover:text-copper"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp inquiry"
              className="hidden h-11 w-11 items-center justify-center text-espresso/75 transition-colors hover:text-copper sm:flex"
            >
              <MessageCircle className="h-[18px] w-[18px]" />
            </a>
          ) : null}
          <Link to="/custom-door" className="btn btn-primary ml-1 hidden h-11 min-h-0 px-5 text-[11px] lg:inline-flex">
            Order Custom Door
          </Link>
        </div>
      </div>

      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} categories={categories} settings={settings} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}