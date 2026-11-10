import { useCatalog } from '@/hooks/useCatalog';
import PageHeader from '@/components/site/PageHeader';
import ContactSection from '@/components/home/ContactSection';

export default function Contact() {
  const { data } = useCatalog();

  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="Talk to Doorix"
        description="Ask about a door, check availability, or send your custom requirements. Our team in Lahore will respond using the details you provide."
        crumbs={[{ label: 'Contact Us' }]}
      />
      <ContactSection settings={data?.settings ?? {}} />
    </>
  );
}