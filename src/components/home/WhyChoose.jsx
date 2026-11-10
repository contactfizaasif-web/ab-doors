import { Link } from 'react-router-dom';
import { PenTool, Layers, Ruler, MapPin, ArrowRight } from 'lucide-react';
import Reveal from '@/components/site/Reveal';

const features = [
  {
    icon: PenTool,
    title: 'Thoughtful Door Designs',
    body: 'Explore different door styles to suit a range of interior and entrance requirements.',
  },
  {
    icon: Layers,
    title: 'Material and Finish Options',
    body: 'Compare the materials, finishes, and specifications available for each listed door.',
  },
  {
    icon: Ruler,
    title: 'Custom Door Requests',
    body: 'Share your preferred dimensions and design requirements for a tailored quotation.',
  },
  {
    icon: MapPin,
    title: 'Local Customer Support',
    body: 'Get in touch with Doorix in Lahore to discuss product availability and ordering.',
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-espresso py-20 text-ivory lg:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4 text-bronze">Why Doorix</p>
            <h2 className="text-[30px] font-semibold leading-[1.1] sm:text-[38px] lg:text-[44px]">
              Why Choose Doorix?
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ivory/65">
              Find a door that suits your space, style, and requirements with a straightforward product selection and
              inquiry experience.
            </p>
            <Link to="/shop" className="btn btn-light mt-9 h-11 min-h-0 px-6 text-[11px]">
              Explore Our Doors <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} delay={i * 90} className="border-t border-ivory/15 pt-6">
                  <Icon className="h-6 w-6 text-bronze" strokeWidth={1.4} aria-hidden="true" />
                  <h3 className="mt-4 font-heading text-[17px] font-semibold text-ivory">{feature.title}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-ivory/60">{feature.body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}