import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { SECTION_IMAGES } from '@/lib/media';
import { waLink } from '@/lib/site';
import Reveal from '@/components/site/Reveal';

export default function CustomDoorCta({ settings }) {
  const wa = waLink(settings?.whatsapp, 'Assalam o Alaikum Doorix, I would like to discuss a custom door requirement.');

  return (
    <section id="custom" className="scroll-mt-32 bg-ivory py-20 lg:py-28">
      <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 overflow-hidden rounded-[6px] border border-beige lg:order-1">
          <Image
            src={SECTION_IMAGES.custom}
            alt="Walnut door sample with architectural drawings, finish swatches and a measuring tape"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-7 bg-copper/40" />
            Made to your requirements
          </p>
          <h2 className="mt-5 text-[28px] font-semibold leading-[1.12] text-espresso sm:text-[36px] lg:text-[40px]">
            Can’t Find the Door You’re Looking For?
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-clay">
            Tell us about your preferred design, dimensions, material, and finish. Submit your requirements to request a
            custom door quotation from Doorix.
          </p>

          <ul className="mt-7 space-y-3 border-l border-bronze/40 pl-5 text-[14px] text-espresso/80">
            <li>Share your width, height and thickness</li>
            <li>Choose a material and finish direction</li>
            <li>Attach a reference image if you have one</li>
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/custom-door" className="btn btn-primary px-7">
              Start Your Custom Order <ArrowRight className="h-4 w-4" />
            </Link>
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline px-7">
                <MessageCircle className="h-4 w-4" /> Discuss on WhatsApp
              </a>
            ) : (
              <Link to="/contact" className="btn btn-outline px-7">
                <MessageCircle className="h-4 w-4" /> Discuss Your Requirement
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}