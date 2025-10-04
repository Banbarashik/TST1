import { Suspense } from "react";

import { ProductSelectionProvider } from "@/context/ProductSelectionContext";

import "@/app/globals.css";

import { Phone, Smartphone, Mail } from "lucide-react";

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
        </head>
        <body className="font-arial flex min-h-screen flex-col antialiased">
          <nav className="4xl:px-20 flex h-22 items-center bg-[#E0E0E0] pr-3 pl-6 sm:pr-6">
            <Logo place="header" />
            <div className="4xl:ml-12 3xl:ml-8 ml-6 flex flex-col items-start gap-y-1.5 text-lg sm:flex-row md:text-base lg:flex-col xl:flex-row">
              <a
                href="mailto:zao_tst@mail.ru"
                className="text-primary-darker hidden items-center gap-2 lg:hidden"
              >
                <Mail className="size-4" />
                zao_tst@mail.ru
              </a>
              <ul className="text-primary-darker mr-5 space-y-2">
                <li className="hidden items-center gap-2.5 sm:flex lg:hidden xl:flex">
                  <Phone className="size-4 lg:size-5" />
                  +7 (3846) 68-23-24
                </li>
                <li>
                  <a
                    href="tel:89617378314"
                    className="flex items-center gap-2.5 hover:font-semibold hover:text-[#604890]"
                  >
                    <Smartphone className="size-4 lg:size-5" />
                    8-961-737-83-14
                  </a>
                </li>
              </ul>
              <a
                href="mailto:zao_tst@mail.ru"
                className="text-primary-darker flex items-center gap-2 lg:order-first lg:flex xl:order-none"
              >
                <Mail className="size-4 xl:size-5" />
                zao_tst@mail.ru
              </a>
            </div>
            <div className="ml-auto hidden h-full items-center lg:flex lg:gap-6">
              <NavigationMenu />
              <ContactFormTrigger
                triggerBtnVariant="default"
                triggerBtnSize="lg"
                triggerBtnClassName="h-12 cursor-pointer text-base font-bold xl:text-xl"
                amountClassName="bg-accent absolute text-black right-0 bottom-0 inline-flex size-6 translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full text-sm font-semibold"
              />
            </div>
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
