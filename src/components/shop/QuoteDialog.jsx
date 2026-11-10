import { useState } from 'react';
import { MessageCircle, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { submitInquiry } from '@/lib/submit';
import { waLink } from '@/lib/site';

export default function QuoteDialog({ open, onOpenChange, product }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus('saving');
    setError('');
    try {
      await submitInquiry({
        ...form,
        inquiry_type: 'Product inquiry',
        message:
          form.message.trim() ||
          `Please share the price and availability for ${product?.name} (${product?.sku}).`,
        product_name: product?.name ?? '',
        product_sku: product?.sku ?? '',
      });
      setStatus('done');
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      setError('We could not send your request. Please try again, or message us on WhatsApp.');
      setStatus('error');
    }
  };

  const wa = waLink(null);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setStatus('idle');
      }}
    >
      <DialogContent className="max-w-lg border-beige bg-ivory p-6 sm:p-8">
        <DialogTitle className="font-heading text-[22px] font-semibold text-espresso">Request a quotation</DialogTitle>
        <DialogDescription className="mt-2 text-[13.5px] leading-relaxed text-clay">
          {product ? `Tell us how to reach you and we will respond with pricing for ${product.name}.` : 'Tell us how to reach you and we will respond.'}
        </DialogDescription>

        {status === 'done' ? (
          <div className="mt-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-copper/30 text-copper">
              <Check className="h-5 w-5" />
            </span>
            <p className="mt-4 text-[14px] leading-relaxed text-espresso">
              Your inquiry has been sent to Doorix. Our team will contact you with the price and availability.
            </p>
            <button type="button" onClick={() => onOpenChange(false)} className="btn btn-primary mt-6 h-11 min-h-0 px-6 text-[11px]">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label htmlFor="q-name" className="field-label">Name *</label>
              <input id="q-name" required value={form.name} onChange={update('name')} className="field" placeholder="Your full name" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="q-phone" className="field-label">Phone *</label>
                <input id="q-phone" required value={form.phone} onChange={update('phone')} className="field" placeholder="03xx xxxxxxx" inputMode="tel" />
              </div>
              <div>
                <label htmlFor="q-email" className="field-label">Email (optional)</label>
                <input id="q-email" type="email" value={form.email} onChange={update('email')} className="field" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label htmlFor="q-message" className="field-label">Message</label>
              <textarea
                id="q-message"
                rows={3}
                value={form.message}
                onChange={update('message')}
                className="field h-auto py-3"
                placeholder="Size, finish or quantity you have in mind"
              />
            </div>
            {error ? <p className="text-[13px] text-copper">{error}</p> : null}
            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <button type="submit" disabled={status === 'saving'} className="btn btn-primary flex-1">
                {status === 'saving' ? 'Sending…' : 'Send Request'}
              </button>
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline flex-1">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              ) : null}
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}