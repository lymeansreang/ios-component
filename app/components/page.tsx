"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Fraunces, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "motion/react";
import Sidebar, {
  componentItems,
  extensionItems,
  customItems,
} from "@/components/ui/Sidebar";
import Button from "@/components/ui/button/Button";
import Toggle from "@/components/ui/toggle/Toggle";
import TextField from "@/components/ui/textfield/TextField";
import Media from "@/components/ui/media/Media";
import Premium from "@/components/ui/premium/Premium";
import TabBar from "@/components/ui/tabbar/TabBar";
import Slider from "@/components/ui/slider/Slider";
import Alert from "@/components/ui/alert/Alert";
import Card from "@/components/ui/card/Card";
import Spinner from "@/components/ui/spinner/Spinner";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import Navbar from "@/components/ui/navbar/Navbar";
import BottomSheet from "@/components/ui/bottom-sheet/BottomSheet";
import Carousel from "@/components/ui/carousel/Carousel";
import TableView from "@/components/ui/tableview/TableView";
import Chart from "@/components/ui/chart/Chart";
import Reaction from "@/components/ui/reaction/Reaction";
import Dropdown from "@/components/ui/dropdown/Dropdown";
import RadioButton from "@/components/ui/radio-button/RadioButton";
import MessageAlert from "@/components/ui/message-alert/MessageAlert";
import Rating from "@/components/ui/rating/Rating";
import ScanQR from "@/components/ui/scan-qr/ScanQR";
import UIColor from "@/components/ui/extension/UIColor";
import UIFontExtension from "@/components/ui/extension/UIFont";
import UIViewExtension from "@/components/ui/extension/UIView";
import CodableExtension from "@/components/ui/extension/Codable";
import BasicNavigation from "@/components/ui/extension/BasicNavigation";
import LocalizeExtension from "@/components/ui/extension/Localize";
import SegmentControl from "@/components/ui/segment-control/SegmentControl";
import Toast from "@/components/ui/toast/Toast";
import SocialModernUIKit from "@/components/ui/social-modern-uikit/SocialModernUIKit";
import EcommerceUIKit from "@/components/ui/ecommerce-uikit/EcommerceUIKit";
import VisualDecorationUIKit from "@/components/ui/visual-decoration-uikit/VisualDecorationUIKit";
import CustomButton from "@/components/ui/custom-button/CustomButton";
import Pin from "@/components/ui/pin/Pin";

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
  media: <Media />,
  premium: <Premium />,
  "tab-bar": <TabBar />,
  spinner: <Spinner />,
  skeleton: <Skeleton />,
  carousel: <Carousel />,
  navbar: <Navbar />,
  "table-view": <TableView />,
  reaction: <Reaction />,
  // slider: <Slider />,
  // alert: <Alert />,
  card: <Card />,
  chart: <Chart />,
  dropdown: <Dropdown />,
  "radio-button": <RadioButton />,
  "message-alert": <MessageAlert />,
  rating: <Rating />,
  "scan-qr": <ScanQR />,
  "segment-control": <SegmentControl />,
  toast: <Toast />,
  "social-modern": <SocialModernUIKit />,
  "ecommerce-uikit": <EcommerceUIKit />,
  "visual-decoration-uikit": <VisualDecorationUIKit />,
  "ui-color": <UIColor />,
  "ui-font": <UIFontExtension />,
  "ui-view": <UIViewExtension />,
  "codable-helpers": <CodableExtension />,
  "basic-navigation": <BasicNavigation />,
  localize: <LocalizeExtension />,
  "custom-button": <CustomButton />,
  pin: <Pin />,
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease },
  },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease },
  },
};

export default function ComponentsPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const allItems = useMemo(
    () => [...componentItems, ...extensionItems, ...customItems],
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
          <AnimatePresence mode="wait">
            {activeId && componentViews[activeId] ? (
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.3, ease }}
                className="space-y-6"
              >
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
                    Live preview, usage patterns, and interaction details tuned
                    for iOS-style motion and touch targets.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease, delay: 0.1 }}
                  className="rounded-[28px] border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/80 p-8 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.4)]"
                >
                  {componentViews[activeId]}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="overview"
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                variants={stagger}
                className="space-y-8"
              >
                <motion.section
                  variants={fadeUp}
                  className="relative overflow-hidden rounded-[32px] border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/70 p-8 md:p-10"
                >
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
                          onClick={() =>
                            setActiveId(componentItems[0]?.id ?? null)
                          }
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
                </motion.section>

                <motion.section
                  variants={stagger}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                  {componentItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      variants={fadeScale}
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveId(item.id)}
                      className="group relative overflow-hidden rounded-[26px] border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/70 p-5 text-left shadow-[0_20px_50px_-42px_rgba(15,23,42,0.5)] transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
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
                    </motion.button>
                  ))}
                </motion.section>

                <motion.section variants={fadeUp} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                      Extension
                    </p>
                    <span className="text-xs text-neutral-500">
                      Swift helpers
                    </span>
                  </div>
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                  >
                    {extensionItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        variants={fadeScale}
                        whileHover={{
                          y: -4,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveId(item.id)}
                        className="group relative overflow-hidden rounded-[26px] border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/70 p-5 text-left shadow-[0_20px_50px_-42px_rgba(15,23,42,0.5)] transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
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
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.section>

                <motion.section variants={fadeUp} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                      Custom
                    </p>
                    <span className="text-xs text-neutral-500">
                      Build your own
                    </span>
                  </div>
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                  >
                    {customItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        variants={fadeScale}
                        whileHover={{
                          y: -4,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveId(item.id)}
                        className="group relative overflow-hidden rounded-[26px] border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/70 p-5 text-left shadow-[0_20px_50px_-42px_rgba(15,23,42,0.5)] transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/5 via-transparent to-violet-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative space-y-3">
                          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                            {item.name}
                          </h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Configure and generate custom components.
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-10 rounded-full bg-neutral-900 dark:bg-white" />
                            <span className="h-2 w-6 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="mt-16 border-t border-neutral-200/80 dark:border-neutral-800 pt-8 pb-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500">
              iOS Components
            </p>
            <p className="max-w-md text-sm text-neutral-500 dark:text-neutral-400">
              A curated collection of iOS-style UI components and Swift
              extensions — built for clarity, motion, and touch-first design.
            </p>
            <div className="flex items-center gap-6 text-xs text-neutral-400 dark:text-neutral-500">
              <span>{allItems.length} components</span>
              <span className="h-3 w-px bg-neutral-300 dark:bg-neutral-700" />
              <span>UIKit · Swift</span>
              <span className="h-3 w-px bg-neutral-300 dark:bg-neutral-700" />
              <span>&copy; {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
