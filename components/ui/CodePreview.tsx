"use client";

import { useEffect, useState, type ReactNode } from "react";
import SwiftHighlighter from "@/components/ui/SwiftHighlighter";

interface CodePreviewProps {
  title: string;
  description?: string;
  preview: ReactNode;
  swiftCode: string;
  uikitCode?: string;
}

export default function CodePreview({
  title,
  description,
  preview,
  swiftCode,
  uikitCode,
}: CodePreviewProps) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"swiftui" | "uikit">("swiftui");

  const hasTabs = !!uikitCode;
  const displayedCode = activeTab === "uikit" && uikitCode ? uikitCode : swiftCode;

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ id: string }>;
      if (custom.detail?.id !== title) {
        setShowCode(false);
      }
    };
    window.addEventListener("codepreview:open", handler);
    return () => window.removeEventListener("codepreview:open", handler);
  }, [title]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <div className="p-5 border-b border-neutral-200 dark:border-neutral-800">
        <h3 className="font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-neutral-500 mt-1">{description}</p>
        )}
      </div>

      <div className="p-6 flex items-center justify-center bg-white dark:bg-neutral-950">
        <div className="relative mx-auto h-[500px] w-[370px] max-w-full rounded-[48px] border-[3px] border-neutral-800 dark:border-neutral-600 bg-neutral-900 p-[3px] shadow-[0_28px_70px_-28px_rgba(0,0,0,0.45)]">
          <div className="relative h-full overflow-hidden rounded-[44px] bg-white dark:bg-neutral-950 flex flex-col">
            <div className="absolute top-0 inset-x-0 flex justify-center pt-3 z-20 pointer-events-none">
              <div className="h-[24px] w-[96px] rounded-full bg-black" />
            </div>
            <div className="relative z-10 flex items-center justify-between px-8 pt-4 pb-1">
              <span className="text-[11px] font-semibold text-neutral-900 dark:text-white">
                9:41
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                LTE
              </span>
            </div>
            <div className="flex-1 overflow-auto px-4 pt-4 pb-3">
              <div className="flex min-h-full w-full items-center justify-center">
                {preview}
              </div>
            </div>
            <div className="flex justify-center pb-2.5 pt-1">
              <div className="h-[4px] w-[110px] rounded-full bg-neutral-300 dark:bg-neutral-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between px-4 py-2 bg-neutral-50 dark:bg-neutral-900">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const next = !showCode;
                setShowCode(next);
                if (next) {
                  window.dispatchEvent(
                    new CustomEvent("codepreview:open", { detail: { id: title } })
                  );
                }
              }}
              className="text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            >
              {showCode ? "Hide Code" : "Show Swift Code"}
            </button>
            {showCode && hasTabs && (
              <div className="flex items-center rounded-lg bg-neutral-200 dark:bg-neutral-800 p-0.5">
                <button
                  onClick={() => { setActiveTab("swiftui"); setCopied(false); }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    activeTab === "swiftui"
                      ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  }`}
                >
                  SwiftUI
                </button>
                <button
                  onClick={() => { setActiveTab("uikit"); setCopied(false); }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    activeTab === "uikit"
                      ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  }`}
                >
                  UIKit
                </button>
              </div>
            )}
          </div>
          {showCode && (
            <button
              onClick={handleCopy}
              className="text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              {copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          )}
        </div>
        {showCode && (
          <div className="max-h-80 overflow-auto" style={{ backgroundColor: "#1F1F24" }}>
            <pre className="p-4 text-sm leading-relaxed min-w-[640px]">
              <code><SwiftHighlighter code={displayedCode} /></code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
