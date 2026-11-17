import React from 'react';
import { cn } from '@/lib/utils';

interface SectionShellProps {
  id: string;
  /** Plain label a visitor scans for, e.g. "Experience". */
  title: string;
  /** Solar-system sub-label shown second, e.g. "Mission Log". */
  motif: string;
  /** Optional metadata on the right, e.g. a date span. */
  meta?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionShell({
  id,
  title,
  motif,
  meta,
  className,
  children,
}: SectionShellProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('scroll-mt-8 pt-14 sm:pt-20', className)}
    >
      <header className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line pb-3 sm:mb-8">
        <h2
          id={headingId}
          className="font-display text-[1.75rem] font-medium leading-none tracking-tight text-ink sm:text-[2.125rem]"
        >
          {title}
        </h2>
        <span className="font-mono text-xs text-accent">/ {motif}</span>
        {meta && (
          <span className="ml-auto font-mono text-xs text-ink-muted">{meta}</span>
        )}
      </header>
      {children}
    </section>
  );
}
