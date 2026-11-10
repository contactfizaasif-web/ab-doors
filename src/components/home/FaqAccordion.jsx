import SectionHeading from '@/components/site/SectionHeading';
import FaqList from '@/components/home/FaqList';
import { faqs } from '@/data/faqs';

export default function FaqAccordion({ items = faqs, heading = true }) {
  return (
    <section id="faq" className="scroll-mt-32 border-t border-beige bg-white py-20 lg:py-28">
      <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {heading ? (
          <SectionHeading
            eyebrow="Need to know more?"
            title="Frequently Asked Questions"
            description="Answers about our doors, custom requests and ordering. If your question is not covered, contact our team."
          />
        ) : (
          <div />
        )}

        <FaqList items={items} />
      </div>
    </section>
  );
}