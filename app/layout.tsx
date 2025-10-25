import "@/app/globals.css";

import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

import { ProductSelectionProvider } from "@/context/ProductSelectionContext";

import YandexMetrikaContainer from "@/components/YandexMetrikaContainer";

import Footer from "@/components/footer";
import NavigationMenu from "@/components/navigationMenu";
import BackToTop from "@/components/backToTopButton";
import HeaderWithSearch from "@/components/HeaderWithSearch";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProductSelectionProvider>
      <html lang="ru">
        <head>
          <meta
            name="google-site-verification"
            content="zoqFDu0IDrSmlptxD8jppYL81zjhTx7a3P8WIzlZS5Y"
          />
          <Suspense>
            <YandexMetrikaContainer enabled />
          </Suspense>
        </head>
        <body className="font-arial flex min-h-screen flex-col antialiased">
          <HeaderWithSearch />
          {/* Sticky trigger outside flex context */}
          <div className="sticky top-0 z-40 bg-white lg:hidden">
            <NavigationMenu variant="mobile" />
          </div>
          {/* Main content */}
          {children}
          <Footer />
          <BackToTop threshold={0.3} />
        </body>
        <GoogleAnalytics gaId="G-9EKGFKNDG0" />
      </html>
    </ProductSelectionProvider>
  );
}
