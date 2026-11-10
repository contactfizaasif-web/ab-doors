import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Check } from 'lucide-react';
import { submitInquiry } from '@/lib/submit';
import { waLink } from '@/lib/site';
import SectionHeading from '@/components/site/SectionHeading';

const EMPTY = { name: '', phone: '', email: '', inquiry_type: 'Product inquiry', message: '' };
const TYPES = ['Product inquiry', 'Custom door', 'Product availability', 'Delivery', 'Something else'];

export default function ContactSection({ settings }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const wa = waLink(settings?.whatsapp, 'Assalam o Alaikum Doorix, I have an inquiry about your doors.');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) return;
    setStatus('saving');
    setError('');
    try {
      await submitInquiry(form);
      setStatus('done');
      setForm(EMPTY);
    } catch (err) {
      setError('We could not send your message just now. Please try again, or reach us on WhatsApp.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="scroll-mt-32 bg-ivory py-20 lg:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Get in touch"
            title="Let’s Find the Right Door for You."
            description="Have questions about a product or need a custom door? Contact Doorix to discuss your requirements."
          />

          <dl className="mt-10 space-y-5 text-[14px]">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-clay">Location</dt>
                <dd className="mt-1 text-espresso">{settings?.address || 'Lahore, Pakistan'}</dd>
              </div>
            </div>
            {settings?.phone ? (
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-clay">Phone</dt>
                  <dd className="mt-1">
                    <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="text-espresso hover:text-copper">
                      {settings.phone}
                    </a>
                  </dd>
                </div>
              </div>
            ) : null}
            {settings?.email ? (
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-clay">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${settings.email}`} className="text-espresso hover:text-copper">
                      {settings.email}
                    </a>
                  </dd>
                </div>
              </div>
            ) : null}
            {settings?.hours ? (
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-clay">Business hours</dt>
                  <dd className="mt-1 text-espresso">{settings.hours}</dd>
                </div>
              </div>
            ) : null}
          </dl>

          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-9 px-6">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          ) : null}
        </div>

        <div className="rounded-[6px] border border-beige bg-white p-6 sm:p-9">
          {status === 'done' ? (
            <div className="flex min-h-[380px] flex-col items-start justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-copper/30 text-copper">
                <Check className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-heading text-[22px] font-semibold text-espresso">Message received</h3>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-clay">
                Thank you — your inquiry has been sent to Doorix. Our team will review your message and respond using
                the contact details you provided.
              </p>
              <button type="button" onClick={() => setStatus('idle')} className="btn btn-outline mt-7 h-11 min-h-0 px-5 text-[11px]">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="field-label">Name *</label>
                  <input id="c-name" required value={form.name} onChange={update('name')} className="field" placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="c-phone" className="field-label">Phone *</label>
                  <input id="c-phone" required value={form.phone} onChange={update('phone')} className="field" placeholder="03xx xxxxxxx" inputMode="tel" />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-email" className="field-label">Email (optional)</label>
                  <input id="c-email" type="email" value={form.email} onChange={update('email')} className="field" placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="c-type" className="field-label">Inquiry type</label>
                  <select id="c-type" value={form.inquiry_type} onChange={update('inquiry_type')} className="field">
                    {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="c-message" className="field-label">Message *</label>
                <textarea
                  id="c-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  className="field h-auto py-3"
                  placeholder="Tell us which door you are interested in, or what you are looking for."
                />
              </div>

              {error ? <p className="text-[13px] text-copper">{error}</p> : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" disabled={status === 'saving'} className="btn btn-primary px-8">
                  {status === 'saving' ? 'Sending…' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}