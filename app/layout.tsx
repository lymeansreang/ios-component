import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import ThemeProvider from "@/components/theme-provider";
import ThemeTogglerClient from "@/components/theme-toggler-client";
import { BrandLogo } from "@/components/ui/BrandLogo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iOS Components",
  description: "A collection of iOS-style UI components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm">
            <nav className="max-w-7xl mx-auto flex items-center gap-6 px-6 h-14">
              <Link
                href="/homepage"
                className="flex items-center gap-2 font-semibold text-lg tracking-tight"
              >
                <BrandLogo
                  size={24}
                  className="text-neutral-900 dark:text-white"
                />
                iOS Components
              </Link>
              <div className="flex items-center gap-3 ml-auto">
                <Link
                  href="/components"
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  Components
                </Link>
                <ThemeTogglerClient />
              </div>
            </nav>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
