import { Suspense } from "react";

import { ProductSelectionProvider } from "@/context/ProductSelectionContext";

import "@/app/globals.css";
import "keen-slider/keen-slider.min.css";

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
          <nav className="4xl:px-20 flex h-22 items-center bg-[#E0E0E0] px-8">
            <Logo place="header" />
            <div className="4xl:ml-12 3xl:ml-8 ml-6 flex flex-col items-start gap-y-1.5 text-sm xl:flex-row xl:text-base">
              <a
                href="mailto:zao_tst@mail.ru"
                className="text-primary-darker flex items-center gap-2 xl:hidden"
              >
                <Mail className="size-4" />
                zao_tst@mail.ru
              </a>
              <ul className="text-primary-darker mr-5 space-y-2">
                <li className="flex items-center gap-2.5">
                  <Phone className="size-4 xl:size-5" />
                  +7 (3846) 68-23-24
                </li>
                <li>
                  <a
                    href="tel:89617378314"
                    className="flex items-center gap-2.5 hover:font-semibold hover:text-[#604890]"
                  >
                    <Smartphone className="size-4 xl:size-5" />
                    8-961-737-83-14
                  </a>
                </li>
              </ul>
              <a
                href="mailto:zao_tst@mail.ru"
                className="text-primary-darker hidden items-center gap-2 xl:flex"
              >
                <Mail className="size-4 xl:size-5" />
                zao_tst@mail.ru
              </a>
            </div>
            <div className="ml-auto flex h-full items-center gap-8">
              <NavigationMenu />
              <ContactFormTrigger />
            </div>
          </nav>
          {children}
          <Footer />
          <BackToTop threshold={0.3} />
        </body>
      </html>
    </ProductSelectionProvider>
  );
}
