import React from 'react';
import type { EducationEntry } from '@/lib/portfolio-data';
import { SectionShell } from './section-shell';

// Layout: two side-by-side blocks where the score is the focal figure.
export function EducationSection({ entries }: { entries: EducationEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <SectionShell id="education" title="Education">
      <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
        {entries.map((entry) => (
          <article key={entry.id} aria-labelledby={`edu-${entry.id}`}>
            <p className="font-mono text-xs text-ink-muted">
              {entry.start} – {entry.end}
            </p>
            <h3
              id={`edu-${entry.id}`}
              className="mt-1.5 font-display text-2xl font-medium leading-tight text-ink"
            >
              {entry.school}
            </h3>
            <p className="mt-0.5 text-sm text-ink-soft">{entry.program}</p>

            <p className="mt-5 flex items-baseline gap-2 border-t border-line pt-4">
              <span className="scroll-settle inline-block font-display text-5xl font-medium leading-none tracking-tight text-ink">
                {entry.score.value}
              </span>
              <span className="font-mono text-sm text-ink-muted">
                {entry.score.scale}
              </span>
              <span className="ml-auto text-xs text-ink-muted">
                {entry.score.label}
              </span>
            </p>

            {entry.notes.length > 0 && (
              <ul className="mt-3 space-y-1 text-sm text-ink-soft">
                {entry.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
