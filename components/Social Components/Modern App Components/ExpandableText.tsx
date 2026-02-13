"use client";

import { useMemo, useState } from "react";

export interface ExpandableTextProps {
  text: string;
  limit?: number;
}

export default function ExpandableText({ text, limit = 120 }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const short = useMemo(
    () => (text.length > limit ? `${text.slice(0, limit).trimEnd()}...` : text),
    [text, limit]
  );

  const needsExpand = text.length > limit;

  return (
    <p className="max-w-md text-sm text-neutral-700 dark:text-neutral-300">
      {expanded ? text : short}{" "}
      {needsExpand && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="font-semibold text-blue-600 dark:text-blue-400"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </p>
  );
}
