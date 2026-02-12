"use client";

import { usePathname } from "next/navigation";
import { useSidebarState } from "@/components/ui/sidebar-state";

export default function SidebarToggle() {
  const pathname = usePathname();
  const { toggle } = useSidebarState();

  if (!pathname.startsWith("/components")) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle sidebar"
      className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300/80 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    >
      <span className="h-4 w-4">
        <span className="block h-0.5 w-4 rounded-full bg-current" />
        <span className="mt-1 block h-0.5 w-4 rounded-full bg-current" />
        <span className="mt-1 block h-0.5 w-4 rounded-full bg-current" />
      </span>
    </button>
  );
}
