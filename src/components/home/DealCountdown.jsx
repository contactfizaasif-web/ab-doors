import { useEffect, useState } from 'react';

function remaining(target) {
  const diff = new Date(target).getTime() - Date.now();
  if (!Number.isFinite(diff) || diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
  };
}

export default function DealCountdown({ endsAt }) {
  const [left, setLeft] = useState(() => remaining(endsAt));

  useEffect(() => {
    setLeft(remaining(endsAt));
    const timer = setInterval(() => setLeft(remaining(endsAt)), 60000);
    return () => clearInterval(timer);
  }, [endsAt]);

  if (!left) return null;

  const parts = [
    { label: 'Days', value: left.days },
    { label: 'Hours', value: left.hours },
    { label: 'Minutes', value: left.minutes },
  ];

  return (
    <div className="flex items-center gap-3" aria-label="Offer ends">
      {parts.map((p) => (
        <div key={p.label} className="min-w-[62px] border border-bronze/40 px-3 py-2 text-center">
          <p className="font-heading text-[20px] font-semibold leading-none text-espresso">
            {String(p.value).padStart(2, '0')}
          </p>
          <p className="mt-1 text-[9.5px] uppercase tracking-[0.16em] text-clay">{p.label}</p>
        </div>
      ))}
    </div>
  );
}