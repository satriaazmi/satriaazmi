import React from 'react';
import type { OrgGroup } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';
import { SectionShell } from './section-shell';

// Layout: one block per organization, roles nested inside as a stepped
// ladder. The latest (most senior) role sits on top; each earlier role steps
// one level in, so the climb inside each organization reads at a glance.
const STEP_INDENT = ['sm:ml-0', 'sm:ml-6', 'sm:ml-12', 'sm:ml-[4.5rem]'];

export function OrganizationsSection({ groups }: { groups: OrgGroup[] }) {
  const visible = groups.filter((g) => g.roles.length > 0);
  if (visible.length === 0) return null;

  return (
    <SectionShell id="organizations" title="Organizations" motif="Crew Ranks">
      <div className="space-y-5">
        {visible.map((group) => (
          <article
            key={group.id}
            aria-labelledby={`org-${group.id}`}
            className="grid grid-cols-1 gap-6 rounded-2xl border border-line bg-surface-raised p-5 sm:p-7 md:grid-cols-[13rem_1fr] md:gap-10"
          >
            <header>
              <h3
                id={`org-${group.id}`}
                className="font-display text-xl font-medium leading-tight text-ink sm:text-2xl"
              >
                {group.name}
              </h3>
              <p className="mt-2 font-mono text-xs text-ink-muted">{group.span}</p>
              <p className="font-mono text-xs text-ink-muted">{group.place}</p>
            </header>

            <ol className="space-y-5">
              {group.roles.map((role, index) => (
                <li
                  key={role.title}
                  className={cn(
                    'relative',
                    STEP_INDENT[Math.min(index, STEP_INDENT.length - 1)],
                    index > 0 &&
                      'sm:before:absolute sm:before:-left-4 sm:before:-top-3 sm:before:h-6 sm:before:w-3 sm:before:rounded-bl-md sm:before:border-b sm:before:border-l sm:before:border-line-strong sm:before:content-[""]'
                  )}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <h4 className="text-[15px] font-semibold leading-snug text-ink">
                      {role.title}
                    </h4>
                    <p className="font-mono text-xs text-ink-muted">
                      {role.start} – {role.end}
                    </p>
                  </div>
                  <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-ink-soft">
                    {role.summary}
                  </p>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
