import { useCatalog } from '@/hooks/useCatalog';
import PageHeader from '@/components/site/PageHeader';

const sections = [
  {
    title: 'Information we collect',
    body: 'When you send an inquiry or a custom door request, we collect the details you provide: your name, phone or WhatsApp number, optional email address, delivery city and the door requirements you describe. If you upload a reference image, we store it so our team can review your design.',
  },
  {
    title: 'How we use your information',
    body: 'Your details are used only to respond to your inquiry, prepare a quotation, discuss your requirements and arrange any order you place. We do not sell your information, and we do not use it for unrelated marketing.',
  },
  {
    title: 'Storage and access',
    body: 'Inquiries and custom door requests are stored in our store system and can only be viewed by Doorix staff managing customer requests. Reference images you upload are stored privately and are not publicly accessible.',
  },
  {
    title: 'Sharing',
    body: 'We do not share your details with third parties except where necessary to fulfil a request you have made — for example a delivery arrangement — or where we are required to by law.',
  },
  {
    title: 'Retention',
    body: 'We keep inquiry and order records for as long as needed to respond to you and to maintain our records. You can ask us to remove your details by contacting us.',
  },
  {
    title: 'Cookies and measurement',
    body: 'The site uses the minimum required to operate. If we add analytics in future, this page will describe what is measured.',
  },
  {
    title: 'Your choices',
    body: 'You can ask us what information we hold about you, request a correction, or ask us to delete it. Use the contact page to reach our team.',
  },
];

export default function PrivacyPolicy() {
  const { data } = useCatalog();
  const settings = data?.settings ?? {};

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Doorix handles the information you share through this website."
        crumbs={[{ label: 'Privacy Policy' }]}
      />
      <section className="shell max-w-3xl py-14 lg:py-20">
        <div className="space-y-9">
          {sections.map((section) => (
            <div key={section.title} className="border-t border-beige pt-6 first:border-0 first:pt-0">
              <h2 className="font-heading text-[19px] font-semibold text-espresso">{section.title}</h2>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-clay">{section.body}</p>
            </div>
          ))}
          <div className="border-t border-beige pt-6">
            <h2 className="font-heading text-[19px] font-semibold text-espresso">Contact</h2>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-clay">
              For any privacy question, contact Doorix in Lahore
              {settings.phone ? ` on ${settings.phone}` : ''}
              {settings.email ? ` or at ${settings.email}` : ''} — or send a message through our contact page.
            </p>
          </div>
        </div>
        <p className="mt-10 text-[12px] text-clay">Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
      </section>
    </>
  );
}