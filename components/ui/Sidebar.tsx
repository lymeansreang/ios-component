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
  { name: "Tab Bar", id: "tab-bar" },
  { name: "Carousel", id: "carousel" },
  { name: "Navigation Bar", id: "navbar" },
  { name: "Table View", id: "table-view" },
  // { name: "Slider", id: "slider" },
  // { name: "Alert", id: "alert" },
  { name: "Card", id: "card" },
  { name: "Chart", id: "chart" },
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
        className={`fixed inset-y-0 left-0 z-50 w-72 shrink-0 overflow-y-auto border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 transition-transform md:static md:translate-x-0 md:w-64 md:h-full ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between md:block">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-4">
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
        <nav className="flex flex-col gap-1">
          {componentItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
