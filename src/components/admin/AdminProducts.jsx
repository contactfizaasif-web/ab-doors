import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import ProductForm from '@/components/admin/ProductForm';
import { priceLabel } from '@/lib/site';

export default function AdminProducts({ categories }) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => base44.entities.Product.list({ sort: 'sort_order', limit: 300 }),
  });
  const products = data?.items ?? [];

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    queryClient.invalidateQueries({ queryKey: ['catalog'] });
  };

  const save = async (values) => {
    setSaving(true);
    const { id, created_date, updated_date, created_by_id, ...payload } = values;
    try {
      if (editing?.id) await base44.entities.Product.update(editing.id, payload);
      else await base44.entities.Product.create(payload);
      setEditing(null);
      refresh();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (product) => {
    if (!window.confirm(`Delete ${product.name}? This cannot be undone.`)) return;
    await base44.entities.Product.delete(product.id);
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-[20px] font-semibold text-espresso">Doors</h2>
          <p className="mt-1 text-[13px] text-clay">{products.length} doors in the catalogue</p>
        </div>
        <button type="button" onClick={() => setEditing({})} className="btn btn-primary h-11 min-h-0 px-5 text-[11px]">
          <Plus className="h-4 w-4" /> Add door
        </button>
      </div>

      {isLoading ? (
        <p className="mt-8 text-[13px] text-clay">Loading doors…</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-[6px] border border-beige bg-white">
          <table className="w-full min-w-[760px] text-left text-[13px]">
            <thead className="border-b border-beige text-[10.5px] uppercase tracking-[0.14em] text-clay">
              <tr>
                <th className="px-4 py-3 font-medium">Door</th>
                <th className="px-4 py-3 font-medium">Collection</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Featured</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-beige/70">
              {products.map((product) => (
                <tr key={product.id} className="align-top">
                  <td className="px-4 py-3">
                    <p className="font-medium text-espresso">{product.name}</p>
                    <p className="mt-0.5 text-[11.5px] text-clay">{product.sku}</p>
                  </td>
                  <td className="px-4 py-3 text-clay">{categories.find((c) => c.slug === product.category_slug)?.name || product.category_slug}</td>
                  <td className="px-4 py-3 text-espresso">{priceLabel(product)}</td>
                  <td className="px-4 py-3 text-clay">{product.is_active === false ? 'Hidden' : product.availability}</td>
                  <td className="px-4 py-3 text-clay">{product.is_featured ? 'Yes' : '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => setEditing(product)} aria-label={`Edit ${product.name}`} className="text-clay hover:text-copper">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => remove(product)} aria-label={`Delete ${product.name}`} className="text-clay hover:text-copper">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-h-[88vh] max-w-3xl overflow-y-auto border-beige bg-ivory">
          <DialogTitle className="font-heading text-[20px] font-semibold text-espresso">
            {editing?.id ? 'Edit door' : 'Add a door'}
          </DialogTitle>
          {editing ? (
            <div className="mt-5">
              <ProductForm initial={editing} categories={categories} onSubmit={save} onCancel={() => setEditing(null)} saving={saving} />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}