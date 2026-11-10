import { useState } from 'react';
import { uploadPublicFile } from '@/lib/upload';

export default function ImageField({ label = 'Image', value, onChange }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const url = await uploadPublicFile(file);
      onChange(url);
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <span className="field-label">{label}</span>
      <div className="flex items-center gap-4">
        {value ? (
          <img src={value} alt="" className="h-20 w-16 rounded-[3px] border border-beige object-cover" />
        ) : (
          <div className="flex h-20 w-16 items-center justify-center rounded-[3px] border border-dashed border-beige text-[10px] text-clay">
            No image
          </div>
        )}
        <div className="flex flex-col items-start gap-2">
          <label className="cursor-pointer text-[11px] font-semibold uppercase tracking-[0.14em] text-copper">
            {busy ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
            <input type="file" accept="image/*" onChange={onFile} className="sr-only" />
          </label>
          {value ? (
            <button type="button" onClick={() => onChange('')} className="text-[11px] text-clay hover:text-copper">
              Remove
            </button>
          ) : null}
          {error ? <span className="text-[11px] text-copper">{error}</span> : null}
        </div>
      </div>
      <p className="mt-2 text-[11px] text-clay">Uploaded images are stored publicly — anyone with the link can open them.</p>
    </div>
  );
}