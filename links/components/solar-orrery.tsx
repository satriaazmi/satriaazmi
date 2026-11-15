'use client';

import React from 'react';
import Image from 'next/image';
import {
  ALL_SOLAR_BODIES,
  OWNER_PROFILE,
  SolarBody,
} from '@/lib/solar-data';
import { cn } from '@/lib/utils';

interface SolarOrreryProps {
  theme: 'dark' | 'light';
  activeId: string | null;
  onHoverBody: (id: string | null) => void;
}

const RING_CONFIG: Record<
  1 | 2 | 3,
  { sizeClass: string; durationSec: number }
> = {
  1: {
    sizeClass: 'w-[49%] h-[49%]',
    durationSec: 58,
  },
  2: {
    sizeClass: 'w-[72%] h-[72%]',
    durationSec: 86,
  },
  3: {
    sizeClass: 'w-[94%] h-[94%]',
    durationSec: 118,
  },
};

export function SolarOrrery({
  theme,
  activeId,
  onHoverBody,
}: SolarOrreryProps) {
  const isDark = theme === 'dark';
  const activeBody: SolarBody | undefined = ALL_SOLAR_BODIES.find(
    (b) => b.id === activeId
  );

  return (
    <div className="flex flex-col items-center">
      {/* Interactive Solar System Stage */}
      <div
        className={cn(
          'relative flex items-center justify-center rounded-full',
          'w-[276px] h-[276px] sm:w-[308px] sm:h-[308px]'
        )}
        role="region"
        aria-label="Interactive Solar System navigation map"
      >
        {/* Subtle solar ambient aura strictly behind the central Sun */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 m-auto rounded-full blur-2xl transition-opacity duration-500',
            'w-28 h-28 sm:w-32 sm:h-32',
            isDark ? 'bg-amber-500/25' : 'bg-amber-400/25'
          )}
        />

        {/* 3 Concentric Orbital Tracks & Planets (always orbiting) */}
        {([3, 2, 1] as const).map((ringNum) => {
          const config = RING_CONFIG[ringNum];
          const bodies = ALL_SOLAR_BODIES.filter((b) => b.orbitRing === ringNum);

          return (
            <div
              key={ringNum}
              style={{
                animationDuration: `${config.durationSec}s`,
              }}
              className={cn(
                'solar-orbit-ring pointer-events-none absolute inset-0 m-auto rounded-full border transition-colors duration-300',
                config.sizeClass,
                isDark ? 'border-white/[0.14]' : 'border-slate-900/[0.14]',
                activeBody?.orbitRing === ringNum &&
                  (isDark ? 'border-sky-400/55' : 'border-sky-600/55')
              )}
            >
              {bodies.map((body) => {
                const isActive = activeId === body.id;
                return (
                  <div
                    key={body.id}
                    style={{ transform: `rotate(${body.startAngleDeg}deg)` }}
                    className="pointer-events-none absolute inset-0"
                  >
                    <a
                      href={body.url}
                      target={body.external ? '_blank' : undefined}
                      rel={body.external ? 'noopener noreferrer' : undefined}
                      onMouseEnter={() => onHoverBody(body.id)}
                      onMouseLeave={() => onHoverBody(null)}
                      onFocus={() => onHoverBody(body.id)}
                      onBlur={() => onHoverBody(null)}
                      title={`${body.planetName} · ${body.title}`}
                      aria-label={`${body.planetName} orbit: ${body.title} - ${body.subtitle}`}
                      style={{
                        transform: `translate(-50%, -50%) rotate(-${body.startAngleDeg}deg)`,
                      }}
                      className={cn(
                        'pointer-events-auto absolute left-1/2 top-0 flex h-11 w-11 items-center justify-center rounded-full',
                        'transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400',
                        isActive ? 'scale-125 z-30' : 'hover:scale-125 z-20'
                      )}
                    >
                      <span className="relative flex items-center justify-center">
                        {body.hasRing && (
                          <span
                            aria-hidden="true"
                            style={{
                              width: body.sizePx + 14,
                              height: Math.round((body.sizePx + 14) * 0.34),
                              borderColor: isDark
                                ? 'rgba(254, 240, 138, 0.72)'
                                : 'rgba(161, 98, 7, 0.72)',
                            }}
                            className="pointer-events-none absolute rounded-full border-[1.5px] -rotate-12"
                          />
                        )}
                        <span
                          style={{
                            width: body.sizePx,
                            height: body.sizePx,
                            background: body.sphereGradient,
                            boxShadow: isActive
                              ? `0 0 14px ${body.glowColor}, inset 0 1px 2px rgba(255,255,255,0.45)`
                              : `0 0 8px ${body.glowColor}`,
                          }}
                          className={cn(
                            'block rounded-full transition-shadow duration-200',
                            isActive && 'ring-2 ring-white/80'
                          )}
                        />
                      </span>
                    </a>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Central Sun: Satria Portrait */}
        <div
          className={cn(
            'relative z-10 flex items-center justify-center rounded-full p-[3px]',
            'w-[76px] h-[76px] sm:w-[88px] sm:h-[88px]',
            'bg-gradient-to-tr from-amber-500 via-yellow-300 to-orange-400',
            'shadow-[0_0_24px_rgba(245,158,11,0.45)]'
          )}
        >
          <div
            className={cn(
              'h-full w-full overflow-hidden rounded-full border-2',
              isDark ? 'border-[#030407]' : 'border-slate-50'
            )}
          >
            <Image
              src={OWNER_PROFILE.photoSrc}
              alt={OWNER_PROFILE.name}
              width={240}
              height={240}
              priority
              className="h-full w-full scale-[1.38] object-cover object-[50%_20%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
