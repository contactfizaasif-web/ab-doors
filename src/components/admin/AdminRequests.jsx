import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const STATUSES = ['new', 'reviewing', 'quoted', 'closed'];

export default function AdminRequests() {
  const queryClient = useQueryClient();
  const [active, setActive] = useState(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-requests'],
    queryFn: () => base44.entities.CustomDoorRequest.list({ sort: '-created_date', limit: 100 }),
  });
  const requests = data?.items ?? [];

  const setStatus = async (request, status) => {
    await base44.entities.CustomDoorRequest.update(request.id, { status });
    queryClient.invalidateQueries({ queryKey: ['admin-requests'] });
  };

  const openDetail = (request) => {
    setActive(request);
    setNotes(request.admin_notes || '');
  };

  const saveNotes = async () => {
    setSaving(true);
    try {
      await base44.entities.CustomDoorRequest.update(active.id, { admin_notes: notes });
      setActive(null);
      queryClient.invalidateQueries({ queryKey: ['admin-requests'] });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="font-heading text-[20px] font-semibold text-espresso">Custom door requests</h2>
      <p className="mt-1 text-[13px] text-clay">Every request submitted through the custom door form</p>

      {isLoading ? (
        <p className="mt-6 text-[13px] text-clay">Loading requests…</p>
      ) : requests.length === 0 ? (
        <p className="mt-6 rounded-[6px] border border-beige bg-white px-4 py-6 text-[13px] text-clay">
          No custom door requests yet.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-[6px] border border-beige bg-white">
          <table className="w-full min-w-[860px] text-left text-[13px]">
            <thead className="border-b border-beige text-[10.5px] uppercase tracking-[0.14em] text-clay">
              <tr>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Door</th>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium">City</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-beige/70">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-espresso">{request.customer_name}</p>
                    <p className="mt-0.5 text-[11.5px] text-clay">{request.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-clay">{request.door_category || '—'}</td>
                  <td className="px-4 py-3 text-clay">
                    {request.width_in || '—'} × {request.height_in || '—'} in
                  </td>
                  <td className="px-4 py-3 text-clay">{request.city || '—'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={request.status || 'new'}
                      onChange={(e) => setStatus(request, e.target.value)}
                      aria-label="Request status"
                      className="h-9 rounded-[4px] border border-beige bg-white px-2 text-[12px] capitalize text-espresso"
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" onClick={() => openDetail(request)} className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={Boolean(active)} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[88vh] max-w-xl overflow-y-auto border-beige bg-ivory">
          <DialogTitle className="font-heading text-[20px] font-semibold text-espresso">
            {active?.customer_name}
          </DialogTitle>
          <DialogDescription className="mt-1 text-[12.5px] text-clay">
            Submitted {active?.created_date ? new Date(active.created_date).toLocaleDateString('en-GB') : ''}
          </DialogDescription>

          {active ? (
            <div className="mt-5 space-y-4">
              <dl className="divide-y divide-beige text-[13px]">
                {[
                  ['Phone', active.phone],
                  ['WhatsApp', active.whatsapp],
                  ['Email', active.email],
                  ['City', active.city],
                  ['Category', active.door_category],
                  ['Size', `${active.width_in || '—'} W × ${active.height_in || '—'} H${active.thickness_in ? ` × ${active.thickness_in} thick` : ''} (inches)`],
                  ['Material', active.material],
                  ['Finish', active.finish],
                  ['Quantity', active.quantity],
                  ['Budget', active.budget],
                  ['Measuring help', active.needs_measuring_help ? 'Requested' : 'Not requested'],
                ]
                  .filter(([, v]) => v)
                  .map(([label, value]) => (
                    <div key={label} className="flex items-start justify-between gap-5 py-2">
                      <dt className="text-[11px] uppercase tracking-[0.14em] text-clay">{label}</dt>
                      <dd className="text-right text-espresso">{value}</dd>
                    </div>
                  ))}
              </dl>

              <div>
                <p className="field-label">Design description</p>
                <p className="rounded-[5px] border border-beige bg-white p-3 text-[13px] leading-relaxed text-espresso">
                  {active.design_description || '—'}
                </p>
              </div>

              {active.notes ? (
                <div>
                  <p className="field-label">Additional instructions</p>
                  <p className="rounded-[5px] border border-beige bg-white p-3 text-[13px] leading-relaxed text-espresso">{active.notes}</p>
                </div>
              ) : null}

              {active.reference_image_uri ? (
                <p className="text-[12px] text-clay">A reference image was uploaded for this request.</p>
              ) : null}

              <div>
                <label className="field-label" htmlFor="req-notes">Internal notes</label>
                <textarea id="req-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className="field h-auto py-3" />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={saveNotes} disabled={saving} className="btn btn-primary h-11 min-h-0 px-6 text-[11px]">
                  {saving ? 'Saving…' : 'Save notes'}
                </button>
                <a href={`tel:${(active.phone || '').replace(/\s/g, '')}`} className="btn btn-outline h-11 min-h-0 px-6 text-[11px]">Call customer</a>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}