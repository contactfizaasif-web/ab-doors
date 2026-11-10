import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { SECTION_IMAGES } from '@/lib/media';
import { useCatalog } from '@/hooks/useCatalog';
import { waLink } from '@/lib/site';
import PageHeader from '@/components/site/PageHeader';
import Reveal from '@/components/site/Reveal';

const values = [
  {
    title: 'Design-led selection',
    body: 'Every door we list is chosen for how it looks in a real interior — proportion, grain direction and finish first.',
  },
  {
    title: 'Clear specifications',
    body: 'Material, finish, code and availability are listed on each door so you can compare options without guessing.',
  },
  {
    title: 'Made to measure',
    body: 'Where a standard size will not work, we take custom requests with your own dimensions and preferences.',
  },
  {
    title: 'Lahore based support',
    body: 'You deal directly with our team in Lahore for availability, quotations and delivery questions.',
  },
];

export default function About() {
  const { data } = useCatalog();
  const wa = waLink(data?.settings?.whatsapp, 'Assalam o Alaikum Doorix, I would like to know more about your doors.');

  return (
    <>
      <PageHeader
        eyebrow="About Doorix"
        title="Doors Made for Lahore Homes"
        description="Doorix is a Lahore-based door supplier working with wooden entrance doors, interior doors and custom-made doors for homes across the city."
        crumbs={[{ label: 'About Us' }]}
      />

      <section className="shell py-14 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Our approach</p>
            <h2 className="mt-5 text-[27px] font-semibold leading-[1.15] text-espresso sm:text-[34px]">
              A door is the first thing a home says about itself.
            </h2>
            <div className="mt-5 space-y-4 text-[14.5px] leading-relaxed text-clay">
              <p>
                We keep our catalogue focused: entrance doors that hold a facade, interior doors that sit quietly in a
                hallway, and timber doors that show the material they are made from.
              </p>
              <p>
                Instead of listing everything available on the market, we describe each door clearly — its material,
                finish, code and availability — so the decision is about the door you actually want.
              </p>
              <p>
                If nothing in the catalogue fits your opening or your design, send us the measurements and we will
                discuss a custom door quotation.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop" className="btn btn-primary px-6">
                Browse Doors <ArrowRight className="h-4 w-4" />
              </Link>
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline px-6">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={120} className="overflow-hidden rounded-[6px] border border-beige">
            <Image
              src={SECTION_IMAGES.workshop}
              alt="Woodworking bench with a sheesham door panel, hand tools and wood shavings"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-beige bg-white py-14 lg:py-20">
        <div className="shell">
          <h2 className="text-[24px] font-semibold text-espresso sm:text-[30px]">How we work</h2>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {values.map((item, i) => (
              <Reveal key={item.title} delay={i * 70} className="border-t border-beige pt-5">
                <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">0{i + 1}</span>
                <h3 className="mt-2.5 font-heading text-[17px] font-semibold text-espresso">{item.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-clay">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-espresso py-16 text-ivory lg:py-20">
        <div className="shell flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-[24px] font-semibold sm:text-[30px]">Planning a door for your home?</h2>
            <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-ivory/65">
              Send us the opening size and the look you are after, and our team will guide you through the options.
            </p>
          </div>
          <Link to="/custom-door" className="btn btn-ghost-light px-7">
            Start a Custom Request <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}