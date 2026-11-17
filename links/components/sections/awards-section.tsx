import React from 'react';
import type { AwardEntry } from '@/lib/portfolio-data';
import { SectionShell } from './section-shell';

// Layout: dense logbook. Year in a fixed left column, printed once per year;
// entries for that year stack to its right.
export function AwardsSection({ awards }: { awards: AwardEntry[] }) {
  if (awards.length === 0) return null;

  const years: { year: string; items: AwardEntry[] }[] = [];
  for (const award of awards) {
    const last = years[years.length - 1];
    if (last && last.year === award.year) last.items.push(award);
    else years.push({ year: award.year, items: [award] });
  }

  return (
    <SectionShell
      id="awards"
      title="Awards & Recognition"
      meta={`${years[years.length - 1].year} – ${years[0].year}`}
    >
      <div className="rounded-xl border border-line bg-surface-raised">
        {years.map((group) => (
          <div
            key={group.year}
            className="grid grid-cols-[4rem_1fr] border-b border-dashed border-line last:border-b-0 sm:grid-cols-[6rem_1fr]"
          >
            <p className="border-r border-line px-3 py-3.5 font-mono text-sm text-accent sm:px-5">
              {group.year}
            </p>
            <ul className="divide-y divide-line">
              {group.items.map((award) => (
                <li
                  key={award.id}
                  className="flex flex-col gap-0.5 px-4 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-5"
                >
                  <span className="text-[15px] font-medium leading-snug text-ink">
                    {award.title}
                  </span>
                  <span className="shrink-0 text-xs text-ink-muted sm:max-w-[45%] sm:text-right">
                    {award.issuer}
                    {award.month && (
                      <span className="font-mono"> · {award.month}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
