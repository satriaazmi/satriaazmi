'use client';

import React, { useState } from 'react';
import {
  Check,
  Code2,
  Copy,
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
import {
  OWNER_PROFILE,
  PROFILE_ORBITS,
  PROJECT_ORBITS,
} from '@/lib/solar-data';
import { cn } from '@/lib/utils';

const PROFILE_ICON: Record<string, React.ReactNode> = {
  github: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.98 10.98 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  ),
  linkedin: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
    </svg>
  ),
  email: <Mail className="h-4 w-4" aria-hidden="true" />,
};

export function SolarLinksPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const isDark = theme === 'dark';

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(OWNER_PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      window.location.href = `mailto:${OWNER_PROFILE.email}`;
    }
  };

  return (
    <div
      className={cn(
        'relative min-h-screen w-full overflow-x-clip transition-colors duration-300',
        isDark ? 'text-slate-100' : 'text-slate-900'
      )}
    >
      {/* Interactive Constellation Kinetic Space Mesh Background */}
      <div className="fixed inset-0 z-0">
        <ConstellationGrid theme={theme} showOverlay={false} />
      </div>

      {/* Foreground Solar System & Liquid Glass Content */}
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
              'inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-xs font-medium backdrop-blur-md transition-colors',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400',
              isDark
                ? 'border-white/15 bg-slate-950/60 text-slate-100 hover:bg-white/10'
                : 'border-slate-900/15 bg-white/80 text-slate-900 hover:bg-white'
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

        {/* Hero Section: Symmetrical Solar Orrery + Liquid Glass Identity Panel */}
        <section
          aria-labelledby="profile-heading"
          className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[360px_1fr] lg:gap-6"
        >
          {/* Left: Interactive Solar System Orrery */}
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

          {/* Right: Identity Panel matched symmetrically to Hero height */}
          <LiquidGlassPanel
            theme={theme}
            className="h-full"
            contentClassName="flex flex-col justify-center p-6 sm:p-8"
          >
            <p
              className={cn(
                'font-mono text-[11px] uppercase tracking-[0.2em]',
                isDark ? 'text-sky-300' : 'text-sky-700'
              )}
            >
              Central Star · Portfolio Index
            </p>

            <h1
              id="profile-heading"
              className="mt-2.5 text-2xl font-bold tracking-tight sm:text-3xl lg:text-[2.25rem] lg:leading-tight"
            >
              {OWNER_PROFILE.name}
            </h1>

            <p
              className={cn(
                'mt-3 text-sm leading-relaxed sm:text-base',
                isDark ? 'text-slate-200' : 'text-slate-700'
              )}
            >
              {OWNER_PROFILE.focus}
            </p>

            <div
              className={cn(
                'mt-6 flex flex-col gap-2.5 border-t pt-5 text-xs sm:text-sm',
                isDark
                  ? 'border-white/10 text-slate-300'
                  : 'border-slate-900/10 text-slate-700'
              )}
            >
              <span className="inline-flex items-center gap-2.5">
                <GraduationCap
                  className={cn(
                    'h-4 w-4 shrink-0',
                    isDark ? 'text-amber-300' : 'text-amber-600'
                  )}
                  aria-hidden="true"
                />
                <span>
                  {OWNER_PROFILE.role} ({OWNER_PROFILE.gpa})
                </span>
              </span>
              <span className="inline-flex items-center gap-2.5">
                <MapPin
                  className={cn(
                    'h-4 w-4 shrink-0',
                    isDark ? 'text-sky-300' : 'text-sky-700'
                  )}
                  aria-hidden="true"
                />
                <span>{OWNER_PROFILE.location}</span>
              </span>
            </div>
          </LiquidGlassPanel>
        </section>

        {/* Inner Orbit Profiles: Full-width symmetrical 3-column row */}
        <section aria-labelledby="profiles-heading" className="mt-8">
          <div className="mb-3 flex items-center justify-between px-1">
            <h2
              id="profiles-heading"
              className={cn(
                'font-mono text-xs uppercase tracking-[0.18em]',
                isDark ? 'text-slate-300' : 'text-slate-700'
              )}
            >
              Inner Orbit · Profiles
            </h2>
            <span
              className={cn(
                'font-mono text-[11px]',
                isDark ? 'text-slate-400' : 'text-slate-600'
              )}
            >
              3 Satellites
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {PROFILE_ORBITS.map((profile) => {
              const isHighlighted = activeId === profile.id;
              const isEmail = profile.id === 'email';

              return (
                <LiquidGlassPanel
                  key={profile.id}
                  theme={theme}
                  highlighted={isHighlighted}
                  accentColor={profile.accentHex}
                  className="hover:-translate-y-0.5"
                >
                  <div className="flex h-full items-stretch">
                    <a
                      href={profile.url}
                      target={profile.external ? '_blank' : undefined}
                      rel={profile.external ? 'noopener noreferrer' : undefined}
                      onMouseEnter={() => setActiveId(profile.id)}
                      onMouseLeave={() => setActiveId(null)}
                      onFocus={() => setActiveId(profile.id)}
                      onBlur={() => setActiveId(null)}
                      className={cn(
                        'flex min-h-[64px] flex-1 items-center gap-3.5 px-4 py-3.5 text-left',
                        'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sky-400'
                      )}
                    >
                      <span
                        aria-hidden="true"
                        style={{ background: profile.sphereGradient }}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-950 shadow-sm"
                      >
                        {PROFILE_ICON[profile.id]}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5 text-sm font-semibold">
                          <span>{profile.title}</span>
                          <span
                            className={cn(
                              'font-mono text-[10px] font-normal',
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            )}
                          >
                            {profile.planetName}
                          </span>
                        </span>
                        <span
                          className={cn(
                            'block truncate font-mono text-xs',
                            isDark ? 'text-slate-300' : 'text-slate-700'
                          )}
                        >
                          {profile.handle}
                        </span>
                      </span>
                    </a>

                    {isEmail && (
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        aria-label="Copy email address"
                        title={copiedEmail ? 'Email copied' : 'Copy email'}
                        className={cn(
                          'flex min-h-[44px] min-w-[44px] items-center justify-center border-l px-3 transition-colors',
                          'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sky-400',
                          isDark
                            ? 'border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                            : 'border-slate-900/10 text-slate-700 hover:bg-slate-900/5 hover:text-slate-950'
                        )}
                      >
                        {copiedEmail ? (
                          <Check
                            className="h-4 w-4 text-emerald-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <Copy className="h-4 w-4" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </div>
                </LiquidGlassPanel>
              );
            })}
          </div>
        </section>

        {/* Outer Planetary Missions: Project Dashboards */}
        <section aria-labelledby="missions-heading" className="mt-8 sm:mt-10">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 px-1">
            <div>
              <h2
                id="missions-heading"
                className="text-lg font-semibold tracking-tight sm:text-xl"
              >
                Planetary Missions · Project Dashboards
              </h2>
              <p
                className={cn(
                  'mt-0.5 text-xs sm:text-sm',
                  isDark ? 'text-slate-300' : 'text-slate-700'
                )}
              >
                Interactive statistical modeling, optimization, and spatial analytics dashboards.
              </p>
            </div>
            <span
              className={cn(
                'font-mono text-xs uppercase tracking-wider',
                isDark ? 'text-slate-400' : 'text-slate-600'
              )}
            >
              4 Active Orbits
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {PROJECT_ORBITS.map((project) => {
              const isHighlighted = activeId === project.id;

              return (
                <LiquidGlassPanel
                  key={project.id}
                  id={`mission-${project.id}`}
                  theme={theme}
                  highlighted={isHighlighted}
                  accentColor={project.accentHex}
                  onMouseEnter={() => setActiveId(project.id)}
                  onMouseLeave={() => setActiveId(null)}
                  className="h-full hover:-translate-y-0.5"
                  contentClassName="flex flex-col justify-between p-5 sm:p-6"
                >
                  <div>
                    {/* Planet Identity & Orbit Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Shaded Planetary Sphere */}
                        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
                          {project.hasRing && (
                            <span
                              aria-hidden="true"
                              style={{
                                borderColor: isDark
                                  ? 'rgba(254, 240, 138, 0.72)'
                                  : 'rgba(161, 98, 7, 0.72)',
                              }}
                              className="pointer-events-none absolute h-3.5 w-11 rounded-full border-[1.5px] -rotate-12"
                            />
                          )}
                          <span
                            aria-hidden="true"
                            style={{
                              background: project.sphereGradient,
                              boxShadow: `0 0 12px ${project.glowColor}`,
                            }}
                            className="h-6 w-6 rounded-full"
                          />
                        </div>

                        <div>
                          <div
                            className={cn(
                              'font-mono text-[11px] uppercase tracking-wider',
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            )}
                          >
                            {project.orbitCode} · {project.planetName}
                          </div>
                          <h3 className="text-base font-semibold leading-snug sm:text-lg">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p
                      className={cn(
                        'mt-1 text-xs font-medium sm:text-sm',
                        isDark ? 'text-sky-300' : 'text-sky-700'
                      )}
                    >
                      {project.subtitle}
                    </p>

                    <p
                      className={cn(
                        'mt-2.5 text-sm leading-relaxed',
                        isDark ? 'text-slate-200' : 'text-slate-700'
                      )}
                    >
                      {project.description}
                    </p>

                    {/* Technical Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={cn(
                              'rounded-md border px-2 py-0.5 font-mono text-[11px]',
                              isDark
                                ? 'border-white/12 bg-white/[0.04] text-slate-300'
                                : 'border-slate-900/12 bg-slate-900/[0.04] text-slate-700'
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Links (min 44px tap targets) */}
                  <div
                    className={cn(
                      'mt-5 flex flex-wrap items-center gap-2.5 border-t pt-4',
                      isDark ? 'border-white/10' : 'border-slate-900/10'
                    )}
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onFocus={() => setActiveId(project.id)}
                      onBlur={() => setActiveId(null)}
                      className={cn(
                        'inline-flex min-h-[44px] items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-colors sm:text-sm',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400',
                        isDark
                          ? 'border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-950'
                          : 'border-slate-900/20 bg-slate-900 text-white hover:bg-slate-800'
                      )}
                    >
                      <span>Open Dashboard</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors sm:text-sm',
                          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400',
                          isDark
                            ? 'border-white/15 bg-white/[0.04] text-slate-200 hover:bg-white/[0.12]'
                            : 'border-slate-900/15 bg-white/60 text-slate-800 hover:bg-white'
                        )}
                      >
                        <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>GitHub Repo</span>
                      </a>
                    )}

                    {project.repoNote && (
                      <span
                        className={cn(
                          'inline-flex min-h-[36px] items-center gap-1.5 px-1 font-mono text-[11px]',
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        )}
                      >
                        <Lock className="h-3 w-3 shrink-0" aria-hidden="true" />
                        <span>{project.repoNote}</span>
                      </span>
                    )}
                  </div>
                </LiquidGlassPanel>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer
          className={cn(
            'mt-10 flex flex-col items-center justify-between gap-2 border-t pt-6 text-center font-mono text-xs sm:flex-row sm:text-left',
            isDark
              ? 'border-white/10 text-slate-400'
              : 'border-slate-900/10 text-slate-600'
          )}
        >
          <span>Satria Musthofa &apos;Azmi · Diponegoro University</span>
          <a
            href={`mailto:${OWNER_PROFILE.email}`}
            className={cn(
              'underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400',
              isDark ? 'text-slate-200' : 'text-slate-800'
            )}
          >
            {OWNER_PROFILE.email}
          </a>
        </footer>
      </main>
    </div>
  );
}
