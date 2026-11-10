import PageHeader from '@/components/site/PageHeader';

const sections = [
  {
    title: 'About these terms',
    body: 'These terms apply to your use of the Doorix website and to inquiries and custom door requests submitted through it. By using the site you accept them.',
  },
  {
    title: 'Product information',
    body: 'Door descriptions, materials, finishes and availability are provided in good faith and may be updated as our catalogue changes. Photographs are representative — natural wood grain and finish can vary between pieces.',
  },
  {
    title: 'Pricing and quotations',
    body: 'Where a price is displayed, it is in Pakistani Rupees (PKR). Doors marked “Request Pricing” are quoted individually. A quotation is valid for the period stated on it and is only confirmed once Doorix has reviewed your requirements.',
  },
  {
    title: 'Custom door requests',
    body: 'Submitting a custom door request does not place an order and does not create a binding agreement. Our team reviews each request and contacts you to confirm the design, dimensions, price and timing before any work begins.',
  },
  {
    title: 'Availability and delivery',
    body: 'Availability is confirmed by our team for each door. Delivery arrangements, timelines and any charges are agreed with you directly and confirmed before an order is processed.',
  },
  {
    title: 'Measurements',
    body: 'Where you provide your own measurements, please check them carefully. If you would like help measuring, indicate this in your request and our team will guide you.',
  },
  {
    title: 'Website use',
    body: 'The content, images and design of this website belong to Doorix and may not be reproduced for commercial use without permission.',
  },
  {
    title: 'Contact',
    body: 'Questions about these terms can be sent through our contact page, and our team in Lahore will respond.',
  },
];

export default function Terms() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms and Conditions"
        description="The basis on which Doorix lists doors, prepares quotations and accepts custom door requests."
        crumbs={[{ label: 'Terms and Conditions' }]}
      />
      <section className="shell max-w-3xl py-14 lg:py-20">
        <div className="space-y-9">
          {sections.map((section) => (
            <div key={section.title} className="border-t border-beige pt-6 first:border-0 first:pt-0">
              <h2 className="font-heading text-[19px] font-semibold text-espresso">{section.title}</h2>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-clay">{section.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-[12px] text-clay">Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
      </section>
    </>
  );
}