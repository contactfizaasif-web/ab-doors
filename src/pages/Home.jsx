import { useCatalog } from '@/hooks/useCatalog';
import { heroSlides } from '@/data/heroSlides';
import HeroSlider from '@/components/home/HeroSlider';
import PromoBoxes from '@/components/home/PromoBoxes';
import CollectionsGrid from '@/components/home/CollectionsGrid';
import DealOfDay from '@/components/home/DealOfDay';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyChoose from '@/components/home/WhyChoose';
import CustomDoorCta from '@/components/home/CustomDoorCta';
import FestivalBanner from '@/components/home/FestivalBanner';
import FaqAccordion from '@/components/home/FaqAccordion';
import ContactSection from '@/components/home/ContactSection';

export default function Home() {
  const { data, isLoading } = useCatalog();
  const categories = data?.categories ?? [];
  const products = data?.products ?? [];
  const promotions = data?.promotions ?? [];
  const settings = data?.settings ?? {};

  const featured = products.filter((p) => p.is_featured).slice(0, 8);
  const deal = promotions.find((p) => p.kind === 'deal_of_the_day' && p.is_active);
  const dealProduct =
    (deal ? products.find((p) => p.slug === deal.product_slug) : null) ||
    products.find((p) => p.is_featured) ||
    products[0];
  const festival = promotions.find((p) => p.kind === 'festival');

  if (isLoading) {
    return (
      <div className="shell py-20">
        <div className="h-[52vh] w-full animate-pulse rounded-[6px] bg-beige/70" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-[6px] bg-beige/60" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSlider slides={heroSlides} />
      <PromoBoxes />
      <CollectionsGrid categories={categories} />
      {dealProduct ? <DealOfDay promotion={deal} product={dealProduct} whatsapp={settings.whatsapp} /> : null}
      <FeaturedProducts products={featured} categories={categories} whatsapp={settings.whatsapp} />
      <WhyChoose />
      <CustomDoorCta settings={settings} />
      <FestivalBanner promotion={festival} />
      <FaqAccordion />
      <ContactSection settings={settings} />
    </>
  );
}