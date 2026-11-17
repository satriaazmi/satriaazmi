'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypedTextProps {
  text: string;
  className?: string;
  /** Delay before the first character, ms. */
  startDelay?: number;
  /** Time per character, ms. */
  charDelay?: number;
}

/**
 * Types `text` once on mount with a blinking caret, the way antigravity.google
 * types its hero line. The full sentence is laid out invisibly underneath so
 * the panel never changes height while typing, and screen readers get the
 * complete text immediately. Reduced-motion visitors see the full text at once.
 */
export function TypedText({
  text,
  className,
  startDelay = 450,
  charDelay = 26,
}: TypedTextProps) {
  const typedRef = useRef<HTMLSpanElement | null>(null);
  const caretRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const typed = typedRef.current;
    const caret = caretRef.current;
    if (!typed || !caret) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      typed.textContent = text;
      caret.style.display = 'none';
      return;
    }

    let index = 0;
    let timer = window.setTimeout(function step() {
      index += 1;
      typed.textContent = text.slice(0, index);
      if (index < text.length) {
        timer = window.setTimeout(step, charDelay);
      } else {
        timer = window.setTimeout(() => {
          caret.style.transition = 'opacity 400ms ease';
          caret.style.animation = 'none';
          caret.style.opacity = '0';
        }, 1600);
      }
    }, startDelay);

    return () => window.clearTimeout(timer);
  }, [text, startDelay, charDelay]);

  return (
    <span className={cn('grid', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible [grid-area:1/1]">
        {text}
      </span>
      <span aria-hidden="true" className="[grid-area:1/1]">
        <span ref={typedRef} />
        <span
          ref={caretRef}
          className="typed-caret ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-accent"
        />
      </span>
    </span>
  );
}
