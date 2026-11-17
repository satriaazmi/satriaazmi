'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  items: NavItem[];
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

/**
 * Floating section index. Sticks to the top of the viewport, marks the
 * section currently under the reading line, and collapses into a menu
 * below the lg breakpoint. Also hosts the Daylight Mode toggle.
 */
export function SectionNav({ items, theme, onToggleTheme }: SectionNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const isDark = theme === 'dark';

  // Scroll-spy: the section crossing the band around 40% of the viewport is current.
  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    targets.forEach((el) => observer.observe(el));

    const syncEdges = () => {
      if (window.scrollY < targets[0].offsetTop - window.innerHeight * 0.5) {
        setActiveId(null);
        return;
      }
      // The last section can be too short to reach the reading band.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) setActiveId(targets[targets.length - 1].id);
    };
    window.addEventListener('scroll', syncEdges, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', syncEdges);
    };
  }, [items]);

  // Close the mobile menu on Escape or a click outside it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  if (items.length === 0) return null;

  const activeLabel = items.find((i) => i.id === activeId)?.label ?? 'Sections';

  const themeButton = (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label={isDark ? 'Switch to light observatory theme' : 'Switch to dark cosmic theme'}
      className={cn(
        'inline-flex min-h-[40px] min-w-[44px] shrink-0 items-center justify-center gap-2 rounded-xl border border-line px-3 text-xs font-medium text-ink transition-colors hover:border-accent',
        FOCUS_RING
      )}
    >
      {isDark ? (
        <>
          <Sun className="h-4 w-4 text-amber-300" aria-hidden="true" />
          <span className="hidden sm:inline">Daylight Mode</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-sky-700" aria-hidden="true" />
          <span className="hidden sm:inline">Cosmic Dark</span>
        </>
      )}
    </button>
  );

  return (
    <div className="sticky top-3 z-40 mb-4 sm:mb-6">
      <nav
        aria-label="Sections"
        className="relative flex items-center gap-2 overflow-visible rounded-2xl border border-line-strong bg-surface-nav p-1.5 pl-3 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)]"
      >
        <span
          aria-hidden="true"
          className="scroll-progress pointer-events-none absolute inset-x-3 bottom-0 h-px bg-accent"
        />
        <a
          href="#top"
          className={cn(
            'mr-1 hidden min-h-[40px] shrink-0 items-center font-display text-lg font-medium text-ink md:inline-flex',
            FOCUS_RING
          )}
        >
          Satria &apos;Azmi
        </a>

        {/* lg and up: inline index */}
        <ul className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          {items.map((item) => {
            const current = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={current ? 'location' : undefined}
                  className={cn(
                    'relative inline-flex min-h-[40px] items-center rounded-lg px-2.5 text-[13px] transition-colors',
                    current ? 'font-semibold text-ink' : 'text-ink-soft hover:text-ink',
                    FOCUS_RING
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-2.5 bottom-1 h-[2px] rounded-full bg-accent transition-opacity',
                      current ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* below lg: menu button */}
        <div ref={menuRef} className="relative flex-1 lg:hidden">
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="section-menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'inline-flex min-h-[40px] w-full items-center justify-between gap-2 rounded-xl px-2 text-sm text-ink md:w-auto md:justify-start',
              FOCUS_RING
            )}
          >
            <span>
              <span className="font-mono text-xs text-ink-muted">Go to </span>
              <span className="font-semibold">{activeLabel}</span>
            </span>
            <ChevronDown
              className={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
              aria-hidden="true"
            />
          </button>

          {open && (
            <ul
              id="section-menu"
              className="menu-pop absolute left-0 right-0 top-[calc(100%+0.6rem)] rounded-2xl border border-line-strong bg-surface-nav p-1.5 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.7)] md:right-auto md:min-w-[15rem]"
            >
              {items.map((item) => {
                const current = item.id === activeId;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={current ? 'location' : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex min-h-[44px] items-center justify-between rounded-lg px-3 text-sm',
                        current ? 'font-semibold text-ink' : 'text-ink-soft hover:bg-line hover:text-ink',
                        FOCUS_RING
                      )}
                    >
                      {item.label}
                      {current && (
                        <span className="font-mono text-[11px] text-accent">here</span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {themeButton}
      </nav>
    </div>
  );
}
