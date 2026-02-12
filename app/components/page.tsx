"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Fraunces, Space_Grotesk } from "next/font/google";
import Sidebar, {
  componentItems,
  extensionItems,
} from "@/components/ui/Sidebar";
import Button from "@/components/ui/button/Button";
import Toggle from "@/components/ui/toggle/Toggle";
import TextField from "@/components/ui/textfield/TextField";
import TabBar from "@/components/ui/tabbar/TabBar";
import Slider from "@/components/ui/slider/Slider";
import Alert from "@/components/ui/alert/Alert";
import Card from "@/components/ui/card/Card";
import Spinner from "@/components/ui/spinner/Spinner";
import Navbar from "@/components/ui/navbar/Navbar";
import BottomSheet from "@/components/ui/bottom-sheet/BottomSheet";
import Carousel from "@/components/ui/carousel/Carousel";
import TableView from "@/components/ui/tableview/TableView";
import Chart from "@/components/ui/chart/Chart";
import Reaction from "@/components/ui/reaction/Reaction";
import UIColor from "@/components/ui/extension/UIColor";
import BasicNavigation from "@/components/ui/extension/BasicNavigation";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-fraunces",
});

const copy = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const componentViews: Record<string, ReactNode> = {
  button: <Button />,
  "bottom-sheet": <BottomSheet />,
  toggle: <Toggle />,
  "text-field": <TextField />,
  "tab-bar": <TabBar />,
  spinner: <Spinner />,
  carousel: <Carousel />,
  navbar: <Navbar />,
  "table-view": <TableView />,
  reaction: <Reaction />,
  // slider: <Slider />,
  // alert: <Alert />,
  card: <Card />,
  chart: <Chart />,
  "ui-color": <UIColor />,
  "basic-navigation": <BasicNavigation />,
};

export default function ComponentsPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const allItems = useMemo(
    () => [...componentItems, ...extensionItems],
    []
  );
  const activeItem = useMemo(
    () => allItems.find((item) => item.id === activeId) ?? null,
    [activeId, allItems]
  );

  return (
    <div
      className={`${copy.variable} ${display.variable} flex w-full h-[calc(100svh-3.5rem)] overflow-hidden`}
    >
      <Sidebar activeId={activeId} onSelect={setActiveId} />
      <main className="relative w-full min-w-0 flex-1 overflow-y-auto p-8 bg-neutral-50/70 dark:bg-neutral-950">
        <div className="relative">
          {activeId && componentViews[activeId] ? (
            <div className="space-y-6">
              <div className="rounded-[28px] border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/70 p-6 shadow-[0_22px_60px_-40px_rgba(15,23,42,0.45)]">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
                  Component detail
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                  <h1
                    className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    {activeItem?.name ?? "Component"}
                  </h1>
                  <button
                    onClick={() => setActiveId(null)}
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-300/80 dark:border-neutral-700 px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
                  >
                    Back to overview
                  </button>
                </div>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl">
                  Live preview, usage patterns, and interaction details tuned for
                  iOS-style motion and touch targets.
                </p>
              </div>

              <div className="rounded-[28px] border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/80 p-8 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.4)]">
                {componentViews[activeId]}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <section className="relative overflow-hidden rounded-[32px] border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/70 p-8 md:p-10">
                <div className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.35)_0%,_rgba(56,189,248,0)_70%)] blur-3xl" />
                <div className="absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.35)_0%,_rgba(16,185,129,0)_70%)] blur-3xl" />
                <div className="relative space-y-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                    Component library
                  </span>
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-3 max-w-2xl">
                      <h1
                        className="text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white"
                        style={{ fontFamily: "var(--font-fraunces)" }}
                      >
                        Browse components with iOS texture.
                      </h1>
                      <p className="text-base text-neutral-600 dark:text-neutral-300">
                        Select a component to explore documentation, gestures,
                        and visual guidelines. Every piece is tuned for
                        touch-first clarity.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setActiveId(componentItems[0]?.id ?? null)}
                        className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 text-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
                      >
                        Start here
                      </button>
                      <span className="inline-flex items-center justify-center rounded-2xl border border-neutral-300/80 dark:border-neutral-700 px-5 py-3 text-xs font-semibold text-neutral-700 dark:text-neutral-200">
                        {allItems.length} live pieces
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {componentItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className="group relative overflow-hidden rounded-[26px] border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/70 p-5 text-left shadow-[0_20px_50px_-42px_rgba(15,23,42,0.5)] transition hover:-translate-y-1 hover:border-neutral-300 dark:hover:border-neutral-700"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/5 via-transparent to-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative space-y-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Tap to view details and motion states.
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-10 rounded-full bg-neutral-900 dark:bg-white" />
                        <span className="h-2 w-6 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                      </div>
                    </div>
                  </button>
                ))}
              </section>

              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                    Extension
                  </p>
                  <span className="text-xs text-neutral-500">
                    Swift helpers
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {extensionItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveId(item.id)}
                      className="group relative overflow-hidden rounded-[26px] border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/70 p-5 text-left shadow-[0_20px_50px_-42px_rgba(15,23,42,0.5)] transition hover:-translate-y-1 hover:border-neutral-300 dark:hover:border-neutral-700"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/5 via-transparent to-sky-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="relative space-y-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          Swift extension helpers and usage notes.
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-10 rounded-full bg-neutral-900 dark:bg-white" />
                          <span className="h-2 w-6 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
