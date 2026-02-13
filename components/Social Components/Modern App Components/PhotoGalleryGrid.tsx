"use client";

import { useState } from "react";

export interface PhotoGalleryGridProps {
  photos?: string[];
}

export default function PhotoGalleryGrid({
  photos = ["/globe.svg", "/next.svg", "/vercel.svg", "/file.svg", "/window.svg", "/next.svg"],
}: PhotoGalleryGridProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full max-w-md">
      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo, index) => (
          <button
            key={`${photo}-${index}`}
            type="button"
            onClick={() => setSelected(photo)}
            className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800"
          >
            <img src={photo} alt={`Photo ${index + 1}`} className="h-24 w-full object-cover" />
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white dark:bg-neutral-900">
            <img src={selected} alt="Selected" className="h-[60vh] w-full object-contain" />
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-2 top-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
