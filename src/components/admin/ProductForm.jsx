import { useState } from 'react';
import { slugify } from '@/lib/site';
import ImageField from '@/components/admin/ImageField';

const EMPTY = {
  name: '',
  slug: '',
  sku: '',
  category_slug: '',
  material: '',
  finish: '',
  availability: 'Made to Order',
  price: '',
  price_on_request: true,
  image_url: '',
  gallery: '',
  short_description: '',
  description: '',
  width_mm: '',
  height_mm: '',
  thickness_mm: '',
  is_featured: false,
  is_active: true,
  sort_order: 0,
};

export default function ProductForm({ initial, categories, onSubmit, onCancel, saving }) {
  const [form, setForm] = useState(() => ({
    ...EMPTY,
    ...initial,
    gallery: Array.isArray(initial?.gallery) ? initial.gallery.join(', ') : initial?.gallery || '',
    price: initial?.price ?? '',
    width_mm: initial?.width_mm ?? '',
    height_mm: initial?.height_mm ?? '',
    thickness_mm: initial?.thickness_mm ?? '',
  }));

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSubmit({
      ...form,
      slug: form.slug.trim() || slugify(form.name),
      price: form.price === '' ? null : Number(form.price),
      width_mm: form.width_mm === '' ? null : Number(form.width_mm),
      height_mm: form.height_mm === '' ? null : Number(form.height_mm),
      thickness_mm: form.thickness_mm === '' ? null : Number(form.thickness_mm),
      sort_order: Number(form.sort_order) || 0,
      gallery: form.gallery
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    });
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="p-name">Door name *</label>
          <input id="p-name" required value={form.name} onChange={set('name')} className="field" placeholder="Modern Walnut Entrance Door" />
        </div>
        <div>
          <label className="field-label" htmlFor="p-sku">Product code</label>
          <input id="p-sku" value={form.sku} onChange={set('sku')} className="field" placeholder="DRX-EN-101" />
        </div>
        <div>
          <label className="field-label" htmlFor="p-slug">URL slug</label>
          <input id="p-slug" value={form.slug} onChange={set('slug')} className="field" placeholder="modern-walnut-entrance-door" />
        </div>
        <div>
          <label className="field-label" htmlFor="p-cat">Collection</label>
          <select id="p-cat" value={form.category_slug} onChange={set('category_slug')} className="field">
            <option value="">Select a collection</option>
            {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="p-material">Material</label>
          <input id="p-material" value={form.material} onChange={set('material')} className="field" placeholder="Solid walnut" />
        </div>
        <div>
          <label className="field-label" htmlFor="p-finish">Finish</label>
          <input id="p-finish" value={form.finish} onChange={set('finish')} className="field" placeholder="Matte walnut" />
        </div>
        <div>
          <label className="field-label" htmlFor="p-avail">Availability</label>
          <select id="p-avail" value={form.availability} onChange={set('availability')} className="field">
            <option value="In Stock">In Stock</option>
            <option value="Made to Order">Made to Order</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="p-price">Price (PKR)</label>
          <input id="p-price" type="number" value={form.price} onChange={set('price')} className="field" placeholder="Leave empty if quoted on request" />
        </div>
      </div>

      <ImageField label="Main door image" value={form.image_url} onChange={(url) => setForm((f) => ({ ...f, image_url: url }))} />

      <div>
        <label className="field-label" htmlFor="p-gallery">Additional image URLs (comma separated)</label>
        <input id="p-gallery" value={form.gallery} onChange={set('gallery')} className="field" placeholder="https://…, https://…" />
      </div>

      <div>
        <label className="field-label" htmlFor="p-short">Short description</label>
        <input id="p-short" value={form.short_description} onChange={set('short_description')} className="field" placeholder="One line shown on product cards" />
      </div>
      <div>
        <label className="field-label" htmlFor="p-desc">Full description</label>
        <textarea id="p-desc" rows={4} value={form.description} onChange={set('description')} className="field h-auto py-3" />
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <label className="field-label" htmlFor="p-w">Width (mm)</label>
          <input id="p-w" type="number" value={form.width_mm} onChange={set('width_mm')} className="field" />
        </div>
        <div>
          <label className="field-label" htmlFor="p-h">Height (mm)</label>
          <input id="p-h" type="number" value={form.height_mm} onChange={set('height_mm')} className="field" />
        </div>
        <div>
          <label className="field-label" htmlFor="p-t">Thickness (mm)</label>
          <input id="p-t" type="number" value={form.thickness_mm} onChange={set('thickness_mm')} className="field" />
        </div>
        <div>
          <label className="field-label" htmlFor="p-sort">Sort order</label>
          <input id="p-sort" type="number" value={form.sort_order} onChange={set('sort_order')} className="field" />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 border-t border-beige pt-4 text-[13px] text-espresso">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.price_on_request} onChange={set('price_on_request')} className="h-4 w-4 accent-[#704438]" />
          Show “Request Pricing”
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.is_featured} onChange={set('is_featured')} className="h-4 w-4 accent-[#704438]" />
          Featured on homepage
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.is_active} onChange={set('is_active')} className="h-4 w-4 accent-[#704438]" />
          Visible in shop
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="btn btn-primary h-11 min-h-0 px-6 text-[11px]">
          {saving ? 'Saving…' : 'Save Door'}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-outline h-11 min-h-0 px-6 text-[11px]">Cancel</button>
      </div>
    </form>
  );
}