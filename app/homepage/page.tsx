import Link from "next/link";
import { Fraunces, Space_Grotesk } from "next/font/google";

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

const componentHighlights = [
  {
    name: "Button",
    description: "Tactile, haptic-ready styles with clear hierarchy.",
    accent: "from-emerald-400/20 to-emerald-500/5",
  },
  {
    name: "Toggle",
    description: "Fluid, iOS-inspired switch interactions.",
    accent: "from-amber-400/25 to-amber-500/10",
  },
  {
    name: "Tabs",
    description: "Segmented controls tuned for touch and glance.",
    accent: "from-sky-400/25 to-sky-500/10",
  },
  {
    name: "Sheet",
    description: "Bottom sheets with depth, blur, and motion cues.",
    accent: "from-rose-400/25 to-rose-500/10",
  },
  {
    name: "Slider",
    description: "Precision input with native-feel thumb physics.",
    accent: "from-orange-400/25 to-orange-500/10",
  },
  {
    name: "Alert",
    description: "Focus-first dialogs with accessible contrast.",
    accent: "from-teal-400/25 to-teal-500/10",
  },
];

const buildSteps = [
  {
    title: "Pick a component",
    body: "Start from iOS patterns and adjust only what you need.",
  },
  {
    title: "Preview the motion",
    body: "Inspect gestures, springs, and tap targets in real time.",
  },
  {
    title: "Ship with confidence",
    body: "Tailwind + React, tested for touch-first ergonomics.",
  },
];

export default function Homepage() {
  return (
    <div className={`${copy.variable} ${display.variable} space-y-16`}>
      <section className="scroll-reveal relative overflow-hidden rounded-[32px] border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/70 p-10 md:p-14">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.35)_0%,_rgba(16,185,129,0)_70%)] blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(14,165,233,0.3)_0%,_rgba(14,165,233,0)_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] [background-size:28px_28px] opacity-20 dark:opacity-10" />

        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              iOS-first UI kit
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-neutral-900 dark:text-white font-semibold"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Interfaces that feel native, without feeling generic.
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl">
              A curated set of tactile, iOS-style components built for modern React apps. Preview every detail, then drop them into production with confidence.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/components"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white px-6 py-3 text-sm font-semibold tracking-wide hover:bg-neutral-800 transition-colors"
              >
                Browse Components
              </Link>
              <Link
                href="/components"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-300 dark:border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
              >
                See live previews
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="space-y-1">
                <p className="text-2xl font-semibold text-neutral-900 dark:text-white">24+</p>
                <p>Components in active rotation</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-semibold text-neutral-900 dark:text-white">3</p>
                <p>Theme-ready palettes</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-semibold text-neutral-900 dark:text-white">Tailwind</p>
                <p>Designed for rapid iteration</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 h-40 w-40 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-700 opacity-90 shadow-xl" />
            <div className="absolute -bottom-8 right-2 h-44 w-44 rounded-3xl bg-gradient-to-br from-emerald-400/80 to-teal-500/60 shadow-2xl" />
            <div className="relative rounded-[28px] border border-neutral-200/70 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/80 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]">
              <div className="border-b border-neutral-200/60 dark:border-neutral-800 px-6 py-4 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-auto text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  Component preview
                </span>
              </div>
              <div className="p-6 space-y-5">
                <div className="rounded-2xl bg-neutral-900 text-white p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                      Focus mode
                    </p>
                    <p className="text-lg font-semibold">Do Not Disturb</p>
                  </div>
                  <span className="h-10 w-16 rounded-full bg-neutral-700 flex items-center">
                    <span className="h-8 w-8 rounded-full bg-white ml-2 shadow" />
                  </span>
                </div>
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Volume</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      70%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-100 dark:bg-neutral-800">
                    <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" />
                  </div>
                </div>
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                      Handoff enabled
                    </p>
                    <p className="text-xs text-neutral-500">
                      Continue on nearby devices
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-reveal grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <h2
            className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Designed for feel and flow.
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-300">
            Each component is tuned for touch-first products, balancing clarity, motion, and depth so your UI feels at home on iOS.
          </p>
          <div className="grid gap-3">
            {buildSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/70 p-4"
              >
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {step.title}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {componentHighlights.map((item) => (
            <div
              key={item.name}
              className="group relative overflow-hidden rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 p-5 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.5)]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {item.name}
                  </p>
                  <span className="text-xs text-neutral-400">Preview</span>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {item.description}
                </p>
                <div className="h-2 rounded-full bg-neutral-100 dark:bg-neutral-800">
                  <div className="h-2 w-3/5 rounded-full bg-neutral-900 dark:bg-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="scroll-reveal grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-900 text-white p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            Toolkit
          </p>
          <p className="text-2xl font-semibold mt-3">Production-ready defaults</p>
          <p className="text-sm text-neutral-300 mt-4">
            Accessible contrast, comfortable spacing, and kinetic motion baked in.
          </p>
        </div>
        <div className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            System
          </p>
          <p className="text-2xl font-semibold mt-3 text-neutral-900 dark:text-white">
            iOS-informed scale
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
            Built to match the proportions and rhythm your users already expect.
          </p>
        </div>
        <div className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Velocity
          </p>
          <p className="text-2xl font-semibold mt-3 text-neutral-900 dark:text-white">
            Tailwind native
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
            Iterate fast with composable utility classes and clean React APIs.
          </p>
        </div>
      </section>
    </div>
  );
}
