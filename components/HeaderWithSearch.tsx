"use client";
import React, { useEffect, useRef, useState } from "react";
import { PhoneCall, Mail, Search, X } from "lucide-react";

import Logo from "@/components/ui/logo";
import NavigationMenu from "@/components/navigationMenu";
import ContactFormTrigger from "@/components/contactFormTrigger";

export default function HeaderWithSearch(): JSX.Element {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [wasManuallyOpened, setWasManuallyOpened] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  const navRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef<number>(0);

  const SEARCH_HEIGHT = 76; // px, adjust to match your maxHeight

  // tuning
  const SCROLL_THRESHOLD = 30; // px cumulative before toggle
  const SCROLL_LOCK_MS = 350; // lock duration after a toggle
  const accumulated = useRef(0);
  const lastDir = useRef(0);
  const lockTimeout = useRef<number | null>(null);
  const locked = useRef(false);

  // Nav visibility observer
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

  // Scroll handler - only active when search was manually opened
  useEffect(() => {
    if (!wasManuallyOpened) return;

    lastScrollY.current = window.scrollY;
    accumulated.current = 0;
    lastDir.current = 0;
    locked.current = false;

    const clearLock = () => {
      locked.current = false;
      accumulated.current = 0;
      lastDir.current = 0;
      if (lockTimeout.current) {
        window.clearTimeout(lockTimeout.current);
        lockTimeout.current = null;
      }
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      let dy = currentY - lastScrollY.current;

      // tiny noise ignore
      if (Math.abs(dy) < 2) {
        lastScrollY.current = currentY;
        return;
      }

      const dir = Math.sign(dy); // 1 down, -1 up

      // if direction changed, reset accumulated
      if (dir !== lastDir.current) {
        accumulated.current = Math.abs(dy);
      } else {
        accumulated.current += Math.abs(dy);
      }
      lastDir.current = dir;

      // only act when nav is out of view
      if (
        !navVisible &&
        !locked.current &&
        accumulated.current >= SCROLL_THRESHOLD
      ) {
        if (dir > 0) {
          setIsSearchOpen(false); // scrolling down
        } else {
          setIsSearchOpen(true); // scrolling up
        }

        // lock further toggles briefly
        locked.current = true;
        if (lockTimeout.current) window.clearTimeout(lockTimeout.current);
        lockTimeout.current = window.setTimeout(() => {
          clearLock();
        }, SCROLL_LOCK_MS);
      }

      // if nav becomes visible again, reset accumulators to avoid stale state
      if (navVisible) {
        accumulated.current = 0;
        lastDir.current = 0;
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (lockTimeout.current) {
        window.clearTimeout(lockTimeout.current);
        lockTimeout.current = null;
      }
    };
  }, [navVisible, wasManuallyOpened]);

  // replace handleOpenSearch + keep handleCloseSearch (or update)
  const handleToggleSearch = () => {
    if (isSearchOpen) {
      // close
      setIsSearchOpen(false);
      setWasManuallyOpened(false);
      // clear locks and accumulators
      accumulated.current = 0;
      lastDir.current = 0;
      locked.current = false;
      if (lockTimeout.current) {
        window.clearTimeout(lockTimeout.current);
        lockTimeout.current = null;
      }
    } else {
      // open
      setIsSearchOpen(true);
      setWasManuallyOpened(true);
      // reset accumulators so scrolling starts fresh
      accumulated.current = 0;
      lastDir.current = 0;
      locked.current = false;
    }
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setWasManuallyOpened(false);
    // clear locks and accumulators
    accumulated.current = 0;
    lastDir.current = 0;
    locked.current = false;
    if (lockTimeout.current) {
      window.clearTimeout(lockTimeout.current);
      lockTimeout.current = null;
    }
  };

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
          onClick={handleToggleSearch}
          className="group ml-auto size-8 cursor-pointer rounded p-1.5 transition duration-200 hover:scale-120 lg:ml-2 xl:ml-4"
        >
          <Search
            color="var(--primary-darker)"
            className="group-hover:stroke-3"
          />
        </button>
      </nav>

      {/* Search block: keep it in-flow and sticky so no jump when nav appears/disappears */}
      <div
        aria-hidden={!isSearchOpen}
        className={[
          "sticky top-0 right-0 left-0 z-50 mx-auto w-full max-w-[968px] overflow-hidden transition-all duration-300 ease-in-out",
          // only show white background when open, and only add border/shadow when open + nav is hidden
          isSearchOpen ? "bg-[#e0e0e0]" : "bg-transparent",
          isSearchOpen && !navVisible
            ? "border-b border-gray-200 shadow-md"
            : "",
        ].join(" ")}
        style={{
          maxHeight: isSearchOpen ? `${SEARCH_HEIGHT}px` : "0px",
          // avoid catching pointer events when closed
          pointerEvents: isSearchOpen ? "auto" : "none",
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
            onClick={handleCloseSearch}
            className="ml-2 cursor-pointer rounded p-2 hover:bg-gray-100"
          >
            <X size={20} color="var(--primary-darker)" />
          </button>
        </div>
      </div>
    </>
  );
}
