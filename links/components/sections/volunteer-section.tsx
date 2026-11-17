import React from 'react';
import type { VolunteerEntry } from '@/lib/portfolio-data';
import { SectionShell } from './section-shell';

// Layout: the one entry with the most substance gets a full-width lead;
// the rest sit in a two-column ruled list, no cards.
export function VolunteerSection({ entries }: { entries: VolunteerEntry[] }) {
  if (entries.length === 0) return null;

  const lead = entries.find((e) => e.featured);
  const rest = entries.filter((e) => e !== lead);

  return (
    <SectionShell
      id="volunteer"
      title="Volunteer & Community"
      motif="Ground Missions"
    >
      {lead && (
        <article className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-line pb-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="font-mono text-xs text-ink-muted">
              {lead.start} – {lead.end}
              {lead.cause && <> · {lead.cause}</>}
            </p>
            <h3 className="mt-2 font-display text-2xl font-medium leading-tight text-ink sm:text-[1.75rem]">
              {lead.event}
            </h3>
            <p className="mt-1 text-sm font-semibold text-ink-soft">
              {lead.role}
              {lead.org && <span className="font-normal"> · {lead.org}</span>}
            </p>
          </div>
          <ul className="max-w-[65ch] space-y-2 text-sm leading-relaxed text-ink-soft">
            {lead.summary.map((line) => (
              <li key={line} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-ink-muted"
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </article>
      )}

      {rest.length > 0 && (
        <ul className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
          {rest.map((entry) => (
            <li key={entry.id} className="border-b border-line py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-[15px] font-semibold leading-snug text-ink">
                  {entry.event}
                </h3>
                <p className="font-mono text-xs text-ink-muted">
                  {entry.start} – {entry.end}
                </p>
              </div>
              <p className="mt-0.5 text-sm text-ink-soft">
                {entry.role}
                {entry.org && <> · {entry.org}</>}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {entry.summary.join(' ')}
              </p>
              {entry.cause && (
                <p className="mt-1.5 font-mono text-[11px] text-ink-muted">
                  {entry.cause}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </SectionShell>
  );
}
