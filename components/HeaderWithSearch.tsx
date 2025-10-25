"use client";

import searchIndex from "@/data/general-pages-search-index.json";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { PhoneCall, Mail, Search, X } from "lucide-react";

import Logo from "@/components/ui/logo";
import NavigationMenu from "@/components/navigationMenu";
import ContactFormTrigger from "@/components/contactFormTrigger";
import { Button } from "./ui/button";

// Define the type for search index items
interface SearchItem {
  title: string;
  url: string;
  img: string;
}

export default function HeaderWithSearch(): JSX.Element {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [wasManuallyOpened, setWasManuallyOpened] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const navRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef<number>(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const SEARCH_HEIGHT = 76; // px, adjust to match your maxHeight

  // Results panel sizing (if needed)
  const RESULTS_PANEL_HEIGHT = 320; // px - adjust as needed

  // Scroll/jitter tuning
  const SCROLL_THRESHOLD = 30; // px cumulative before toggle
  const SCROLL_LOCK_MS = 300; // lock duration after a toggle
  const accumulated = useRef(0);
  const lastDir = useRef(0);
  const lockTimeout = useRef<number | null>(null);
  const locked = useRef(false);

  // Load/compute search results
  useEffect(() => {
    if (!searchInput) {
      setSearchResults([]);
      return;
    }
    const results = (searchIndex as SearchItem[]).filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase()),
    );
    setSearchResults(results);
  }, [searchInput]);

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

      // ignore tiny noise
      if (Math.abs(dy) < 2) {
        lastScrollY.current = currentY;
        return;
      }

      const dir = Math.sign(dy); // 1 down, -1 up

      // reset accumulated when direction changes
      if (dir !== lastDir.current) {
        accumulated.current = Math.abs(dy);
      } else {
        accumulated.current += Math.abs(dy);
      }
      lastDir.current = dir;

      // Only act when nav is out of view
      if (
        !navVisible &&
        !locked.current &&
        accumulated.current >= SCROLL_THRESHOLD
      ) {
        if (dir > 0) {
          // scrolling down -> hide only if there are NO results
          if (searchResults.length === 0) {
            setIsSearchOpen(false);
            // lock toggles briefly to avoid flip-flop
            locked.current = true;
            if (lockTimeout.current) window.clearTimeout(lockTimeout.current);
            lockTimeout.current = window.setTimeout(() => {
              clearLock();
            }, SCROLL_LOCK_MS);
          } else {
            // keep open when results exist; reset accumulators so repeated motion doesn't trigger hide
            accumulated.current = 0;
            lastDir.current = 0;
          }
        } else {
          // scrolling up -> always show
          setIsSearchOpen(true);
          locked.current = true;
          if (lockTimeout.current) window.clearTimeout(lockTimeout.current);
          lockTimeout.current = window.setTimeout(() => {
            clearLock();
          }, SCROLL_LOCK_MS);
        }
      }

      // Reset if nav becomes visible
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
  }, [navVisible, wasManuallyOpened, searchResults.length]);

  // Hide results when clicking/tapping outside the search area
  useEffect(() => {
    if (!isSearchOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!wrapperRef.current) return;
      // if click is outside the whole search wrapper, clear results
      if (target && !wrapperRef.current.contains(target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isSearchOpen]);

  const handleToggleSearch = () => {
    if (isSearchOpen) {
      // close
      setIsSearchOpen(false);
      setWasManuallyOpened(false);
      setSearchInput("");
      setSearchResults([]);
      // clear accumulators/locks
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
      accumulated.current = 0;
      lastDir.current = 0;
      locked.current = false;
    }
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setWasManuallyOpened(false);
    setSearchInput("");
    setSearchResults([]);
    accumulated.current = 0;
    lastDir.current = 0;
    locked.current = false;
    if (lockTimeout.current) {
      window.clearTimeout(lockTimeout.current);
      lockTimeout.current = null;
    }
  };

  // Focus the input when the search block opens; blur when it closes
  useEffect(() => {
    if (isSearchOpen) {
      // slight delay so element is mounted / transition started
      const t = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    } else {
      inputRef.current?.blur();
    }
  }, [isSearchOpen]);

  // Render
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

      {/* Search block: input row stays in-flow; results overlay absolute so no layout shift */}
      <div
        aria-hidden={!isSearchOpen}
        className={[
          "relative top-0 right-0 left-0 z-50 mx-auto w-full max-w-[968px] transition-all duration-300 ease-in-out lg:sticky",
          searchResults.length > 0 ? "overflow-visible" : "overflow-hidden",
          isSearchOpen
            ? "bg-[#e0e0e0] outline outline-[#A5A5A5]"
            : "bg-transparent",
          isSearchOpen && !navVisible
            ? "border-b border-gray-200 shadow-md"
            : "",
        ].join(" ")}
        style={{
          maxHeight: isSearchOpen ? `${SEARCH_HEIGHT}px` : "0px",
          pointerEvents: isSearchOpen ? "auto" : "none",
        }}
        ref={wrapperRef}
      >
        <div
          className="mx-auto flex w-full items-center gap-3 px-4 py-3"
          style={{
            transform: isSearchOpen ? "translateY(0)" : "translateY(-6px)",
            opacity: isSearchOpen ? 1 : 0,
            transition: "transform 220ms ease, opacity 220ms ease",
          }}
        >
          <div className="flex w-full items-center gap-3 rounded bg-gray-100 px-3 py-2 outline outline-[#A5A5A5]">
            <Search className="text-primary-darker size-5" />
            <input
              ref={inputRef}
              type="search"
              placeholder="Поиск..."
              className="w-full bg-transparent text-base outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <div className="flex gap-6">
            <Button onClick={handleCloseSearch} asChild>
              <Link href={`/search?q=${searchInput}`}>Найти</Link>
            </Button>
            <Button
              size="icon"
              variant="outline"
              aria-label="Close search"
              onClick={handleCloseSearch}
              className="text-primary-darker cursor-pointer"
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* Render search results as an absolutely positioned overlay so it doesn't shift layout */}
        {searchResults.length > 0 && (
          <ul
            className="absolute right-0 left-0 z-50 mt-0 border-t bg-white shadow-sm"
            style={{
              top: "100%", // place immediately under the input row
              // maxHeight: "240px",
              // overflowY: "auto",
              padding: "8px 6px",
            }}
          >
            {searchResults.slice(0, 8).map((item) => (
              <li key={item.url}>
                <Link
                  href={item.url}
                  className="flex items-center gap-2 rounded p-2 hover:bg-gray-100"
                  onClick={handleCloseSearch}
                >
                  <Image
                    src={item.img}
                    width={40}
                    height={40}
                    className="shrink-0"
                  />
                  <span className="text-sm text-gray-900">{item.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/search?q=${searchInput}`}
                className="flex items-center gap-2 rounded p-2 hover:bg-gray-100"
                onClick={handleCloseSearch}
              >
                Все результаты
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
