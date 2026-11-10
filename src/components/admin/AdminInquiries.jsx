import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const STATUSES = ['new', 'answered', 'closed'];

export default function AdminInquiries() {
  const queryClient = useQueryClient();
  const [active, setActive] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-inquiries'],
    queryFn: () => base44.entities.Inquiry.list({ sort: '-created_date', limit: 100 }),
  });
  const inquiries = data?.items ?? [];

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });

  const setStatus = async (inquiry, status) => {
    await base44.entities.Inquiry.update(inquiry.id, { status });
    refresh();
  };

  const remove = async (inquiry) => {
    if (!window.confirm('Delete this inquiry?')) return;
    await base44.entities.Inquiry.delete(inquiry.id);
    refresh();
  };

  return (
    <div>
      <h2 className="font-heading text-[20px] font-semibold text-espresso">Customer inquiries</h2>
      <p className="mt-1 text-[13px] text-clay">Messages sent from the contact section and product quotation forms</p>

      {isLoading ? (
        <p className="mt-6 text-[13px] text-clay">Loading inquiries…</p>
      ) : inquiries.length === 0 ? (
        <p className="mt-6 rounded-[6px] border border-beige bg-white px-4 py-6 text-[13px] text-clay">
          No inquiries yet.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-beige rounded-[6px] border border-beige bg-white">
          {inquiries.map((inquiry) => (
            <li key={inquiry.id} className="flex flex-wrap items-center justify-between gap-4 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-espresso">
                  {inquiry.name} <span className="font-normal text-clay">· {inquiry.phone}</span>
                </p>
                <p className="mt-0.5 truncate text-[12px] text-clay">
                  {inquiry.inquiry_type}
                  {inquiry.product_name ? ` · ${inquiry.product_name}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={inquiry.status || 'new'}
                  onChange={(e) => setStatus(inquiry, e.target.value)}
                  aria-label="Inquiry status"
                  className="h-9 rounded-[4px] border border-beige bg-white px-2 text-[12px] capitalize text-espresso"
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button type="button" onClick={() => setActive(inquiry)} className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper">
                  View
                </button>
                <button type="button" onClick={() => remove(inquiry)} aria-label="Delete inquiry" className="text-clay hover:text-copper">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={Boolean(active)} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-lg border-beige bg-ivory">
          <DialogTitle className="font-heading text-[20px] font-semibold text-espresso">{active?.name}</DialogTitle>
          <DialogDescription className="mt-1 text-[12.5px] text-clay">
            {active?.phone}
            {active?.email ? ` · ${active.email}` : ''}
          </DialogDescription>
          {active ? (
            <div className="mt-5 space-y-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-clay">
                {active.inquiry_type}
                {active.product_sku ? ` · ${active.product_sku}` : ''}
              </p>
              <p className="rounded-[5px] border border-beige bg-white p-4 text-[13.5px] leading-relaxed text-espresso">
                {active.message}
              </p>
              <a href={`tel:${(active.phone || '').replace(/\s/g, '')}`} className="btn btn-outline h-11 min-h-0 px-6 text-[11px]">
                Call customer
              </a>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}