const BASE = 'https://media.base44.com/images/public/6ae3370e9c3a73509457b8e6';

export const HERO_IMAGES = [
  `${BASE}/1d772cab4_generated_0cf7091a.png`,
  `${BASE}/7aa29b742_generated_55f72ffe.png`,
  `${BASE}/91a1e0d6a_generated_ac2ff094.png`,
];

export const CATEGORY_IMAGES = {
  'main-entrance-doors': `${BASE}/1e0f043e5_generated_dcb5319d.png`,
  'interior-doors': `${BASE}/a6e5868ca_generated_f80e3fa6.png`,
  'wooden-doors': `${BASE}/0c9348e67_generated_5150b1fd.png`,
  'flush-doors': `${BASE}/1135679a8_generated_c0014a37.png`,
  'designer-doors': `${BASE}/7cf5e3de3_generated_6268c45d.png`,
  'double-doors': `${BASE}/7b7683892_generated_4546ec5c.png`,
  'bedroom-doors': `${BASE}/22d789546_generated_4c048142.png`,
  'bathroom-doors': `${BASE}/9c00ba771_generated_cd365665.png`,
};

export const PRODUCT_IMAGES = {
  'modern-walnut-entrance-door': `${BASE}/8cd266c57_generated_83b2cdbb.png`,
  'classic-wooden-panel-door': `${BASE}/b4be81260_generated_6147d208.png`,
  'minimalist-interior-door': `${BASE}/f73fdcc50_generated_578f6f99.png`,
  'contemporary-double-door': `${BASE}/9055ebdd2_generated_9c9aeadf.png`,
  'natural-oak-finish-door': `${BASE}/4a98d34ec_generated_fc6502d5.png`,
  'modern-flush-door': `${BASE}/f4bfcc1ce_generated_13df3465.png`,
  'bronze-inlay-designer-door': `${BASE}/dc167776f_generated_image.png`,
  'teak-double-entrance-doors': `${BASE}/f7343f456_generated_image.png`,
  'frosted-glass-bathroom-door': `${BASE}/d96f836ee_generated_image.png`,
  'walnut-bedroom-door': `${BASE}/c2276a4a2_generated_image.png`,
};

export const SECTION_IMAGES = {
  custom: `${BASE}/779c71228_generated_18ad43ec.png`,
  festival: `${BASE}/71ebdfe9b_generated_9ae433b2.png`,
  workshop: `${BASE}/0f7e170e7_generated_9eeb3471.png`,
};

export function imageFor(record) {
  if (!record) return null;
  return (
    record.image_url ||
    (Array.isArray(record.images) ? record.images.filter(Boolean)[0] : null) ||
    PRODUCT_IMAGES[record.slug] ||
    CATEGORY_IMAGES[record.slug] ||
    null
  );
}