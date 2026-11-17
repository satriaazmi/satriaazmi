import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { ExperienceEntry } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';
import { SectionShell } from './section-shell';

// Layout: vertical timeline. The left rule is an orbit track; each role is a
// body on it. A filled marker means the role is ongoing, hollow means ended.
export function ExperienceSection({ entries }: { entries: ExperienceEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <SectionShell id="experience" title="Experience" motif="Mission Log">
      <ol className="relative">
        {entries.map((entry, index) => (
          <li
            key={entry.id}
            className="grid grid-cols-1 gap-x-8 sm:grid-cols-[9.5rem_1fr]"
          >
            <p className="pb-1 font-mono text-xs leading-6 text-ink-muted sm:pb-0 sm:pt-0.5 sm:text-right">
              <time>{entry.start}</time> – <time>{entry.end}</time>
            </p>

            <div
              className={cn(
                'relative border-l border-line-strong pl-6',
                index === entries.length - 1 ? 'pb-1' : 'pb-9'
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'absolute -left-[6px] top-[7px] h-[11px] w-[11px] rounded-full border-2 border-accent',
                  entry.current ? 'bg-accent' : 'bg-canvas'
                )}
              />
              <h3 className="text-base font-semibold leading-snug text-ink sm:text-lg">
                {entry.role}
                {entry.current && (
                  <span className="ml-2 align-middle font-mono text-[11px] font-normal text-accent">
                    current
                  </span>
                )}
              </h3>
              <p className="mt-0.5 text-sm text-ink-soft">{entry.org}</p>
              <div className="mt-2.5 max-w-[65ch] space-y-1.5 text-sm leading-relaxed text-ink-soft">
                {entry.summary.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              {entry.links && entry.links.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-x-5">
                  {entry.links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-accent underline decoration-line-strong underline-offset-4 hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {link.label}
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
