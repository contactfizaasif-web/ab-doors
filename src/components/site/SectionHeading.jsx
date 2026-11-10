import { cn } from '@/lib/utils';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className = '',
  action = null,
}) {
  const light = tone === 'light';
  return (
    <div
      className={cn(
        'flex flex-col gap-5 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
        {eyebrow ? (
          <p className={cn('eyebrow mb-4', light && 'text-bronze', align === 'center' && 'text-center')}>
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            'text-[28px] font-semibold leading-[1.12] sm:text-[34px] lg:text-[42px]',
            light ? 'text-ivory' : 'text-espresso'
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className={cn('mt-4 text-[15px] leading-relaxed', light ? 'text-ivory/70' : 'text-clay')}>{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}