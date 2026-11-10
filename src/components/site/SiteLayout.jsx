import { Outlet } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { useCatalog } from '@/hooks/useCatalog';
import { waLink } from '@/lib/site';

export default function SiteLayout() {
  const { data } = useCatalog();
  const wa = waLink(data?.settings?.whatsapp, 'Assalam o Alaikum Doorix, I would like to inquire about your doors.');

  return (
    <div className="flex min-h-screen flex-col bg-ivory font-body text-espresso">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {wa ? (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Doorix on WhatsApp"
          className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-copper text-ivory shadow-[0_14px_30px_-12px_rgba(33,18,12,0.7)] transition-transform hover:scale-105 md:hidden"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      ) : null}
    </div>
  );
}