import React from 'react';
import { CopyEmailButton } from '@/components/copy-email-button';
import { ProfileIcon } from '@/components/profile-icon';
import type { ProfileLink } from '@/lib/site-data';

interface ContactFooterProps {
  name: string;
  affiliation: string;
  location: string;
  email: string;
  profiles: ProfileLink[];
}

export function ContactFooter({
  name,
  affiliation,
  location,
  email,
  profiles,
}: ContactFooterProps) {
  const links = profiles.filter((p) => p.id !== 'email');

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 pt-14 sm:pt-20"
    >
      <div className="relative flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-3">
        <h2
          id="contact-heading"
          className="font-display text-[1.75rem] font-medium leading-none tracking-tight text-ink sm:text-[2.125rem]"
        >
          Contact
        </h2>
        <span
          aria-hidden="true"
          className="scroll-rule absolute inset-x-0 bottom-0 h-px bg-line-strong"
        />
      </div>

      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-ink-soft">Email</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-2">
            <a
              href={`mailto:${email}`}
              className="break-all font-display text-2xl font-medium text-ink underline decoration-line-strong decoration-1 underline-offset-[6px] hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-[2rem]"
            >
              {email}
            </a>
            <CopyEmailButton email={email} />
          </div>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {links.map((profile) => (
            <li key={profile.id}>
              <a
                href={profile.url}
                target={profile.external ? '_blank' : undefined}
                rel={profile.external ? 'noopener noreferrer' : undefined}
                className="group inline-flex min-h-[44px] items-center gap-2 text-ink-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <ProfileIcon id={profile.id} className="text-ink-muted transition-colors group-hover:text-accent" />
                <span className="font-semibold text-ink">{profile.title}</span>
                <span className="font-mono text-xs">{profile.handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-line pt-5 pb-2 font-mono text-xs text-ink-muted sm:flex-row sm:items-center">
        <span>
          {name} · {affiliation} · {location}
        </span>
        <a
          href="#top"
          className="inline-flex min-h-[44px] items-center text-ink-soft underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Back to top
        </a>
      </div>
    </footer>
  );
}
