"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "px" | "percent";

interface BackToTopProps {
  /** Порог показа: число пикселей (mode="px") или доля 0..1 (mode="percent") */
  threshold?: number;
  mode?: Mode;
  /** Где располагать кнопку (по умолчанию — левый низ) */
  position?: "left" | "right";
  /** Отступ от краёв, px (соответствует Tailwind bottom-4/right-4/left-4) */
  offset?: number;
  /** Доп. классы для кнопки */
  className?: string;
  /** label для a11y */
  ariaLabel?: string;
}

export default function BackToTop({
  threshold = 0.25,
  mode = "percent",
  position = "left",
  offset = 16,
  className = "",
  ariaLabel = "Наверх",
}: BackToTopProps) {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);

      const passed =
        mode === "px"
          ? scrollY >= threshold
          : scrollY / scrollable >= Math.min(Math.max(threshold, 0), 1);

      setVisible(passed);
      rafRef.current = 0;
    };

    const onScrollOrResize = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [threshold, mode]);

  const onClick = () => {
    const prefersNoMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersNoMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={[
        "fixed z-50 rounded-xl bg-blue-600 px-4 py-2 text-white shadow-lg",
        "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none",
        "transition-opacity duration-300", // fade-in/fade-out
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
        className,
      ].join(" ")}
      style={{
        bottom: offset,
        left: position === "left" ? offset : "unset",
        right: position === "right" ? offset : "unset",
      }}
    >
      Наверх
    </button>
  );
}
