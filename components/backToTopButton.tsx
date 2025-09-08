"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowBigUpDash } from "lucide-react";

import StopAboveFooter from "@/components/utils/stopAboveFooter";
import { Button } from "@/components/ui/button";

interface BackToTopProps {
  threshold?: number;
  /** label для a11y */
  ariaLabel?: string;
}

export default function BackToTop({
  threshold = 0.25,
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
        scrollY / scrollable >= Math.min(Math.max(threshold, 0), 1);

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
  }, [threshold]);

  const onClick = () => {
    const prefersNoMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersNoMotion ? "auto" : "smooth" });
  };

  return (
    <StopAboveFooter side="right">
      <Button
        size="unset"
        onClick={onClick}
        className={`cursor-pointer p-2 transition-opacity duration-300 ${
          visible
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-label={ariaLabel}
      >
        <ArrowBigUpDash size={40} className="size-10" />
      </Button>
    </StopAboveFooter>
  );
}
