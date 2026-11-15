import React from 'react';
import { cn } from '@/lib/utils';

interface LiquidGlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  theme: 'dark' | 'light';
  highlighted?: boolean;
  accentColor?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export function LiquidGlassPanel({
  theme,
  highlighted = false,
  accentColor,
  className,
  contentClassName,
  style,
  children,
  ...props
}: LiquidGlassPanelProps) {
  const isDark = theme === 'dark';

  const dynamicStyle: React.CSSProperties = {
    ...style,
    ...(highlighted && accentColor
      ? {
          borderColor: accentColor,
          boxShadow: isDark
            ? `inset 0 1px 0 0 rgba(255,255,255,0.42), inset 1px 0 0 0 rgba(255,255,255,0.2), 0 0 0 1px ${accentColor}44, 0 20px 44px -16px rgba(0,0,0,0.72)`
            : `inset 0 1px 0 0 rgba(255,255,255,0.92), inset 1px 0 0 0 rgba(255,255,255,0.65), 0 0 0 1px ${accentColor}55, 0 18px 36px -14px rgba(15,23,42,0.16)`,
        }
      : {}),
  };

  return (
    <div
      style={dynamicStyle}
      className={cn(
        'liquid-glass group relative overflow-hidden rounded-2xl transition-[transform,border-color,box-shadow,background-color] duration-300',
        isDark ? 'liquid-glass-dark' : 'liquid-glass-light',
        className
      )}
      {...props}
    >
      {/* Top specular refraction highlight */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent to-transparent transition-opacity duration-300',
          isDark ? 'via-white/45' : 'via-white/95'
        )}
      />
      {/* Diagonal liquid sheen on hover */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100',
          isDark
            ? 'bg-gradient-to-br from-white/[0.08] via-transparent to-sky-400/[0.05]'
            : 'bg-gradient-to-br from-white/70 via-transparent to-sky-500/[0.06]'
        )}
      />
      <div className={cn('relative z-10 h-full w-full', contentClassName)}>
        {children}
      </div>
    </div>
  );
}
