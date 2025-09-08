"use client";

import { useRef, useEffect } from "react";

const offset = 16; // отступ от низа (px)

interface StopAboveFooterProps {
  side: "left" | "right";
  children: React.ReactNode;
}

export default function StopAboveFooter({
  side,
  children,
}: StopAboveFooterProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || !elRef.current) return;

    let raf = 0;
    const update = () => {
      const el = elRef.current!;
      const footerTop = footer.getBoundingClientRect().top;

      // нижний край кнопки в вьюпорте, если бы не было сдвига
      const elBottom = window.innerHeight - offset;
      // когда верх футера опускается ниже "нижнего края кнопки + зазор",
      // начинаем сдвигать кнопку вверх ровно на величину перекрытия.
      const needShift = footerTop <= elBottom + offset;

      // величина сдвига: фиксируем нижний край кнопки на линии (footerTop - offset)
      const shift = needShift ? elBottom - (footerTop - offset) : 0;

      // без анимации — мгновенная «защёлка» в стоп-позицию
      el.style.transform =
        shift > 0 ? `translateY(-${shift}px)` : "translateY(0)";
      raf = 0;
    };

    const onScrollOrResize = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    // если футер/контент меняют высоту динамически
    const ro = new ResizeObserver(onScrollOrResize);
    ro.observe(footer);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={elRef}
      className="fixed z-50 transition-none will-change-transform"
      style={{
        bottom: offset,
        left: side === "left" ? offset : "unset",
        right: side === "right" ? offset : "unset",
      }}
    >
      {children}
    </div>
  );
}
