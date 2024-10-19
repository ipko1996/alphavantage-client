import "~/styles/globals.css";
import "@mantine/core/styles.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { TRPCReactProvider } from "~/trpc/react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "StockSearch",
  description: "Find your next investment opportunity",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <TRPCReactProvider>
            <div className="flex min-h-screen flex-col">
              <header className="flex h-14 items-center border-b px-4 lg:px-6">
                <Link className="flex items-center justify-center" href="/">
                  <TrendingUp className="text-primary h-6 w-6" />
                  <span className="ml-2 font-semibold">StockSearch</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                  <Link
                    className="hover:text-primary text-sm font-medium"
                    href="/favorites"
                  >
                    Favorites
                  </Link>
                </nav>
              </header>
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6">
                <p className="text-muted-foreground text-center text-sm">
                  © 2024 StockSearch. All rights reserved.
                </p>
              </footer>
            </div>
          </TRPCReactProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
