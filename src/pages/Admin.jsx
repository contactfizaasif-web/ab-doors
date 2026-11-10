import { useState } from 'react';
import { Lock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useCatalog } from '@/hooks/useCatalog';
import PageHeader from '@/components/site/PageHeader';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminCategories from '@/components/admin/AdminCategories';
import AdminPromotions from '@/components/admin/AdminPromotions';
import AdminRequests from '@/components/admin/AdminRequests';
import AdminInquiries from '@/components/admin/AdminInquiries';
import AdminSettings from '@/components/admin/AdminSettings';
import { cn } from '@/lib/utils';

const TABS = [
  { id: 'products', label: 'Doors' },
  { id: 'categories', label: 'Collections' },
  { id: 'promotions', label: 'Campaigns' },
  { id: 'requests', label: 'Custom requests' },
  { id: 'inquiries', label: 'Inquiries' },
  { id: 'settings', label: 'Store details' },
];

export default function Admin() {
  const { user, isAuthenticated, isLoadingAuth } = useAuth();
  const { data } = useCatalog();
  const [tab, setTab] = useState('products');

  if (isLoadingAuth) {
    return <div className="shell py-24 text-[13px] text-clay">Checking access…</div>;
  }

  if (!isAuthenticated) {
    return (
      <>
        <PageHeader title="Store management" description="This area is for Doorix staff only." crumbs={[{ label: 'Admin' }]} />
        <div className="shell py-16">
          <div className="mx-auto max-w-md rounded-[6px] border border-beige bg-white p-8 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-copper/30 text-copper">
              <Lock className="h-5 w-5" />
            </span>
            <h2 className="mt-5 font-heading text-[20px] font-semibold text-espresso">Sign in required</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-clay">
              Sign in with the Doorix admin account to manage doors, collections, campaigns and customer requests.
            </p>
            <button
              type="button"
              onClick={() => base44.auth.redirectToLogin('/admin')}
              className="btn btn-primary mt-6 w-full"
            >
              Sign in
            </button>
          </div>
        </div>
      </>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <>
        <PageHeader title="Store management" description="This area is for Doorix staff only." crumbs={[{ label: 'Admin' }]} />
        <div className="shell py-16">
          <div className="mx-auto max-w-md rounded-[6px] border border-beige bg-white p-8 text-center">
            <h2 className="font-heading text-[20px] font-semibold text-espresso">Admin access only</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-clay">
              Your account does not have permission to manage the store. Ask the Doorix owner to grant admin access.
            </p>
          </div>
        </div>
      </>
    );
  }

  const categories = data?.categories ?? [];
  const products = data?.products ?? [];

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Store management"
        description="Manage the door catalogue, collections, campaigns and the requests customers send you."
        crumbs={[{ label: 'Admin' }]}
      />

      <section className="shell py-10 lg:py-14">
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-beige pb-3">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                'shrink-0 rounded-[5px] px-4 py-2.5 text-[12px] font-medium transition-colors',
                tab === item.id ? 'bg-espresso text-ivory' : 'text-espresso/70 hover:bg-beige/50'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === 'products' ? <AdminProducts categories={categories} /> : null}
          {tab === 'categories' ? <AdminCategories categories={categories} /> : null}
          {tab === 'promotions' ? <AdminPromotions products={products} /> : null}
          {tab === 'requests' ? <AdminRequests /> : null}
          {tab === 'inquiries' ? <AdminInquiries /> : null}
          {tab === 'settings' ? <AdminSettings /> : null}
        </div>
      </section>
    </>
  );
}