"use client";

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
  return (
    <aside className="w-64 h-full shrink-0 overflow-y-auto border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-4">
        Components
      </h2>
      <nav className="flex flex-col gap-1">
        {componentItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
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
  );
}
