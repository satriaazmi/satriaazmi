'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ConstellationGrid from '@/components/ui/constellation-grid';
import { CopyEmailButton } from '@/components/copy-email-button';
import { ProfileIcon } from '@/components/profile-icon';
import { ProjectCard } from '@/components/project-card';
import { TypedText } from '@/components/typed-text';
import { SectionNav, type NavItem } from '@/components/section-nav';
import { SectionShell } from '@/components/sections/section-shell';
import { ExperienceSection } from '@/components/sections/experience-section';
import { OrganizationsSection } from '@/components/sections/organizations-section';
import { VolunteerSection } from '@/components/sections/volunteer-section';
import { AwardsSection } from '@/components/sections/awards-section';
import { EducationSection } from '@/components/sections/education-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ContactFooter } from '@/components/sections/contact-footer';
import { OWNER_PROFILE, PROFILE_LINKS, PROJECTS } from '@/lib/site-data';
import {
  AWARDS,
  EDUCATION,
  EXPERIENCE,
  ORGANIZATIONS,
  SKILL_GROUPS,
  VOLUNTEER,
} from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

// Only sections that actually render get an entry in the floating index.
const NAV_ITEMS: NavItem[] = [
  { id: 'projects', label: 'Projects', show: PROJECTS.length > 0 },
  { id: 'experience', label: 'Experience', show: EXPERIENCE.length > 0 },
  { id: 'organizations', label: 'Organizations', show: ORGANIZATIONS.some((g) => g.roles.length > 0) },
  { id: 'volunteer', label: 'Volunteer', show: VOLUNTEER.length > 0 },
  { id: 'awards', label: 'Awards', show: AWARDS.length > 0 },
  { id: 'education', label: 'Education', show: EDUCATION.length > 0 },
  { id: 'skills', label: 'Skills', show: SKILL_GROUPS.some((g) => g.items.length > 0) },
  { id: 'contact', label: 'Contact', show: true },
]
  .filter((item) => item.show)
  .map(({ id, label }) => ({ id, label }));

export function PortfolioPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isDark = theme === 'dark';

  return (
    <div
      id="top"
      data-theme={theme}
      className="relative min-h-screen w-full overflow-x-clip text-ink transition-colors duration-300"
    >
      {/* Interactive constellation mesh, fixed behind every section */}
      <div className="fixed inset-0 z-0">
        <ConstellationGrid theme={theme} showOverlay={false} />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:py-12">
        <SectionNav
          items={NAV_ITEMS}
          theme={theme}
          onToggleTheme={() => setTheme(isDark ? 'light' : 'dark')}
        />

        {/* Hero: identity on the left, portrait on the right */}
        <section aria-labelledby="profile-heading">
          <div className="hero-in grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-surface-raised md:grid-cols-[1fr_auto]">
            <div className="min-w-0 self-center p-6 sm:p-8 md:py-12 md:pl-10 md:pr-4 lg:pl-12">
              <h1
                id="profile-heading"
                className="font-display text-[2.25rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]"
              >
                {OWNER_PROFILE.name}
              </h1>

              <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-ink-soft sm:text-lg">
                <TypedText text={OWNER_PROFILE.position} />
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

              <p className="mt-6 text-sm leading-relaxed text-ink-soft">
                {OWNER_PROFILE.role} ({OWNER_PROFILE.gpa}) · {OWNER_PROFILE.locationShort}
              </p>
            </div>

            {/* Portrait: background-free cutout standing on the panel's bottom edge, nearly full height */}
            <div className="relative order-first h-72 border-b border-line sm:h-80 md:order-last md:h-auto md:w-[17rem] md:self-stretch md:border-b-0 lg:w-[19rem]">
              <Image
                src={OWNER_PROFILE.photoSrc}
                alt={OWNER_PROFILE.name}
                width={274}
                height={377}
                priority
                className="absolute bottom-0 left-1/2 h-[calc(100%-1rem)] w-auto max-w-none -translate-x-1/2 md:h-[calc(100%-1.25rem)]"
              />
            </div>
          </div>
        </section>

        {/* Profiles: one row of icon + text links */}
        <section id="profiles" aria-labelledby="profiles-heading" className="mt-5">
          <h2 id="profiles-heading" className="mb-2 px-1 font-mono text-xs text-ink-muted">
            Profiles
          </h2>
          <ul className="flex flex-col rounded-2xl border border-line bg-surface-raised px-4 py-1.5 sm:px-5 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-6">
            {PROFILE_LINKS.map((profile) => (
              <li key={profile.id} className="flex items-center">
                <a
                  href={profile.url}
                  target={profile.external ? '_blank' : undefined}
                  rel={profile.external ? 'noopener noreferrer' : undefined}
                  title={profile.subtitle}
                  className={cn(
                    'group inline-flex min-h-[44px] items-center gap-2.5 rounded-lg pr-1 text-sm',
                    FOCUS_RING
                  )}
                >
                  <ProfileIcon
                    id={profile.id}
                    className="text-ink-muted transition-colors group-hover:text-accent"
                  />
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

          {/* Projects: large cards with a capture of each live dashboard */}
          <SectionShell id="projects" title="Projects" meta="Live dashboards">
            <div className="space-y-5">
              {PROJECTS.map((project, index) => (
                <ProjectCard key={project.id} project={project} mirrored={index % 2 === 1} />
              ))}
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
            profiles={PROFILE_LINKS}
          />
        </div>
      </main>
    </div>
  );
}
