import { ProductSelectionProvider } from "@/context/ProductSelectionContext";

import "@/app/globals.css";
import "keen-slider/keen-slider.min.css";

import { Phone, Smartphone } from "lucide-react";

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
          <YandexMetrikaContainer enabled />
        </head>
        <body className="font-arial flex min-h-screen flex-col antialiased">
          <nav className="3xl:px-20 flex h-22 items-center bg-[#E0E0E0] xl:px-8">
            <Logo place="header" />
            <ul className="text-primary-darker mr-5 space-y-2 lg:text-sm xl:ml-5 2xl:ml-12 2xl:text-base">
              <li className="flex items-center gap-2.5">
                <Phone size={20} />
                +7 (3846) 68-23-24
              </li>
              <li>
                <a
                  href="tel:89617378314"
                  className="flex items-center gap-2.5 hover:font-semibold hover:text-[#604890]"
                >
                  <Smartphone size={20} />
                  8-961-737-83-14
                </a>
              </li>
            </ul>
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
