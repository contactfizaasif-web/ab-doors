import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const FIELDS = [
  ['tagline', 'Top bar message', 'Premium Door Designs for Your Space'],
  ['phone', 'Phone number', '042 xxx xxxx'],
  ['whatsapp', 'WhatsApp number', '923xxxxxxxxx'],
  ['email', 'Email address', 'sales@example.com'],
  ['hours', 'Business hours', 'Mon – Sat, 10am – 8pm'],
  ['address', 'Address in Lahore', 'Area, Lahore'],
];

export default function AdminSettings() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => base44.entities.StoreSettings.list({ limit: 1 }),
  });
  const record = data?.items?.[0] ?? null;
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const values = form ?? record ?? {};

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const payload = {
        tagline: values.tagline || '',
        phone: values.phone || '',
        whatsapp: values.whatsapp || '',
        email: values.email || '',
        hours: values.hours || '',
        address: values.address || '',
      };
      if (record?.id) await base44.entities.StoreSettings.update(record.id, payload);
      else await base44.entities.StoreSettings.create(payload);
      setSaved(true);
      setForm(null);
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      queryClient.invalidateQueries({ queryKey: ['catalog'] });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-heading text-[20px] font-semibold text-espresso">Store details</h2>
      <p className="mt-1 text-[13px] leading-relaxed text-clay">
        These details appear in the top bar, footer and contact sections. WhatsApp buttons only appear once a WhatsApp
        number is set.
      </p>

      <form onSubmit={save} className="mt-6 space-y-4 rounded-[6px] border border-beige bg-white p-5">
        {FIELDS.map(([key, label, placeholder]) => (
          <div key={key}>
            <label className="field-label" htmlFor={`s-${key}`}>{label}</label>
            <input
              id={`s-${key}`}
              value={values[key] || ''}
              onChange={(e) => setForm({ ...values, [key]: e.target.value })}
              className="field"
              placeholder={placeholder}
            />
          </div>
        ))}
        <div className="flex items-center gap-4 pt-1">
          <button type="submit" disabled={saving} className="btn btn-primary h-11 min-h-0 px-6 text-[11px]">
            {saving ? 'Saving…' : 'Save details'}
          </button>
          {saved ? (
            <span className="flex items-center gap-1.5 text-[12px] text-copper">
              <Check className="h-3.5 w-3.5" /> Saved
            </span>
          ) : null}
        </div>
      </form>
    </div>
  );
}