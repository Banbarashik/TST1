"use client";
import React, { useEffect, useRef, useState } from "react";
import { PhoneCall, Mail, Search, X } from "lucide-react";
import Logo from "@/components/ui/logo";
import NavigationMenu from "@/components/navigationMenu";
import ContactFormTrigger from "@/components/contactFormTrigger";
import searchData from "@/data/general-pages-search-index.json";

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
  const SEARCH_HEIGHT = 76; // px, adjust to match your maxHeight

  // new constant for expanded results area
  const RESULTS_PANEL_HEIGHT = 320; // px - adjust as needed

  // Update search results based on input
  useEffect(() => {
    if (!searchInput) {
      setSearchResults([]);
      return;
    }
    const results = searchData.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase()),
    );
    setSearchResults(results);
  }, [searchInput]);

  const handleToggleSearch = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setWasManuallyOpened(false);
      setSearchInput(""); // Clear input when closing
      setSearchResults([]); // Clear results when closing
    } else {
      setIsSearchOpen(true);
      setWasManuallyOpened(true);
    }
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setWasManuallyOpened(false);
    setSearchInput(""); // Clear input when closing
    setSearchResults([]); // Clear results when closing
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
        // when results exist allow overflow so the absolutely positioned panel can lay over content
        className={[
          "relative top-0 right-0 left-0 z-50 mx-auto w-full max-w-[968px] transition-all duration-300 ease-in-out lg:sticky",
          // toggle overflow to allow overlaying results
          searchResults.length > 0 ? "overflow-visible" : "overflow-hidden",
          // only show background when open, and add border/shadow when open + nav hidden
          isSearchOpen
            ? "bg-[#e0e0e0] outline outline-[#A5A5A5]"
            : "bg-transparent",
          isSearchOpen && !navVisible
            ? "border-b border-gray-200 shadow-md"
            : "",
        ].join(" ")}
        style={{
          // control collapse of the input row only; results panel is absolutely positioned
          maxHeight: isSearchOpen ? `${SEARCH_HEIGHT}px` : "0px",
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
          <div className="flex w-full items-center gap-3 rounded bg-gray-100 px-3 py-2 outline outline-[#A5A5A5]">
            <Search className="text-primary-darker size-5" />
            <input
              autoFocus={isSearchOpen}
              type="search"
              placeholder="Поиск..."
              className="w-full bg-transparent text-base outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
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

        {/* Render search results as an absolutely positioned overlay so it doesn't shift layout */}
        {searchResults.length > 0 && (
          <div
            className="absolute right-0 left-0 z-40 mt-0 border-t bg-white shadow-sm"
            style={{
              top: "100%", // place immediately under the input row
              maxHeight: "240px",
              overflowY: "auto",
              padding: "8px 6px",
            }}
          >
            {searchResults.map((item) => (
              <a
                key={item.url}
                href={item.url}
                className="flex items-center gap-2 rounded p-2 hover:bg-gray-100"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-10 w-10 flex-shrink-0 rounded-sm object-cover"
                />
                <span className="text-sm text-gray-900">{item.title}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
