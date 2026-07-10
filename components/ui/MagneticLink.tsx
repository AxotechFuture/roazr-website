"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

/**
 * A link that leans gently toward the cursor — reserved for primary CTAs.
 */
export function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 180, damping: 16 });
  const y = useSpring(0, { stiffness: 180, damping: 16 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="inline-flex w-full sm:w-auto"
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}
