export default function HomepageLoading() {
  return (
    <div className="space-y-12 animate-pulse">
      <div className="space-y-4">
        <div className="h-10 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
        <div className="h-5 w-96 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
        <div className="h-10 w-44 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-2xl bg-neutral-200 dark:bg-neutral-800"
          />
        ))}
      </div>
    </div>
  );
}
