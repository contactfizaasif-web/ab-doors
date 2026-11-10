import { useState } from 'react';
import { uploadPrivateFile } from '@/lib/upload';
import { Upload, X } from 'lucide-react';

const MATERIALS = ['Solid sheesham', 'Teak', 'Walnut', 'Oak veneer', 'Engineered core', 'Not sure yet'];
const FINISHES = ['Natural polish', 'Matte', 'Gloss', 'Painted', 'Veneer', 'Not sure yet'];

export default function CustomDoorForm({ form, update, categories, reference, setReference, errors }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    try {
      const uri = await uploadPrivateFile(file);
      setReference({ uri, name: file.name });
    } catch (err) {
      setUploadError('The image could not be uploaded. You can continue without it and share the image on WhatsApp.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-9">
      <fieldset>
        <legend className="mb-5 font-heading text-[17px] font-semibold text-espresso">Your details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="d-name" className="field-label">Full name *</label>
            <input id="d-name" value={form.customer_name} onChange={update('customer_name')} className="field" placeholder="Your full name" />
            {errors.customer_name ? <p className="mt-1.5 text-[12px] text-copper">{errors.customer_name}</p> : null}
          </div>
          <div>
            <label htmlFor="d-phone" className="field-label">Phone number *</label>
            <input id="d-phone" value={form.phone} onChange={update('phone')} className="field" placeholder="03xx xxxxxxx" inputMode="tel" />
            {errors.phone ? <p className="mt-1.5 text-[12px] text-copper">{errors.phone}</p> : null}
          </div>
          <div>
            <label htmlFor="d-whatsapp" className="field-label">WhatsApp number</label>
            <input id="d-whatsapp" value={form.whatsapp} onChange={update('whatsapp')} className="field" placeholder="If different from phone" inputMode="tel" />
          </div>
          <div>
            <label htmlFor="d-email" className="field-label">Email (optional)</label>
            <input id="d-email" type="email" value={form.email} onChange={update('email')} className="field" placeholder="you@example.com" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="d-city" className="field-label">City or delivery location *</label>
            <input id="d-city" value={form.city} onChange={update('city')} className="field" placeholder="e.g. DHA, Lahore" />
            {errors.city ? <p className="mt-1.5 text-[12px] text-copper">{errors.city}</p> : null}
          </div>
        </div>
      </fieldset>

      <fieldset className="border-t border-beige pt-8">
        <legend className="mb-5 font-heading text-[17px] font-semibold text-espresso">Door requirements</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="d-category" className="field-label">Door category</label>
            <select id="d-category" value={form.door_category} onChange={update('door_category')} className="field">
              <option value="">Select a category</option>
              {categories.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="d-width" className="field-label">Width (inches) *</label>
            <input id="d-width" value={form.width_in} onChange={update('width_in')} className="field" placeholder="e.g. 36" inputMode="decimal" />
            {errors.width_in ? <p className="mt-1.5 text-[12px] text-copper">{errors.width_in}</p> : null}
          </div>
          <div>
            <label htmlFor="d-height" className="field-label">Height (inches) *</label>
            <input id="d-height" value={form.height_in} onChange={update('height_in')} className="field" placeholder="e.g. 84" inputMode="decimal" />
            {errors.height_in ? <p className="mt-1.5 text-[12px] text-copper">{errors.height_in}</p> : null}
          </div>
          <div>
            <label htmlFor="d-thickness" className="field-label">Thickness (inches, optional)</label>
            <input id="d-thickness" value={form.thickness_in} onChange={update('thickness_in')} className="field" placeholder="e.g. 1.75" inputMode="decimal" />
          </div>
          <div>
            <label htmlFor="d-quantity" className="field-label">Quantity</label>
            <input id="d-quantity" type="number" min="1" value={form.quantity} onChange={update('quantity')} className="field" />
          </div>
          <div>
            <label htmlFor="d-material" className="field-label">Preferred material</label>
            <select id="d-material" value={form.material} onChange={update('material')} className="field">
              <option value="">Select a material</option>
              {MATERIALS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="d-finish" className="field-label">Preferred finish or colour</label>
            <select id="d-finish" value={form.finish} onChange={update('finish')} className="field">
              <option value="">Select a finish</option>
              {FINISHES.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="d-design" className="field-label">Design description *</label>
            <textarea
              id="d-design"
              rows={4}
              value={form.design_description}
              onChange={update('design_description')}
              className="field h-auto py-3"
              placeholder="Describe the panelling, style or detailing you have in mind."
            />
            {errors.design_description ? <p className="mt-1.5 text-[12px] text-copper">{errors.design_description}</p> : null}
          </div>
          <div>
            <label htmlFor="d-budget" className="field-label">Budget range (optional)</label>
            <input id="d-budget" value={form.budget} onChange={update('budget')} className="field" placeholder="e.g. PKR 60,000 – 90,000" />
          </div>
          <div>
            <label htmlFor="d-notes" className="field-label">Additional instructions</label>
            <input id="d-notes" value={form.notes} onChange={update('notes')} className="field" placeholder="Anything else we should know" />
          </div>
        </div>

        <label className="mt-5 flex items-start gap-3 text-[13.5px] text-espresso/80">
          <input
            type="checkbox"
            checked={form.needs_measuring_help}
            onChange={update('needs_measuring_help')}
            className="mt-0.5 h-4 w-4 accent-[#704438]"
          />
          I would like help with measuring the opening before ordering.
        </label>
      </fieldset>

      <fieldset className="border-t border-beige pt-8">
        <legend className="mb-4 font-heading text-[17px] font-semibold text-espresso">Reference design image (optional)</legend>
        {reference ? (
          <div className="flex items-center justify-between gap-4 rounded-[5px] border border-beige bg-white px-4 py-3">
            <span className="truncate text-[13px] text-espresso">{reference.name}</span>
            <button type="button" onClick={() => setReference(null)} aria-label="Remove reference image" className="text-clay hover:text-copper">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer items-center gap-3 rounded-[5px] border border-dashed border-copper/40 bg-white px-4 py-4 text-[13.5px] text-copper">
            <Upload className="h-4 w-4" />
            {uploading ? 'Uploading…' : 'Upload an image of a door you like'}
            <input type="file" accept="image/*" onChange={onFile} className="sr-only" />
          </label>
        )}
        <p className="mt-2 text-[12px] text-clay">
          Reference images are stored privately — only the Doorix team can open them.
        </p>
        {uploadError ? <p className="mt-2 text-[12px] text-copper">{uploadError}</p> : null}
      </fieldset>
    </div>
  );
}