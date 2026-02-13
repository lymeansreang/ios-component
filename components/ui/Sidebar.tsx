"use client";

import { useSidebarState } from "@/components/ui/sidebar-state";

export interface ComponentItem {
  name: string;
  id: string;
}

export const componentItems: ComponentItem[] = [
  { name: "Button", id: "button" },
  { name: "Bottom Sheet", id: "bottom-sheet" },
  { name: "Toggle", id: "toggle" },
  { name: "Text Field", id: "text-field" },
  { name: "Media", id: "media" },
  { name: "Premium", id: "premium" },
  { name: "Tab Bar", id: "tab-bar" },
  { name: "Spinner", id: "spinner" },
  { name: "Skeleton", id: "skeleton" },
  { name: "Carousel", id: "carousel" },
  { name: "Navigation Bar", id: "navbar" },
  { name: "Table View", id: "table-view" },
  { name: "Reaction", id: "reaction" },
  // { name: "Slider", id: "slider" },
  // { name: "Alert", id: "alert" },
  { name: "Card", id: "card" },
  { name: "Chart", id: "chart" },
  { name: "Dropdown", id: "dropdown" },
  { name: "Radio Button", id: "radio-button" },
  { name: "Message Alert", id: "message-alert" },
  { name: "Rating", id: "rating" },
  { name: "Scan QR", id: "scan-qr" },
  { name: "Segment Control", id: "segment-control" },
];

export const extensionItems: ComponentItem[] = [
  { name: "UIColor", id: "ui-color" },
  { name: "UIFont", id: "ui-font" },
  { name: "UIView", id: "ui-view" },
  { name: "Codable Helpers", id: "codable-helpers" },
  { name: "Basic Navigation", id: "basic-navigation" },
];

interface SidebarProps {
  activeId: string | null;
  onSelect: (id: string) => void;
}

export default function Sidebar({ activeId, onSelect }: SidebarProps) {
  const { isOpen, close } = useSidebarState();

  const handleSelect = (id: string) => {
    onSelect(id);
    close();
  };

  const renderNavItem = (item: ComponentItem, section: "C" | "E") => {
    const isActive = activeId === item.id;

    return (
      <button
        key={item.id}
        onClick={() => handleSelect(item.id)}
        className={`group relative w-full overflow-hidden rounded-xl border px-3 py-2.5 text-left text-sm transition-all duration-300 ${
          isActive
            ? "border-sky-300/90 dark:border-sky-500/60 bg-gradient-to-r from-sky-500/20 via-cyan-500/15 to-blue-500/10 text-sky-900 dark:text-sky-100 shadow-[0_10px_30px_-18px_rgba(14,165,233,0.9)] animate-[sidebar-select_0.35s_ease-out] motion-reduce:animate-none"
            : "border-transparent bg-white/65 dark:bg-neutral-900/65 text-neutral-700 dark:text-neutral-300 hover:-translate-y-0.5 hover:translate-x-1 hover:border-sky-200/80 dark:hover:border-sky-700/70 hover:bg-gradient-to-r hover:from-white hover:to-sky-50/70 dark:hover:from-neutral-900 dark:hover:to-sky-950/30 hover:text-neutral-900 dark:hover:text-white hover:shadow-[0_14px_34px_-28px_rgba(2,132,199,1)]"
        }`}
      >
        <span
          className={`pointer-events-none absolute inset-y-1 left-1 w-1 rounded-full transition-opacity duration-300 ${
            isActive
              ? "opacity-100 bg-gradient-to-b from-sky-400 to-cyan-500"
              : "opacity-0 group-hover:opacity-100 bg-gradient-to-b from-sky-300/70 to-cyan-400/70"
          }`}
        />
        <span
          className={`pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full blur-xl transition-opacity duration-300 ${
            isActive
              ? "opacity-100 bg-sky-400/25 dark:bg-sky-500/20"
              : "opacity-0 group-hover:opacity-100 bg-sky-300/20 dark:bg-sky-700/20"
          }`}
        />
        <span className="relative flex items-center justify-between gap-3 pl-2">
          <span className="font-medium tracking-[0.01em]">{item.name}</span>
          <span
            className={`inline-flex min-w-9 items-center justify-center rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] transition-colors ${
              isActive
                ? "border-sky-300/80 dark:border-sky-500/60 bg-white/65 dark:bg-sky-950/60 text-sky-700 dark:text-sky-200"
                : "border-neutral-200/90 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 group-hover:border-sky-200 dark:group-hover:border-sky-700 group-hover:text-sky-700 dark:group-hover:text-sky-300"
            }`}
          >
            {section}
          </span>
        </span>
      </button>
    );
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 shrink-0 overflow-y-auto border-r border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-white via-neutral-50 to-sky-50/35 dark:from-neutral-950 dark:via-neutral-900 dark:to-sky-950/20 p-4 transition-transform md:static md:translate-x-0 md:w-64 md:h-full ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pointer-events-none absolute inset-x-4 top-3 h-24 rounded-2xl bg-gradient-to-r from-sky-100/60 via-transparent to-cyan-100/50 blur-2xl dark:from-sky-900/20 dark:to-cyan-900/20" />
        <div className="flex items-center justify-between md:block">
          <h2 className="relative text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500 mb-4">
            Components
          </h2>
          <button
            type="button"
            onClick={close}
            className="md:hidden mb-4 h-8 w-8 rounded-full border border-neutral-300/80 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <nav className="relative space-y-6">
          <div className="space-y-1">
            {componentItems.map((item) => renderNavItem(item, "C"))}
          </div>
          <div className="space-y-2">
            <h2 className="px-3 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
              Extension
            </h2>
            <div className="space-y-1">
              {extensionItems.map((item) => renderNavItem(item, "E"))}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
