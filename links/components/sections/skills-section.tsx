import React from 'react';
import type { SkillGroup } from '@/lib/portfolio-data';
import { SectionShell } from './section-shell';

// Layout: grouped text columns. Each skill carries the project or role that
// proves it, cited in mono the way a paper cites a source.
export function SkillsSection({ groups }: { groups: SkillGroup[] }) {
  const visible = groups.filter((g) => g.items.length > 0);
  if (visible.length === 0) return null;

  return (
    <SectionShell id="skills" title="Skills" motif="Instruments">
      <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((group) => (
          <div key={group.id}>
            <h3 className="text-sm font-semibold text-ink">{group.title}</h3>
            <dl className="mt-3 space-y-2.5">
              {group.items.map((item) => (
                <div key={item.name}>
                  <dt className="text-sm leading-snug text-ink-soft">{item.name}</dt>
                  <dd className="font-mono text-[11px] text-ink-muted">
                    <span className="sr-only">Used in: </span>
                    {item.evidence}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
