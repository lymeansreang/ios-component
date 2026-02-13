"use client";

import { useEffect, useState } from "react";

export interface ImprovedImageCarouselProps {
  images?: string[];
  autoPlayMs?: number;
}

export default function ImprovedImageCarousel({
  images = ["/globe.svg", "/next.svg", "/vercel.svg"],
  autoPlayMs = 3000,
}: ImprovedImageCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, autoPlayMs);
    return () => window.clearInterval(id);
  }, [autoPlayMs, images.length]);

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <img
          src={images[index]}
          alt={`Slide ${index + 1}`}
          className="h-52 w-full object-cover"
        />
        <button
          type="button"
          onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/45 px-2 py-1 text-xs text-white"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => setIndex((prev) => (prev + 1) % images.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/45 px-2 py-1 text-xs text-white"
        >
          Next
        </button>
      </div>
      <div className="flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all ${i === index ? "w-6 bg-blue-500" : "w-2.5 bg-neutral-300 dark:bg-neutral-700"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
