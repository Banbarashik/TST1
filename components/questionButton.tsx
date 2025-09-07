// components/FloatingCTA.tsx
"use client";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";

export default function QuestionButton() {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || !btnRef.current) return;

    const bottomGap = 16; // отступ от низа (px), соответствует Tailwind bottom-4
    const safeGap = 8; // зазор над футером (px), чтобы точно не соприкасаться

    let raf = 0;
    const update = () => {
      const btn = btnRef.current!;
      const footerTop = footer.getBoundingClientRect().top;

      // нижний край кнопки в вьюпорте, если бы не было сдвига
      const btnBottom = window.innerHeight - bottomGap;
      // когда верх футера опускается ниже "нижнего края кнопки + зазор",
      // начинаем сдвигать кнопку вверх ровно на величину перекрытия.
      const needShift = footerTop <= btnBottom + safeGap;

      // величина сдвига: фиксируем нижний край кнопки на линии (footerTop - safeGap)
      const shift = needShift ? btnBottom - (footerTop - safeGap) : 0;

      // без анимации — мгновенная «защёлка» в стоп-позицию
      btn.style.transform =
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
    <Button
      ref={btnRef}
      size="xl"
      className="fixed bottom-4 left-4 cursor-pointer bg-[#574184] hover:bg-[#7e5ebd]"
      style={{ willChange: "transform", transition: "none" }}
    >
      Задать вопрос
    </Button>
  );
}
