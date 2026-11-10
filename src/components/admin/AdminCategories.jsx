import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import ImageField from '@/components/admin/ImageField';
import { slugify } from '@/lib/site';

const EMPTY = { name: '', slug: '', description: '', image_url: '', sort_order: 0, is_active: true };

export default function AdminCategories({ categories }) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const open = (category) => {
    setForm({ ...EMPTY, ...category });
    setEditing(category || {});
  };

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['catalog'] });
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { id, created_date, updated_date, created_by_id, ...rest } = form;
      const payload = {
        ...rest,
        slug: form.slug.trim() || slugify(form.name),
        sort_order: Number(form.sort_order) || 0,
      };
      if (editing?.id) await base44.entities.Category.update(editing.id, payload);
      else await base44.entities.Category.create(payload);
      setEditing(null);
      refresh();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (category) => {
    if (!window.confirm(`Remove the ${category.name} collection?`)) return;
    await base44.entities.Category.delete(category.id);
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-[20px] font-semibold text-espresso">Collections</h2>
          <p className="mt-1 text-[13px] text-clay">Categories shown in navigation and on the categories page</p>
        </div>
        <button type="button" onClick={() => open(null)} className="btn btn-primary h-11 min-h-0 px-5 text-[11px]">
          <Plus className="h-4 w-4" /> Add collection
        </button>
      </div>

      <ul className="mt-6 divide-y divide-beige rounded-[6px] border border-beige bg-white">
        {categories.map((category) => (
          <li key={category.id} className="flex items-center justify-between gap-4 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate font-medium text-espresso">{category.name}</p>
              <p className="mt-0.5 truncate text-[11.5px] text-clay">/{category.slug} · order {category.sort_order ?? 0}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <button type="button" onClick={() => open(category)} aria-label={`Edit ${category.name}`} className="text-clay hover:text-copper">
                <Pencil className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => remove(category)} aria-label={`Delete ${category.name}`} className="text-clay hover:text-copper">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={Boolean(editing)} onOpenChange={(open_) => !open_ && setEditing(null)}>
        <DialogContent className="max-h-[88vh] max-w-xl overflow-y-auto border-beige bg-ivory">
          <DialogTitle className="font-heading text-[20px] font-semibold text-espresso">
            {editing?.id ? 'Edit collection' : 'Add a collection'}
          </DialogTitle>
          <form onSubmit={save} className="mt-5 space-y-4">
            <div>
              <label className="field-label" htmlFor="c-name">Name *</label>
              <input id="c-name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="field" />
            </div>
            <div>
              <label className="field-label" htmlFor="c-slug">URL slug</label>
              <input id="c-slug" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="field" />
            </div>
            <div>
              <label className="field-label" htmlFor="c-desc">Description</label>
              <textarea id="c-desc" rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="field h-auto py-3" />
            </div>
            <ImageField label="Collection image" value={form.image_url} onChange={(url) => setForm((f) => ({ ...f, image_url: url }))} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="c-sort">Sort order</label>
                <input id="c-sort" type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))} className="field" />
              </div>
              <label className="mt-6 flex items-center gap-2 text-[13px] text-espresso">
                <input type="checkbox" checked={form.is_active !== false} onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))} className="h-4 w-4 accent-[#704438]" />
                Visible on site
              </label>
            </div>
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={saving} className="btn btn-primary h-11 min-h-0 px-6 text-[11px]">
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button type="button" onClick={() => setEditing(null)} className="btn btn-outline h-11 min-h-0 px-6 text-[11px]">Cancel</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}