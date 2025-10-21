import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

import { ProductSelectionProvider } from "@/context/ProductSelectionContext";

import "@/app/globals.css";

import { PhoneCall, Mail } from "lucide-react";

import YandexMetrikaContainer from "@/components/YandexMetrikaContainer";

import Logo from "@/components/ui/logo";
import Footer from "@/components/footer";
import NavigationMenu from "@/components/navigationMenu";
import ContactFormTrigger from "@/components/contactFormTrigger";
import BackToTop from "@/components/backToTopButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProductSelectionProvider>
      <html lang="ru">
        <head>
          <Suspense>
            <YandexMetrikaContainer enabled />
          </Suspense>
          <GoogleAnalytics gaId="G-9EKGFKNDG0" />
        </head>
        <body className="font-arial flex min-h-screen flex-col antialiased">
          <nav className="4xl:px-16 flex h-25 items-center border-[#A5A5A5] bg-[#e0e0e0] pr-4 pl-2 sm:border-y-[1.5px] sm:pr-8 lg:px-2">
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
            {/* <Search
              color="var(--primary-darker)"
              className="ml-auto size-8 lg:ml-2 xl:ml-4"
            /> */}
          </nav>
          {/* Sticky trigger outside flex context */}
          <div className="sticky top-0 z-50 bg-white lg:hidden">
            <NavigationMenu variant="mobile" />
          </div>
          {/* Main content */}
          {children}
          <Footer />
          <BackToTop threshold={0.3} />
        </body>
      </html>
    </ProductSelectionProvider>
  );
}
