export default function ComponentsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-9 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
      <div className="h-5 w-80 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-xl bg-neutral-200 dark:bg-neutral-800"
          />
        ))}
      </div>
    </div>
  );
}
