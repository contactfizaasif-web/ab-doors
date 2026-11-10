import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, MessageCircle, Ruler, ArrowRight } from 'lucide-react';
import { useCatalog } from '@/hooks/useCatalog';
import { submitCustomDoorRequest } from '@/lib/submit';
import { waLink } from '@/lib/site';
import PageHeader from '@/components/site/PageHeader';
import CustomDoorForm from '@/components/custom/CustomDoorForm';

const EMPTY = {
  customer_name: '',
  phone: '',
  whatsapp: '',
  email: '',
  city: '',
  door_category: '',
  width_in: '',
  height_in: '',
  thickness_in: '',
  material: '',
  finish: '',
  design_description: '',
  quantity: 1,
  budget: '',
  notes: '',
  needs_measuring_help: false,
};

export default function CustomDoor() {
  const { data } = useCatalog();
  const [form, setForm] = useState(EMPTY);
  const [reference, setReference] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const settings = data?.settings ?? {};
  const wa = waLink(settings.whatsapp, 'Assalam o Alaikum Doorix, I would like to discuss a custom door.');

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.customer_name.trim()) next.customer_name = 'Please share your name.';
    if (!form.phone.trim()) next.phone = 'A phone number helps us respond.';
    if (!form.city.trim()) next.city = 'Let us know the delivery location.';
    if (!form.width_in.trim()) next.width_in = 'Width is needed for a quotation.';
    if (!form.height_in.trim()) next.height_in = 'Height is needed for a quotation.';
    if (!form.design_description.trim()) next.design_description = 'Describe the door you need.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 220, behavior: 'smooth' });
      return;
    }
    setStatus('saving');
    try {
      await submitCustomDoorRequest({
        ...form,
        quantity: Number(form.quantity) || 1,
        reference_image_uri: reference?.uri || '',
      });
      setStatus('done');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Custom door order"
        title="Tell Us About Your Door"
        description="Share your design, dimensions, material and finish. We review every request and respond with a quotation — nothing is confirmed until you approve it."
        crumbs={[{ label: 'Custom Door' }]}
      />

      {status === 'done' ? (
        <section className="shell py-16 lg:py-24">
          <div className="mx-auto max-w-xl rounded-[6px] border border-beige bg-white p-8 sm:p-12">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-copper/30 text-copper">
              <Check className="h-5 w-5" />
            </span>
            <h2 className="mt-6 font-heading text-[26px] font-semibold text-espresso">Request submitted</h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-clay">
              Thank you — your custom door requirements have been sent to Doorix. Our team will review the details and
              contact you with a quotation. This is a request, not a confirmed order.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop" className="btn btn-primary flex-1">Browse Doors</Link>
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline flex-1">
                  <MessageCircle className="h-4 w-4" /> Discuss on WhatsApp
                </a>
              ) : null}
            </div>
          </div>
        </section>
      ) : (
        <section className="shell py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
            <form onSubmit={onSubmit} noValidate>
              <CustomDoorForm
                form={form}
                update={update}
                categories={data?.categories ?? []}
                reference={reference}
                setReference={setReference}
                errors={errors}
              />

              {status === 'error' ? (
                <p className="mt-6 rounded-[5px] border border-copper/30 bg-white px-4 py-3 text-[13px] text-copper">
                  We could not submit your request just now. Please try again, or message us on WhatsApp.
                </p>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" disabled={status === 'saving'} className="btn btn-primary px-8">
                  {status === 'saving' ? 'Submitting…' : 'Request Quotation'}
                </button>
                {wa ? (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline px-6">
                    <MessageCircle className="h-4 w-4" /> WhatsApp Instead
                  </a>
                ) : null}
              </div>
            </form>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[6px] border border-beige bg-white p-6">
                <p className="eyebrow">Your request</p>
                <h2 className="mt-3 font-heading text-[19px] font-semibold text-espresso">
                  {form.customer_name || 'Your details'}
                </h2>
                <dl className="mt-5 space-y-3 text-[13px]">
                  {[
                    ['City', form.city],
                    ['Category', form.door_category],
                    ['Size', form.width_in && form.height_in ? `${form.width_in}" W × ${form.height_in}" H` : ''],
                    ['Material', form.material],
                    ['Finish', form.finish],
                    ['Quantity', form.quantity],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-start justify-between gap-4 border-b border-beige/70 pb-2.5 last:border-0">
                      <dt className="text-[11px] uppercase tracking-[0.14em] text-clay">{label}</dt>
                      <dd className="text-right text-espresso">{value || '—'}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-5 rounded-[6px] border border-beige bg-ivory p-6">
                <p className="flex items-center gap-2 font-heading text-[14px] font-semibold text-espresso">
                  <Ruler className="h-4 w-4 text-copper" /> Measuring guidance
                </p>
                <ul className="mt-3 space-y-2 text-[12.5px] leading-relaxed text-clay">
                  <li>Measure the clear opening width between the frame, at the top, middle and bottom.</li>
                  <li>Measure the height from the finished floor to the top of the opening.</li>
                  <li>Note the wall thickness at the hinge side for the frame.</li>
                  <li>Not sure? Tick the measuring help box and our team will guide you.</li>
                </ul>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-copper">
                  Ask a question <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </aside>
          </div>
        </section>
      )}
    </>
  );
}