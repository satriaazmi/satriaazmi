import React from 'react';
import Image from 'next/image';
import { Code2, ExternalLink, Lock } from 'lucide-react';
import type { SolarBody } from '@/lib/solar-data';
import { cn } from '@/lib/utils';

const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

interface ProjectCardProps {
  project: SolarBody;
  theme: 'dark' | 'light';
  highlighted: boolean;
  /** Puts the screenshot on the left at lg so consecutive cards alternate. */
  mirrored: boolean;
  onActivate: (id: string | null) => void;
}

// Layout: large two-column card, text beside a home-screen capture of the live
// dashboard. Consecutive cards mirror each other so the list does not read as
// a stack of identical tiles. The small sphere ties the card to its planet in
// the orrery, which highlights on hover.
export function ProjectCard({
  project,
  theme,
  highlighted,
  mirrored,
  onActivate,
}: ProjectCardProps) {
  const isDark = theme === 'dark';
  const meta = [project.year, project.context].filter(Boolean).join(' · ');

  return (
    <article
      id={`mission-${project.id}`}
      aria-labelledby={`mission-${project.id}-title`}
      onMouseEnter={() => onActivate(project.id)}
      onMouseLeave={() => onActivate(null)}
      style={highlighted ? { borderColor: project.accentHex } : undefined}
      className="group grid grid-cols-1 gap-5 rounded-2xl border border-line bg-surface-raised p-4 transition-colors duration-200 sm:p-6 lg:grid-cols-[1fr_1.08fr] lg:items-center lg:gap-8"
    >
      {project.screenshot && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          className={cn(
            'scroll-shot block overflow-hidden rounded-xl border border-line',
            mirrored ? 'lg:order-first' : 'lg:order-last'
          )}
        >
          <Image
            src={project.screenshot}
            alt=""
            width={1200}
            height={750}
            sizes="(min-width: 1024px) 520px, 100vw"
            className="block h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
          />
        </a>
      )}

      <div className="min-w-0 px-1 sm:px-0">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
            {project.hasRing && (
              <span
                aria-hidden="true"
                style={{
                  borderColor: isDark ? 'rgba(254, 240, 138, 0.72)' : 'rgba(161, 98, 7, 0.72)',
                }}
                className="pointer-events-none absolute h-2.5 w-7 -rotate-12 rounded-full border"
              />
            )}
            <span
              aria-hidden="true"
              style={{ background: project.sphereGradient }}
              className="h-3.5 w-3.5 rounded-full"
            />
          </span>
          {meta && <p className="font-mono text-xs text-ink-muted">{meta}</p>}
        </div>

        <h3
          id={`mission-${project.id}-title`}
          className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight text-ink sm:text-[1.875rem]"
        >
          {project.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-ink-soft">{project.subtitle}</p>

        <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-ink-soft">
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Methods">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-ink-soft"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onFocus={() => onActivate(project.id)}
            onBlur={() => onActivate(null)}
            className={cn(
              'inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-line-strong bg-ink px-4 text-sm font-semibold text-canvas transition-opacity hover:opacity-90',
              FOCUS_RING
            )}
          >
            <span>Open Dashboard</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-line-strong px-3.5 text-sm font-medium text-ink transition-colors hover:border-accent',
                FOCUS_RING
              )}
            >
              <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>GitHub Repo</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}

          {project.repoNote && (
            <span className="inline-flex min-h-[36px] items-center gap-1.5 px-1 font-mono text-[11px] text-ink-muted">
              <Lock className="h-3 w-3 shrink-0" aria-hidden="true" />
              <span>{project.repoNote}</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
