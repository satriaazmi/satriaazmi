'use client';

import React, { useState } from 'react';
import {
  Code2,
  ExternalLink,
  GraduationCap,
  Lock,
  Mail,
  MapPin,
  Moon,
  Sun,
} from 'lucide-react';
import ConstellationGrid from '@/components/ui/constellation-grid';
import { LiquidGlassPanel } from '@/components/ui/liquid-glass-panel';
import { SolarOrrery } from '@/components/solar-orrery';
import { CopyEmailButton } from '@/components/copy-email-button';
import { SectionShell } from '@/components/sections/section-shell';
import { ExperienceSection } from '@/components/sections/experience-section';
import { OrganizationsSection } from '@/components/sections/organizations-section';
import { VolunteerSection } from '@/components/sections/volunteer-section';
import { AwardsSection } from '@/components/sections/awards-section';
import { EducationSection } from '@/components/sections/education-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ContactFooter } from '@/components/sections/contact-footer';
import {
  OWNER_PROFILE,
  PROFILE_ORBITS,
  PROJECT_ORBITS,
} from '@/lib/solar-data';
import {
  AWARDS,
  EDUCATION,
  EXPERIENCE,
  ORGANIZATIONS,
  SKILL_GROUPS,
  VOLUNTEER,
} from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

const PROFILE_ICON: Record<string, React.ReactNode> = {
  github: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.98 10.98 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  ),
  linkedin: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
    </svg>
  ),
  email: <Mail className="h-3.5 w-3.5" aria-hidden="true" />,
};

const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

export function SolarLinksPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeId, setActiveId] = useState<string | null>(null);

  const isDark = theme === 'dark';

  return (
    <div
      id="top"
      data-theme={theme}
      className="relative min-h-screen w-full overflow-x-clip text-ink transition-colors duration-300"
    >
      {/* Interactive Constellation Kinetic Space Mesh Background */}
      <div className="fixed inset-0 z-0">
        <ConstellationGrid theme={theme} showOverlay={false} />
      </div>

      {/* Foreground Solar System & Content */}
      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:py-12">
        {/* Top Observatory Bar */}
        <header className="mb-4 flex items-center justify-end sm:mb-6">
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={
              isDark ? 'Switch to light observatory theme' : 'Switch to dark cosmic theme'
            }
            className={cn(
              'inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line-strong bg-surface-raised px-4 text-xs font-medium text-ink transition-colors hover:border-accent',
              FOCUS_RING
            )}
          >
            {isDark ? (
              <>
                <Sun className="h-4 w-4 text-amber-300" aria-hidden="true" />
                <span>Daylight Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-sky-700" aria-hidden="true" />
                <span>Cosmic Dark</span>
              </>
            )}
          </button>
        </header>

        {/* Hero: Solar Orrery + Identity Panel (the only glass surfaces on the page) */}
        <section
          aria-labelledby="profile-heading"
          className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[360px_1fr] lg:gap-6"
        >
          <LiquidGlassPanel
            theme={theme}
            className="h-full"
            contentClassName="flex items-center justify-center p-5 sm:p-6"
          >
            <SolarOrrery
              theme={theme}
              activeId={activeId}
              onHoverBody={setActiveId}
            />
          </LiquidGlassPanel>

          <LiquidGlassPanel
            theme={theme}
            className="h-full"
            contentClassName="flex flex-col justify-center p-6 sm:p-8"
          >
            <p className="font-mono text-xs text-accent">
              Central Star · Portfolio Index
            </p>

            <h1
              id="profile-heading"
              className="mt-3 font-display text-[2.25rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl"
            >
              {OWNER_PROFILE.name}
            </h1>

            <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-soft sm:text-lg">
              {OWNER_PROFILE.position}
            </p>
            <p className="mt-2 font-mono text-xs leading-relaxed text-ink-muted">
              {OWNER_PROFILE.focus}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#projects"
                className={cn(
                  'inline-flex min-h-[44px] items-center rounded-xl bg-accent px-5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90',
                  FOCUS_RING
                )}
              >
                View projects
              </a>
              <a
                href="#contact"
                className={cn(
                  'inline-flex min-h-[44px] items-center rounded-xl border border-line-strong px-5 text-sm font-semibold text-ink transition-colors hover:border-accent',
                  FOCUS_RING
                )}
              >
                Contact
              </a>
            </div>

            <div className="mt-6 flex flex-col gap-2 border-t border-line pt-5 text-sm text-ink-soft">
              <span className="inline-flex items-center gap-2.5">
                <GraduationCap
                  className="h-4 w-4 shrink-0 text-ink-muted"
                  aria-hidden="true"
                />
                <span>
                  {OWNER_PROFILE.role} ({OWNER_PROFILE.gpa})
                </span>
              </span>
              <span className="inline-flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
                <span>{OWNER_PROFILE.location}</span>
              </span>
            </div>
          </LiquidGlassPanel>
        </section>

        {/* Profiles: one row of icon + text links, synced with the inner orbit */}
        <section id="profiles" aria-labelledby="profiles-heading" className="mt-5">
          <h2
            id="profiles-heading"
            className="mb-2 px-1 font-mono text-xs text-ink-muted"
          >
            Profiles <span className="text-accent">/ Inner Orbit</span>
          </h2>
          <ul className="flex flex-col rounded-2xl border border-line bg-surface-raised px-4 py-1.5 sm:px-5 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-6">
            {PROFILE_ORBITS.map((profile) => (
              <li key={profile.id} className="flex items-center">
                <a
                  href={profile.url}
                  target={profile.external ? '_blank' : undefined}
                  rel={profile.external ? 'noopener noreferrer' : undefined}
                  title={`${profile.planetName} · ${profile.subtitle}`}
                  onMouseEnter={() => setActiveId(profile.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(profile.id)}
                  onBlur={() => setActiveId(null)}
                  className={cn(
                    'inline-flex min-h-[44px] items-center gap-2.5 rounded-lg pr-1 text-sm',
                    FOCUS_RING
                  )}
                >
                  <span
                    aria-hidden="true"
                    style={{ background: profile.sphereGradient }}
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-950 transition-transform',
                      activeId === profile.id && 'scale-110'
                    )}
                  >
                    {PROFILE_ICON[profile.id]}
                  </span>
                  <span className="font-semibold text-ink">{profile.title}</span>
                  <span className="truncate font-mono text-xs text-ink-soft">
                    {profile.handle}
                  </span>
                </a>
                {profile.id === 'email' && (
                  <CopyEmailButton email={OWNER_PROFILE.email} className="ml-1" />
                )}
              </li>
            ))}
          </ul>
        </section>

        <div className="relative">
          {/* Translucent reading band: keeps text legible, lets the mesh show through */}
          <div
            aria-hidden="true"
            className="reading-scrim pointer-events-none absolute inset-y-0 -inset-x-4 -z-10 sm:-inset-x-10"
          />

          {/* Projects: large cards, one per orbit */}
          <SectionShell
            id="projects"
            title="Projects"
            motif="Planetary Missions"
            meta="Live dashboards"
          >
            <div className="space-y-5">
              {PROJECT_ORBITS.map((project) => {
                const isHighlighted = activeId === project.id;

                return (
                  <article
                    key={project.id}
                    id={`mission-${project.id}`}
                    aria-labelledby={`mission-${project.id}-title`}
                    onMouseEnter={() => setActiveId(project.id)}
                    onMouseLeave={() => setActiveId(null)}
                    style={isHighlighted ? { borderColor: project.accentHex } : undefined}
                    className="grid grid-cols-1 gap-5 rounded-2xl border border-line bg-surface-raised p-5 transition-colors duration-200 sm:p-7 md:grid-cols-[11rem_1fr] md:gap-8"
                  >
                    {/* Orbit metadata column */}
                    <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3">
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                        {project.hasRing && (
                          <span
                            aria-hidden="true"
                            style={{
                              borderColor: isDark
                                ? 'rgba(254, 240, 138, 0.72)'
                                : 'rgba(161, 98, 7, 0.72)',
                            }}
                            className="pointer-events-none absolute h-4 w-12 -rotate-12 rounded-full border-[1.5px]"
                          />
                        )}
                        <span
                          aria-hidden="true"
                          style={{ background: project.sphereGradient }}
                          className="h-7 w-7 rounded-full"
                        />
                      </div>
                      <dl className="font-mono text-xs leading-relaxed text-ink-muted">
                        <div>
                          <dt className="sr-only">Orbit</dt>
                          <dd>
                            {project.orbitCode} · {project.planetName}
                          </dd>
                        </div>
                        {(project.year || project.context) && (
                          <div>
                            <dt className="sr-only">Context</dt>
                            <dd>
                              {[project.year, project.context].filter(Boolean).join(' · ')}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    {/* Mission body */}
                    <div className="min-w-0">
                      <h3
                        id={`mission-${project.id}-title`}
                        className="font-display text-2xl font-medium leading-tight tracking-tight text-ink sm:text-[1.875rem]"
                      >
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-ink-soft">
                        {project.subtitle}
                      </p>

                      <p className="mt-3 max-w-[65ch] text-[15px] leading-relaxed text-ink-soft">
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
                          onFocus={() => setActiveId(project.id)}
                          onBlur={() => setActiveId(null)}
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
              })}
            </div>
          </SectionShell>

          <ExperienceSection entries={EXPERIENCE} />
          <OrganizationsSection groups={ORGANIZATIONS} />
          <VolunteerSection entries={VOLUNTEER} />
          <AwardsSection awards={AWARDS} />
          <EducationSection entries={EDUCATION} />
          <SkillsSection groups={SKILL_GROUPS} />

          <ContactFooter
            name={OWNER_PROFILE.name}
            affiliation="Universitas Diponegoro"
            location={OWNER_PROFILE.location}
            email={OWNER_PROFILE.email}
            profiles={PROFILE_ORBITS}
          />
        </div>
      </main>
    </div>
  );
}
