export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <main>{children}</main>
      <footer className="mt-16">
        <div className="relative overflow-hidden rounded-[28px] border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/70 px-6 py-8">
          <div className="absolute -top-20 -left-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.35)_0%,_rgba(56,189,248,0)_70%)] blur-3xl" />
          <div className="absolute -bottom-20 -right-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.35)_0%,_rgba(16,185,129,0)_70%)] blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] [background-size:26px_26px] opacity-20 dark:opacity-10" />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
                Crafted in 2026
              </p>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">
                Powered by Anukwat Technology Cambodia
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Shaping tactile, modern iOS interfaces with care and precision.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-300/80 dark:border-neutral-700 px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-200">
                iOS-first
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-4 py-2 text-xs font-semibold">
                Anukwat 2026
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
