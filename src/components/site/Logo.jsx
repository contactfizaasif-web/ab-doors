import { cn } from '@/lib/utils';

export default function Logo({ variant = 'dark', className = '', compact = false }) {
  const tone = variant === 'light' ? 'text-ivory' : 'text-espresso';

  return (
    <span className={cn('inline-flex items-center', tone, className)}>
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className={cn('shrink-0', compact ? 'h-7 w-7' : 'h-[34px] w-[34px]')}
        fill="none"
      >
        <path
          d="M13 8h8.5a16 16 0 0 1 0 32H13z"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <circle cx="31.4" cy="24" r="1.9" fill="currentColor" />
      </svg>
      <span
        className={cn(
          'font-heading font-semibold uppercase leading-none',
          compact ? 'ml-2 text-[17px] tracking-[0.16em]' : 'ml-2.5 text-[20px] tracking-[0.18em]'
        )}
      >
        Doorix
      </span>
    </span>
  );
}