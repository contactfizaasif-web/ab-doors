import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import ImageField from '@/components/admin/ImageField';

const EMPTY = {
  kind: 'deal_of_the_day',
  eyebrow: '',
  title: '',
  description: '',
  image_url: '',
  product_slug: '',
  original_price: '',
  offer_price: '',
  cta_label: 'View Deal',
  cta_link: '/shop',
  starts_at: '',
  ends_at: '',
  is_active: false,
};

export default function AdminPromotions({ products }) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const { data } = useQuery({
    queryKey: ['admin-promotions'],
    queryFn: () => base44.entities.Promotion.list({ sort: '-created_date', limit: 50 }),
  });
  const promotions = data?.items ?? [];

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
    queryClient.invalidateQueries({ queryKey: ['catalog'] });
  };

  const open = (promotion) => {
    setForm({ ...EMPTY, ...promotion });
    setEditing(promotion || {});
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { id, created_date, updated_date, created_by_id, ...rest } = form;
      const payload = {
        ...rest,
        original_price: form.original_price === '' ? null : Number(form.original_price),
        offer_price: form.offer_price === '' ? null : Number(form.offer_price),
      };
      if (editing?.id) await base44.entities.Promotion.update(editing.id, payload);
      else await base44.entities.Promotion.create(payload);
      setEditing(null);
      refresh();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (promotion) => {
    if (!window.confirm('Delete this campaign?')) return;
    await base44.entities.Promotion.delete(promotion.id);
    refresh();
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-[20px] font-semibold text-espresso">Deal &amp; festival campaigns</h2>
          <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-clay">
            Only genuine, active campaigns appear on the site. With no active deal, the homepage shows a featured door
            without a discount.
          </p>
        </div>
        <button type="button" onClick={() => open(null)} className="btn btn-primary h-11 min-h-0 shrink-0 px-5 text-[11px]">
          <Plus className="h-4 w-4" /> Add campaign
        </button>
      </div>

      {promotions.length === 0 ? (
        <p className="mt-6 rounded-[6px] border border-beige bg-white px-4 py-6 text-[13px] text-clay">
          No campaigns yet. The homepage currently shows a featured door instead of an offer.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-beige rounded-[6px] border border-beige bg-white">
          {promotions.map((promotion) => (
            <li key={promotion.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-espresso">{promotion.title}</p>
                <p className="mt-0.5 truncate text-[11.5px] text-clay">
                  {promotion.kind === 'festival' ? 'Festival banner' : 'Deal of the day'} ·{' '}
                  {promotion.is_active ? 'Active' : 'Inactive'}
                  {promotion.ends_at ? ` · ends ${promotion.ends_at}` : ''}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <button type="button" onClick={() => open(promotion)} aria-label="Edit campaign" className="text-clay hover:text-copper">
                  <Pencil className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => remove(promotion)} aria-label="Delete campaign" className="text-clay hover:text-copper">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={Boolean(editing)} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto border-beige bg-ivory">
          <DialogTitle className="font-heading text-[20px] font-semibold text-espresso">
            {editing?.id ? 'Edit campaign' : 'Add a campaign'}
          </DialogTitle>
          <form onSubmit={save} className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="pr-kind">Type</label>
                <select id="pr-kind" value={form.kind} onChange={(e) => setForm((f) => ({ ...f, kind: e.target.value }))} className="field">
                  <option value="deal_of_the_day">Deal of the day</option>
                  <option value="festival">Festival banner</option>
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="pr-eyebrow">Eyebrow</label>
                <input id="pr-eyebrow" value={form.eyebrow} onChange={(e) => setForm((f) => ({ ...f, eyebrow: e.target.value }))} className="field" placeholder="Eid offer" />
              </div>
            </div>
            <div>
              <label className="field-label" htmlFor="pr-title">Title *</label>
              <input id="pr-title" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="field" />
            </div>
            <div>
              <label className="field-label" htmlFor="pr-desc">Description</label>
              <textarea id="pr-desc" rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="field h-auto py-3" />
            </div>
            <ImageField label="Campaign image" value={form.image_url} onChange={(url) => setForm((f) => ({ ...f, image_url: url }))} />
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="field-label" htmlFor="pr-product">Featured door</label>
                <select id="pr-product" value={form.product_slug} onChange={(e) => setForm((f) => ({ ...f, product_slug: e.target.value }))} className="field">
                  <option value="">None</option>
                  {products.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="pr-orig">Original price</label>
                <input id="pr-orig" type="number" value={form.original_price} onChange={(e) => setForm((f) => ({ ...f, original_price: e.target.value }))} className="field" />
              </div>
              <div>
                <label className="field-label" htmlFor="pr-offer">Offer price</label>
                <input id="pr-offer" type="number" value={form.offer_price} onChange={(e) => setForm((f) => ({ ...f, offer_price: e.target.value }))} className="field" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="pr-start">Starts</label>
                <input id="pr-start" type="date" value={form.starts_at || ''} onChange={(e) => setForm((f) => ({ ...f, starts_at: e.target.value }))} className="field" />
              </div>
              <div>
                <label className="field-label" htmlFor="pr-end">Ends</label>
                <input id="pr-end" type="date" value={form.ends_at || ''} onChange={(e) => setForm((f) => ({ ...f, ends_at: e.target.value }))} className="field" />
              </div>
              <div>
                <label className="field-label" htmlFor="pr-cta">Button label</label>
                <input id="pr-cta" value={form.cta_label} onChange={(e) => setForm((f) => ({ ...f, cta_label: e.target.value }))} className="field" />
              </div>
              <div>
                <label className="field-label" htmlFor="pr-link">Button link</label>
                <input id="pr-link" value={form.cta_link} onChange={(e) => setForm((f) => ({ ...f, cta_link: e.target.value }))} className="field" placeholder="/shop" />
              </div>
            </div>
            <label className="flex items-center gap-2 text-[13px] text-espresso">
              <input type="checkbox" checked={Boolean(form.is_active)} onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))} className="h-4 w-4 accent-[#704438]" />
              Campaign is active
            </label>
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={saving} className="btn btn-primary h-11 min-h-0 px-6 text-[11px]">
                {saving ? 'Saving…' : 'Save campaign'}
              </button>
              <button type="button" onClick={() => setEditing(null)} className="btn btn-outline h-11 min-h-0 px-6 text-[11px]">Cancel</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}