import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqs } from '@/data/faqs';

export default function FaqList({ items = faqs, className = '' }) {
  return (
    <Accordion type="single" collapsible className={`w-full ${className}`}>
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`faq-${i}`} className="border-b border-beige">
          <AccordionTrigger className="py-5 text-left font-heading text-[15.5px] font-medium text-espresso hover:no-underline sm:text-[16.5px] [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-copper">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="pb-5 pr-8 text-[14px] leading-relaxed text-clay">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}