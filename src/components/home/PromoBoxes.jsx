import { Link } from 'react-router-dom';
import { DoorOpen, Ruler, Headset, ArrowRight } from 'lucide-react';
import Reveal from '@/components/site/Reveal';

const boxes = [
  {
    icon: DoorOpen,
    title: 'Doors for Every Space',
    description: 'Explore available designs for entrances, bedrooms, and interiors.',
    cta: 'Shop',
    to: '/shop',
  },
  {
    icon: Ruler,
    title: 'Made to Your Requirements',
    description: 'Share your preferred dimensions, design, and finish.',
    cta: 'Request a Custom Door',
    to: '/custom-door',
  },
  {
    icon: Headset,
    title: 'Need Help Choosing?',
    description: 'Contact our team to discuss your requirements and product options.',
    cta: 'Contact Us',
    to: '/contact',
  },
];

export default function PromoBoxes() {
  return (
    <section className="border-b border-beige bg-ivory">
      <div className="shell grid gap-px py-0 md:grid-cols-3">
        {boxes.map((box, i) => {
          const Icon = box.icon;
          return (
            <Reveal
              key={box.title}
              delay={i * 90}
              className="relative flex flex-col gap-4 border-beige px-0 py-9 md:px-8 md:py-11 md:[&:not(:first-child)]:border-l"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-[5px] border border-bronze/40 text-copper">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                </span>
                <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-heading text-[19px] font-semibold leading-tight text-espresso">{box.title}</h3>
              <p className="max-w-xs text-[14px] leading-relaxed text-clay">{box.description}</p>
              <Link
                to={box.to}
                className="group mt-1 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-copper"
              >
                {box.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}