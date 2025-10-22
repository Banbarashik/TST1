"use client";
import React, { useEffect, useRef, useState } from "react";
import { PhoneCall, Mail, Search, X } from "lucide-react";

import Logo from "@/components/ui/logo";
import NavigationMenu from "@/components/navigationMenu";
import ContactFormTrigger from "@/components/contactFormTrigger";

export default function HeaderWithSearch(): JSX.Element {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const navRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => setNavVisible(entry.isIntersecting)),
      { root: null, threshold: 0.01 },
    );
    observer.observe(navEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const dy = currentY - lastScrollY.current;

        if (!navVisible) {
          if (dy > 5)
            setIsSearchOpen(false); // scrolling down -> hide
          else if (dy < -5) setIsSearchOpen(true); // scrolling up -> show
        }

        lastScrollY.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [navVisible]);

  return (
    <>
      <nav
        ref={navRef}
        className="4xl:px-16 flex h-25 items-center border-[#A5A5A5] bg-[#e0e0e0] pr-4 pl-2 sm:border-y-[1.5px] sm:pr-8 lg:px-2"
      >
        <Logo place="header" />
        <ul className="4xl:ml-12 3xl:ml-8 text-primary-darker ml-3 flex flex-col items-start gap-y-2 xl:text-lg">
          <li className="hover:font-semibold">
            <a href="tel:89617378314" className="flex items-center gap-2.5">
              <span className="border-primary-darker rounded-full border p-1.25">
                <PhoneCall className="size-4 xl:size-5" />
              </span>
              <span>+7 (961) 737-83-14</span>
            </a>
          </li>
          <li className="hover:text-shadow-[0_0_1px_currentColor]">
            <a
              href="mailto:zao_tst@mail.ru"
              className="flex items-center gap-2.5"
            >
              <span className="border-primary-darker rounded-full border p-1.25">
                <Mail className="size-4 xl:size-5" />
              </span>
              <span>zao_tst@mail.ru</span>
            </a>
          </li>
        </ul>

        <div className="ml-auto hidden h-full items-center gap-3 lg:flex xl:gap-6">
          <NavigationMenu />
          <ContactFormTrigger
            triggerBtnVariant="default"
            triggerBtnSize="lg"
            triggerBtnClassName="h-12 px-3 cursor-pointer hover:bg-primary-dark text-base font-bold xl:text-xl border border-[#A5A5A5]"
            amountClassName="bg-accent absolute text-black right-0 bottom-0 inline-flex size-6 translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full text-sm font-semibold"
          />
        </div>

        <button
          aria-label="Open search"
          onClick={() => setIsSearchOpen((v) => !v)}
          className="ml-auto size-8 rounded p-1.5 hover:bg-gray-200 lg:ml-2 xl:ml-4"
        >
          <Search color="var(--primary-darker)" />
        </button>
      </nav>

      <div
        aria-hidden={!isSearchOpen}
        className={[
          !navVisible ? "fixed top-0 right-0 left-0 z-50" : "relative",
          !navVisible
            ? "border-b border-gray-200 bg-white shadow-md"
            : "bg-white",
          "overflow-hidden transition-all duration-300 ease-in-out",
        ].join(" ")}
        style={{
          maxHeight: isSearchOpen ? "76px" : "0px",
        }}
      >
        <div
          className="mx-auto flex w-full items-center gap-3 px-4 py-3"
          style={{
            transform: isSearchOpen ? "translateY(0)" : "translateY(-6px)",
            opacity: isSearchOpen ? 1 : 0,
            transition: "transform 220ms ease, opacity 220ms ease",
          }}
        >
          <div className="flex w-full items-center gap-3 rounded bg-gray-100 px-3 py-2">
            <Search className="text-primary-darker size-5" />
            <input
              autoFocus={isSearchOpen}
              type="search"
              placeholder="Поиск..."
              className="w-full bg-transparent text-base outline-none"
            />
          </div>

          <button
            aria-label="Close search"
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 rounded p-2 hover:bg-gray-100"
          >
            <X />
          </button>
        </div>
      </div>
    </>
  );
}
