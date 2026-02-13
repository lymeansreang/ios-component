"use client";

import { useState, useEffect } from "react";
import CodePreview from "@/components/ui/CodePreview";

/* ------------------------------------------------------------------ */
/*  Shared QR code SVG                                                 */
/* ------------------------------------------------------------------ */

function QRCodeSVG({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 29 29" className={className} shapeRendering="crispEdges">
      <rect width="29" height="29" fill="white" />
      {/* Position patterns (top-left, top-right, bottom-left) */}
      <rect x="1" y="1" width="7" height="7" fill="black" />
      <rect x="2" y="2" width="5" height="5" fill="white" />
      <rect x="3" y="3" width="3" height="3" fill="black" />
      <rect x="21" y="1" width="7" height="7" fill="black" />
      <rect x="22" y="2" width="5" height="5" fill="white" />
      <rect x="23" y="3" width="3" height="3" fill="black" />
      <rect x="1" y="21" width="7" height="7" fill="black" />
      <rect x="2" y="22" width="5" height="5" fill="white" />
      <rect x="3" y="23" width="3" height="3" fill="black" />
      {/* Timing patterns */}
      <rect x="9" y="7" width="1" height="1" fill="black" />
      <rect x="11" y="7" width="1" height="1" fill="black" />
      <rect x="13" y="7" width="1" height="1" fill="black" />
      <rect x="7" y="9" width="1" height="1" fill="black" />
      <rect x="7" y="11" width="1" height="1" fill="black" />
      <rect x="7" y="13" width="1" height="1" fill="black" />
      {/* Data modules */}
      <rect x="9" y="1" width="1" height="1" fill="black" />
      <rect x="10" y="2" width="1" height="1" fill="black" />
      <rect x="11" y="1" width="2" height="1" fill="black" />
      <rect x="14" y="2" width="1" height="1" fill="black" />
      <rect x="16" y="1" width="1" height="1" fill="black" />
      <rect x="18" y="2" width="2" height="1" fill="black" />
      <rect x="9" y="3" width="1" height="1" fill="black" />
      <rect x="12" y="4" width="2" height="1" fill="black" />
      <rect x="15" y="3" width="1" height="2" fill="black" />
      <rect x="17" y="4" width="1" height="1" fill="black" />
      <rect x="10" y="5" width="1" height="1" fill="black" />
      <rect x="13" y="5" width="1" height="1" fill="black" />
      <rect x="16" y="6" width="1" height="1" fill="black" />
      <rect x="19" y="5" width="1" height="1" fill="black" />
      {/* More data */}
      <rect x="1" y="9" width="1" height="1" fill="black" />
      <rect x="3" y="10" width="1" height="1" fill="black" />
      <rect x="5" y="9" width="1" height="2" fill="black" />
      <rect x="1" y="12" width="2" height="1" fill="black" />
      <rect x="4" y="11" width="1" height="1" fill="black" />
      <rect x="9" y="9" width="2" height="1" fill="black" />
      <rect x="12" y="10" width="1" height="1" fill="black" />
      <rect x="14" y="9" width="1" height="2" fill="black" />
      <rect x="16" y="10" width="2" height="1" fill="black" />
      <rect x="19" y="9" width="1" height="1" fill="black" />
      <rect x="21" y="10" width="1" height="1" fill="black" />
      <rect x="23" y="9" width="2" height="1" fill="black" />
      <rect x="26" y="10" width="1" height="1" fill="black" />
      <rect x="10" y="12" width="1" height="1" fill="black" />
      <rect x="13" y="11" width="1" height="2" fill="black" />
      <rect x="15" y="12" width="2" height="1" fill="black" />
      <rect x="19" y="11" width="1" height="1" fill="black" />
      <rect x="22" y="12" width="1" height="1" fill="black" />
      <rect x="25" y="11" width="1" height="2" fill="black" />
      <rect x="27" y="12" width="1" height="1" fill="black" />
      {/* Bottom section */}
      <rect x="9" y="14" width="1" height="1" fill="black" />
      <rect x="11" y="15" width="2" height="1" fill="black" />
      <rect x="14" y="14" width="1" height="1" fill="black" />
      <rect x="17" y="15" width="1" height="1" fill="black" />
      <rect x="19" y="14" width="1" height="2" fill="black" />
      <rect x="9" y="17" width="1" height="1" fill="black" />
      <rect x="12" y="16" width="1" height="1" fill="black" />
      <rect x="15" y="17" width="1" height="1" fill="black" />
      <rect x="18" y="16" width="1" height="1" fill="black" />
      <rect x="21" y="15" width="1" height="1" fill="black" />
      <rect x="24" y="16" width="2" height="1" fill="black" />
      <rect x="27" y="15" width="1" height="1" fill="black" />
      <rect x="10" y="18" width="1" height="1" fill="black" />
      <rect x="13" y="19" width="2" height="1" fill="black" />
      <rect x="16" y="18" width="1" height="1" fill="black" />
      <rect x="9" y="21" width="1" height="1" fill="black" />
      <rect x="11" y="22" width="2" height="1" fill="black" />
      <rect x="14" y="21" width="1" height="2" fill="black" />
      <rect x="17" y="22" width="1" height="1" fill="black" />
      <rect x="10" y="24" width="1" height="1" fill="black" />
      <rect x="13" y="23" width="1" height="1" fill="black" />
      <rect x="16" y="24" width="1" height="1" fill="black" />
      <rect x="18" y="23" width="1" height="2" fill="black" />
      <rect x="21" y="21" width="1" height="1" fill="black" />
      <rect x="23" y="22" width="1" height="1" fill="black" />
      <rect x="25" y="21" width="2" height="1" fill="black" />
      <rect x="22" y="24" width="1" height="1" fill="black" />
      <rect x="24" y="23" width="1" height="1" fill="black" />
      <rect x="27" y="24" width="1" height="1" fill="black" />
      <rect x="9" y="25" width="1" height="1" fill="black" />
      <rect x="12" y="26" width="2" height="1" fill="black" />
      <rect x="15" y="25" width="1" height="1" fill="black" />
      <rect x="18" y="26" width="1" height="1" fill="black" />
      <rect x="21" y="25" width="1" height="2" fill="black" />
      <rect x="24" y="26" width="1" height="1" fill="black" />
      <rect x="26" y="27" width="1" height="1" fill="black" />
      <rect x="11" y="27" width="1" height="1" fill="black" />
      <rect x="14" y="27" width="2" height="1" fill="black" />
      <rect x="17" y="27" width="1" height="1" fill="black" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Scanner corner brackets                                            */
/* ------------------------------------------------------------------ */

function ScannerCorners({ size = 200, color = "white", strokeWidth = 3, cornerLength = 24 }: { size?: number; color?: string; strokeWidth?: number; cornerLength?: number }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className="absolute inset-0">
      {/* Top-left */}
      <path d={`M${cornerLength} ${strokeWidth / 2}H${strokeWidth / 2}V${cornerLength}`} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Top-right */}
      <path d={`M${size - cornerLength} ${strokeWidth / 2}H${size - strokeWidth / 2}V${cornerLength}`} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Bottom-left */}
      <path d={`M${cornerLength} ${size - strokeWidth / 2}H${strokeWidth / 2}V${size - cornerLength}`} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Bottom-right */}
      <path d={`M${size - cornerLength} ${size - strokeWidth / 2}H${size - strokeWidth / 2}V${size - cornerLength}`} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Preview components                                                 */
/* ------------------------------------------------------------------ */

function DefaultScannerPreview() {
  const [scanning, setScanning] = useState(true);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (scanned) {
      const timer = setTimeout(() => { setScanned(false); setScanning(true); }, 3000);
      return () => clearTimeout(timer);
    }
  }, [scanned]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-[220px] h-[220px] rounded-2xl bg-neutral-900 overflow-hidden flex items-center justify-center">
        {/* Simulated camera background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950" />

        {/* Scanner frame */}
        <div className="relative w-[160px] h-[160px]">
          <ScannerCorners size={160} color="#3b82f6" strokeWidth={3} cornerLength={20} />

          {/* Scan line animation */}
          {scanning && !scanned && (
            <div className="absolute inset-x-2 h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-[scan-line_2s_ease-in-out_infinite]" />
          )}

          {/* QR placeholder */}
          <div className="absolute inset-4 flex items-center justify-center opacity-20">
            <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h4v4H4V4zm12 0h4v4h-4V4zM4 16h4v4H4v-4zm14 2h2m-2-2h2m-6 2h2m-2-2h2m-6-6h2m-2-2h2m6 2h2m-2-2h2" />
            </svg>
          </div>
        </div>

        {/* Scanned overlay */}
        {scanned && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center animate-in fade-in duration-200">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white text-sm font-medium">QR Code Detected</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => { setScanning(false); setScanned(true); }}
          className="px-4 py-2 rounded-xl bg-blue-500 text-white text-xs font-medium active:scale-95 transition-transform"
        >
          Simulate Scan
        </button>
        <button
          onClick={() => { setScanning(true); setScanned(false); }}
          className="px-4 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs font-medium active:scale-95 transition-transform"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function CardScannerPreview() {
  const [scanned, setScanned] = useState(false);

  return (
    <div className="w-72">
      <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-lg">
        {/* Header */}
        <div className="px-5 pt-5 pb-3 text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Scan QR Code</h3>
          <p className="text-xs text-neutral-500 mt-0.5">Point your camera at a QR code</p>
        </div>

        {/* Scanner area */}
        <div className="mx-5 mb-4 relative aspect-square rounded-xl bg-neutral-900 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950" />
          <div className="relative w-[75%] aspect-square">
            <ScannerCorners size={160} color={scanned ? "#22c55e" : "#3b82f6"} strokeWidth={3} cornerLength={20} />
            {!scanned && (
              <div className="absolute inset-x-2 h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-[scan-line_2s_ease-in-out_infinite]" />
            )}
            {scanned && (
              <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Result / Action */}
        <div className="px-5 pb-5">
          {scanned ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30">
              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" />
              </svg>
              <span className="text-xs text-green-700 dark:text-green-300 font-medium truncate">https://example.com/invite</span>
            </div>
          ) : (
            <p className="text-xs text-neutral-400 text-center">Scanning...</p>
          )}
          <button
            onClick={() => setScanned(!scanned)}
            className="w-full mt-3 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 active:scale-[0.98] transition-all"
          >
            {scanned ? "Scan Again" : "Simulate Scan"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FullscreenScannerPreview() {
  const [scanning, setScanning] = useState(true);

  return (
    <div className="relative w-72 h-[400px] rounded-2xl overflow-hidden bg-neutral-950 shadow-xl">
      {/* Simulated camera */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-4">
        <button className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <span className="text-white text-sm font-medium">Scan QR Code</span>
        <button className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        </button>
      </div>

      {/* Scanner frame center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[180px] h-[180px]">
          <ScannerCorners size={180} color="white" strokeWidth={3} cornerLength={28} />
          {scanning && (
            <div className="absolute inset-x-2 h-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)] animate-[scan-line_2s_ease-in-out_infinite]" />
          )}
        </div>
      </div>

      {/* Bottom instruction */}
      <div className="absolute bottom-0 inset-x-0 z-10 pb-6 pt-12 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-white/70 text-xs text-center mb-4">Align QR code within the frame</p>
        <div className="flex justify-center gap-6">
          <button className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5" />
              </svg>
            </div>
            <span className="text-[10px] text-white/60">Gallery</span>
          </button>
          <button onClick={() => setScanning(!scanning)} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <span className="text-[10px] text-white/60">Flash</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
            </div>
            <span className="text-[10px] text-white/60">Flip</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function QRDisplayPreview() {
  return (
    <div className="w-72 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg overflow-hidden">
      <div className="p-6 flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center mb-3">
          <svg className="w-7 h-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-neutral-900 dark:text-white">My QR Code</h3>
        <p className="text-xs text-neutral-500 mt-0.5">Share to connect with others</p>

        <div className="mt-5 p-4 rounded-2xl bg-white border border-neutral-100 shadow-sm">
          <QRCodeSVG size={140} />
        </div>

        <p className="mt-3 text-xs text-neutral-400 font-mono">@johndoe</p>
      </div>

      <div className="flex border-t border-neutral-200 dark:border-neutral-700">
        <button className="flex-1 py-3 text-sm font-medium text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors flex items-center justify-center gap-2 border-r border-neutral-200 dark:border-neutral-700">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
        <button className="flex-1 py-3 text-sm font-medium text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Save
        </button>
      </div>
    </div>
  );
}

function MinimalScannerPreview() {
  const [scanned, setScanned] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative w-48 h-48 rounded-3xl overflow-hidden cursor-pointer"
        onClick={() => setScanned(!scanned)}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-600" />

        {/* Inner scanner */}
        <div className="absolute inset-3 rounded-2xl bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="relative w-[110px] h-[110px]">
            <ScannerCorners size={110} color="rgba(255,255,255,0.8)" strokeWidth={2.5} cornerLength={16} />
            {!scanned && (
              <div className="absolute inset-x-1 h-[1px] bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.4)] animate-[scan-line_2s_ease-in-out_infinite]" />
            )}
            {scanned && (
              <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in-95 duration-200">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-neutral-500">{scanned ? "Tap to scan again" : "Tap to simulate scan"}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Style definitions                                                  */
/* ------------------------------------------------------------------ */

const scanStyles = [
  {
    title: "Default Scanner",
    description: "Standard QR scanner with animated scan line and detection feedback.",
    preview: <DefaultScannerPreview />,
    swiftCode: `import UIKit
import AVFoundation

class QRScannerViewController: UIViewController, AVCaptureMetadataOutputObjectsDelegate {

    private var captureSession: AVCaptureSession!
    private var previewLayer: AVCaptureVideoPreviewLayer!

    private let frameView: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let scanLineView: UIView = {
        let view = UIView()
        view.backgroundColor = .systemBlue
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private var scanLineTopConstraint: NSLayoutConstraint!

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .black
        setupCamera()
        setupOverlay()
        startScanLineAnimation()
    }

    private func setupCamera() {
        captureSession = AVCaptureSession()

        guard let videoCaptureDevice = AVCaptureDevice.default(for: .video),
              let videoInput = try? AVCaptureDeviceInput(device: videoCaptureDevice),
              captureSession.canAddInput(videoInput) else { return }

        captureSession.addInput(videoInput)

        let metadataOutput = AVCaptureMetadataOutput()
        guard captureSession.canAddOutput(metadataOutput) else { return }

        captureSession.addOutput(metadataOutput)
        metadataOutput.setMetadataObjectsDelegate(self, queue: .main)
        metadataOutput.metadataObjectTypes = [.qr]

        previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        previewLayer.frame = view.layer.bounds
        previewLayer.videoGravity = .resizeAspectFill
        view.layer.addSublayer(previewLayer)

        DispatchQueue.global(qos: .userInitiated).async {
            self.captureSession.startRunning()
        }
    }

    private func setupOverlay() {
        view.addSubview(frameView)
        frameView.addSubview(scanLineView)

        NSLayoutConstraint.activate([
            frameView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            frameView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            frameView.widthAnchor.constraint(equalToConstant: 250),
            frameView.heightAnchor.constraint(equalToConstant: 250),

            scanLineView.leadingAnchor.constraint(equalTo: frameView.leadingAnchor, constant: 4),
            scanLineView.trailingAnchor.constraint(equalTo: frameView.trailingAnchor, constant: -4),
            scanLineView.heightAnchor.constraint(equalToConstant: 2),
        ])

        scanLineTopConstraint = scanLineView.topAnchor.constraint(equalTo: frameView.topAnchor)
        scanLineTopConstraint.isActive = true

        drawCorners(on: frameView, color: .systemBlue, length: 30, lineWidth: 3)
    }

    private func drawCorners(on view: UIView, color: UIColor, length: CGFloat, lineWidth: CGFloat) {
        let layer = CAShapeLayer()
        let path = UIBezierPath()
        let s = view.bounds.isEmpty ? CGSize(width: 250, height: 250) : view.bounds.size

        // Top-left
        path.move(to: CGPoint(x: 0, y: length))
        path.addLine(to: .zero)
        path.addLine(to: CGPoint(x: length, y: 0))
        // Top-right
        path.move(to: CGPoint(x: s.width - length, y: 0))
        path.addLine(to: CGPoint(x: s.width, y: 0))
        path.addLine(to: CGPoint(x: s.width, y: length))
        // Bottom-left
        path.move(to: CGPoint(x: 0, y: s.height - length))
        path.addLine(to: CGPoint(x: 0, y: s.height))
        path.addLine(to: CGPoint(x: length, y: s.height))
        // Bottom-right
        path.move(to: CGPoint(x: s.width - length, y: s.height))
        path.addLine(to: CGPoint(x: s.width, y: s.height))
        path.addLine(to: CGPoint(x: s.width, y: s.height - length))

        layer.path = path.cgPath
        layer.strokeColor = color.cgColor
        layer.fillColor = UIColor.clear.cgColor
        layer.lineWidth = lineWidth
        layer.lineCap = .round
        view.layer.addSublayer(layer)
    }

    private func startScanLineAnimation() {
        UIView.animate(withDuration: 2.0, delay: 0, options: [.repeat, .autoreverse, .curveEaseInOut]) {
            self.scanLineTopConstraint.constant = 246
            self.view.layoutIfNeeded()
        }
    }

    func metadataOutput(_ output: AVCaptureMetadataOutput, didOutput metadataObjects: [AVMetadataObject], from connection: AVCaptureConnection) {
        guard let object = metadataObjects.first as? AVMetadataMachineReadableCodeObject,
              object.type == .qr,
              let value = object.stringValue else { return }

        captureSession.stopRunning()
        AudioServicesPlaySystemSound(SystemSoundID(kSystemSoundID_Vibrate))
        found(code: value)
    }

    private func found(code: String) {
        print("QR Code: \\(code)")
        // Handle scanned result
    }
}

// MARK: - Usage
// let scanner = QRScannerViewController()
// navigationController?.pushViewController(scanner, animated: true)
`,
  },
  {
    title: "Card Scanner",
    description: "Compact scanner card with result display and action button.",
    preview: <CardScannerPreview />,
    swiftCode: `import UIKit
import AVFoundation

class CardScannerView: UIView, AVCaptureMetadataOutputObjectsDelegate {

    private var captureSession: AVCaptureSession?
    private var previewLayer: AVCaptureVideoPreviewLayer?

    private let headerLabel: UILabel = {
        let l = UILabel()
        l.text = "Scan QR Code"
        l.font = .systemFont(ofSize: 15, weight: .semibold)
        l.textAlignment = .center
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let subtitleLabel: UILabel = {
        let l = UILabel()
        l.text = "Point your camera at a QR code"
        l.font = .systemFont(ofSize: 12)
        l.textColor = .secondaryLabel
        l.textAlignment = .center
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let cameraContainer: UIView = {
        let view = UIView()
        view.backgroundColor = .black
        view.layer.cornerRadius = 12
        view.clipsToBounds = true
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let resultLabel: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 12, weight: .medium)
        l.textColor = .systemGreen
        l.textAlignment = .center
        l.numberOfLines = 1
        l.lineBreakMode = .byTruncatingMiddle
        l.isHidden = true
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let resultContainer: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.systemGreen.withAlphaComponent(0.1)
        view.layer.cornerRadius = 12
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.systemGreen.withAlphaComponent(0.3).cgColor
        view.isHidden = true
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    var onScanned: ((String) -> Void)?

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        backgroundColor = .systemBackground
        layer.cornerRadius = 16
        layer.borderWidth = 1
        layer.borderColor = UIColor.separator.cgColor

        addSubview(headerLabel)
        addSubview(subtitleLabel)
        addSubview(cameraContainer)
        addSubview(resultContainer)
        resultContainer.addSubview(resultLabel)

        NSLayoutConstraint.activate([
            headerLabel.topAnchor.constraint(equalTo: topAnchor, constant: 20),
            headerLabel.centerXAnchor.constraint(equalTo: centerXAnchor),

            subtitleLabel.topAnchor.constraint(equalTo: headerLabel.bottomAnchor, constant: 4),
            subtitleLabel.centerXAnchor.constraint(equalTo: centerXAnchor),

            cameraContainer.topAnchor.constraint(equalTo: subtitleLabel.bottomAnchor, constant: 16),
            cameraContainer.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 20),
            cameraContainer.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -20),
            cameraContainer.heightAnchor.constraint(equalTo: cameraContainer.widthAnchor),

            resultContainer.topAnchor.constraint(equalTo: cameraContainer.bottomAnchor, constant: 16),
            resultContainer.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 20),
            resultContainer.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -20),
            resultContainer.heightAnchor.constraint(equalToConstant: 44),
            resultContainer.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -20),

            resultLabel.leadingAnchor.constraint(equalTo: resultContainer.leadingAnchor, constant: 12),
            resultLabel.trailingAnchor.constraint(equalTo: resultContainer.trailingAnchor, constant: -12),
            resultLabel.centerYAnchor.constraint(equalTo: resultContainer.centerYAnchor),
        ])

        setupCamera()
    }

    private func setupCamera() {
        captureSession = AVCaptureSession()
        guard let session = captureSession,
              let device = AVCaptureDevice.default(for: .video),
              let input = try? AVCaptureDeviceInput(device: device),
              session.canAddInput(input) else { return }

        session.addInput(input)

        let output = AVCaptureMetadataOutput()
        guard session.canAddOutput(output) else { return }
        session.addOutput(output)
        output.setMetadataObjectsDelegate(self, queue: .main)
        output.metadataObjectTypes = [.qr]

        previewLayer = AVCaptureVideoPreviewLayer(session: session)
        previewLayer?.videoGravity = .resizeAspectFill
        previewLayer?.frame = cameraContainer.bounds
        if let layer = previewLayer {
            cameraContainer.layer.addSublayer(layer)
        }

        DispatchQueue.global(qos: .userInitiated).async {
            session.startRunning()
        }
    }

    func metadataOutput(_ output: AVCaptureMetadataOutput, didOutput metadataObjects: [AVMetadataObject], from connection: AVCaptureConnection) {
        guard let object = metadataObjects.first as? AVMetadataMachineReadableCodeObject,
              let value = object.stringValue else { return }

        captureSession?.stopRunning()
        resultLabel.text = value
        resultLabel.isHidden = false
        resultContainer.isHidden = false
        onScanned?(value)
    }
}

// MARK: - Usage
// let card = CardScannerView()
// view.addSubview(card)
// card.translatesAutoresizingMaskIntoConstraints = false
// card.onScanned = { code in print("Scanned: \\(code)") }
`,
  },
  {
    title: "Fullscreen Scanner",
    description: "Immersive full-screen scanner with toolbar and flash toggle.",
    preview: <FullscreenScannerPreview />,
    swiftCode: `import UIKit
import AVFoundation

class FullscreenScannerViewController: UIViewController, AVCaptureMetadataOutputObjectsDelegate {

    private var captureSession: AVCaptureSession!
    private var previewLayer: AVCaptureVideoPreviewLayer!
    private var isFlashOn = false

    private let closeButton: UIButton = {
        let button = UIButton(type: .system)
        let config = UIImage.SymbolConfiguration(pointSize: 16, weight: .medium)
        button.setImage(UIImage(systemName: "xmark", withConfiguration: config), for: .normal)
        button.tintColor = .white
        button.backgroundColor = UIColor.white.withAlphaComponent(0.1)
        button.layer.cornerRadius = 18
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private let titleLabel: UILabel = {
        let l = UILabel()
        l.text = "Scan QR Code"
        l.font = .systemFont(ofSize: 16, weight: .medium)
        l.textColor = .white
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let flashButton: UIButton = {
        let button = UIButton(type: .system)
        let config = UIImage.SymbolConfiguration(pointSize: 16, weight: .medium)
        button.setImage(UIImage(systemName: "bolt", withConfiguration: config), for: .normal)
        button.tintColor = .white
        button.backgroundColor = UIColor.white.withAlphaComponent(0.1)
        button.layer.cornerRadius = 18
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private let instructionLabel: UILabel = {
        let l = UILabel()
        l.text = "Align QR code within the frame"
        l.font = .systemFont(ofSize: 13)
        l.textColor = UIColor.white.withAlphaComponent(0.7)
        l.textAlignment = .center
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        setupCamera()
        setupUI()
    }

    private func setupCamera() {
        captureSession = AVCaptureSession()
        guard let device = AVCaptureDevice.default(for: .video),
              let input = try? AVCaptureDeviceInput(device: device),
              captureSession.canAddInput(input) else { return }

        captureSession.addInput(input)

        let output = AVCaptureMetadataOutput()
        guard captureSession.canAddOutput(output) else { return }
        captureSession.addOutput(output)
        output.setMetadataObjectsDelegate(self, queue: .main)
        output.metadataObjectTypes = [.qr]

        previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        previewLayer.frame = view.layer.bounds
        previewLayer.videoGravity = .resizeAspectFill
        view.layer.addSublayer(previewLayer)

        DispatchQueue.global(qos: .userInitiated).async {
            self.captureSession.startRunning()
        }
    }

    private func setupUI() {
        view.addSubview(closeButton)
        view.addSubview(titleLabel)
        view.addSubview(flashButton)
        view.addSubview(instructionLabel)

        closeButton.addTarget(self, action: #selector(closeTapped), for: .touchUpInside)
        flashButton.addTarget(self, action: #selector(flashTapped), for: .touchUpInside)

        NSLayoutConstraint.activate([
            closeButton.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 8),
            closeButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
            closeButton.widthAnchor.constraint(equalToConstant: 36),
            closeButton.heightAnchor.constraint(equalToConstant: 36),

            titleLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            titleLabel.centerYAnchor.constraint(equalTo: closeButton.centerYAnchor),

            flashButton.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 8),
            flashButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
            flashButton.widthAnchor.constraint(equalToConstant: 36),
            flashButton.heightAnchor.constraint(equalToConstant: 36),

            instructionLabel.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -60),
            instructionLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
        ])
    }

    @objc private func closeTapped() {
        dismiss(animated: true)
    }

    @objc private func flashTapped() {
        guard let device = AVCaptureDevice.default(for: .video),
              device.hasTorch else { return }
        try? device.lockForConfiguration()
        isFlashOn.toggle()
        device.torchMode = isFlashOn ? .on : .off
        device.unlockForConfiguration()
    }

    func metadataOutput(_ output: AVCaptureMetadataOutput, didOutput metadataObjects: [AVMetadataObject], from connection: AVCaptureConnection) {
        guard let object = metadataObjects.first as? AVMetadataMachineReadableCodeObject,
              let value = object.stringValue else { return }
        captureSession.stopRunning()
        AudioServicesPlaySystemSound(SystemSoundID(kSystemSoundID_Vibrate))
        print("Scanned: \\(value)")
    }
}

// MARK: - Usage
// let scanner = FullscreenScannerViewController()
// scanner.modalPresentationStyle = .fullScreen
// present(scanner, animated: true)
`,
  },
  {
    title: "QR Code Display",
    description: "Personal QR code card with share and save actions.",
    preview: <QRDisplayPreview />,
    swiftCode: `import UIKit
import CoreImage.CIFilterBuiltins

class QRDisplayView: UIView {

    private let qrImageView: UIImageView = {
        let iv = UIImageView()
        iv.contentMode = .scaleAspectFit
        iv.layer.cornerRadius = 16
        iv.layer.borderWidth = 1
        iv.layer.borderColor = UIColor.separator.withAlphaComponent(0.3).cgColor
        iv.clipsToBounds = true
        iv.translatesAutoresizingMaskIntoConstraints = false
        return iv
    }()

    private let titleLabel: UILabel = {
        let l = UILabel()
        l.text = "My QR Code"
        l.font = .systemFont(ofSize: 16, weight: .semibold)
        l.textAlignment = .center
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let subtitleLabel: UILabel = {
        let l = UILabel()
        l.text = "Share to connect with others"
        l.font = .systemFont(ofSize: 12)
        l.textColor = .secondaryLabel
        l.textAlignment = .center
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let handleLabel: UILabel = {
        let l = UILabel()
        l.text = "@johndoe"
        l.font = .monospacedSystemFont(ofSize: 12, weight: .regular)
        l.textColor = .tertiaryLabel
        l.textAlignment = .center
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let separator: UIView = {
        let v = UIView()
        v.backgroundColor = .separator
        v.translatesAutoresizingMaskIntoConstraints = false
        return v
    }()

    private let shareButton: UIButton = {
        let button = UIButton(type: .system)
        var config = UIButton.Configuration.plain()
        config.title = "Share"
        config.image = UIImage(systemName: "square.and.arrow.up")
        config.imagePadding = 6
        config.baseForegroundColor = .systemBlue
        button.configuration = config
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private let saveButton: UIButton = {
        let button = UIButton(type: .system)
        var config = UIButton.Configuration.plain()
        config.title = "Save"
        config.image = UIImage(systemName: "arrow.down.to.line")
        config.imagePadding = 6
        config.baseForegroundColor = .systemBlue
        button.configuration = config
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    var content: String = "https://example.com/@johndoe" {
        didSet { generateQRCode() }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
        generateQRCode()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
        generateQRCode()
    }

    private func setupView() {
        backgroundColor = .systemBackground
        layer.cornerRadius = 16
        layer.borderWidth = 1
        layer.borderColor = UIColor.separator.cgColor
        clipsToBounds = true

        addSubview(titleLabel)
        addSubview(subtitleLabel)
        addSubview(qrImageView)
        addSubview(handleLabel)
        addSubview(separator)
        addSubview(shareButton)
        addSubview(saveButton)

        let buttonSeparator = UIView()
        buttonSeparator.backgroundColor = .separator
        buttonSeparator.translatesAutoresizingMaskIntoConstraints = false
        addSubview(buttonSeparator)

        NSLayoutConstraint.activate([
            widthAnchor.constraint(equalToConstant: 290),

            titleLabel.topAnchor.constraint(equalTo: topAnchor, constant: 24),
            titleLabel.centerXAnchor.constraint(equalTo: centerXAnchor),

            subtitleLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 4),
            subtitleLabel.centerXAnchor.constraint(equalTo: centerXAnchor),

            qrImageView.topAnchor.constraint(equalTo: subtitleLabel.bottomAnchor, constant: 20),
            qrImageView.centerXAnchor.constraint(equalTo: centerXAnchor),
            qrImageView.widthAnchor.constraint(equalToConstant: 180),
            qrImageView.heightAnchor.constraint(equalToConstant: 180),

            handleLabel.topAnchor.constraint(equalTo: qrImageView.bottomAnchor, constant: 12),
            handleLabel.centerXAnchor.constraint(equalTo: centerXAnchor),

            separator.topAnchor.constraint(equalTo: handleLabel.bottomAnchor, constant: 20),
            separator.leadingAnchor.constraint(equalTo: leadingAnchor),
            separator.trailingAnchor.constraint(equalTo: trailingAnchor),
            separator.heightAnchor.constraint(equalToConstant: 0.5),

            shareButton.topAnchor.constraint(equalTo: separator.bottomAnchor),
            shareButton.leadingAnchor.constraint(equalTo: leadingAnchor),
            shareButton.widthAnchor.constraint(equalTo: widthAnchor, multiplier: 0.5),
            shareButton.heightAnchor.constraint(equalToConstant: 48),
            shareButton.bottomAnchor.constraint(equalTo: bottomAnchor),

            buttonSeparator.topAnchor.constraint(equalTo: separator.bottomAnchor, constant: 8),
            buttonSeparator.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -8),
            buttonSeparator.centerXAnchor.constraint(equalTo: centerXAnchor),
            buttonSeparator.widthAnchor.constraint(equalToConstant: 0.5),

            saveButton.topAnchor.constraint(equalTo: separator.bottomAnchor),
            saveButton.trailingAnchor.constraint(equalTo: trailingAnchor),
            saveButton.widthAnchor.constraint(equalTo: widthAnchor, multiplier: 0.5),
            saveButton.heightAnchor.constraint(equalToConstant: 48),
        ])
    }

    private func generateQRCode() {
        let filter = CIFilter.qrCodeGenerator()
        filter.message = Data(content.utf8)
        filter.correctionLevel = "M"

        guard let ciImage = filter.outputImage else { return }
        let transform = CGAffineTransform(scaleX: 10, y: 10)
        let scaledImage = ciImage.transformed(by: transform)
        qrImageView.image = UIImage(ciImage: scaledImage)
    }
}

// MARK: - Usage
// let qrDisplay = QRDisplayView()
// view.addSubview(qrDisplay)
// qrDisplay.translatesAutoresizingMaskIntoConstraints = false
// qrDisplay.content = "https://example.com/@johndoe"
// NSLayoutConstraint.activate([
//     qrDisplay.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     qrDisplay.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// ])
`,
  },
  {
    title: "Minimal Scanner",
    description: "Compact gradient scanner with minimal chrome.",
    preview: <MinimalScannerPreview />,
    swiftCode: `import UIKit
import AVFoundation

class MinimalScannerView: UIView, AVCaptureMetadataOutputObjectsDelegate {

    private var captureSession: AVCaptureSession?
    private var previewLayer: AVCaptureVideoPreviewLayer?

    private let gradientLayer: CAGradientLayer = {
        let layer = CAGradientLayer()
        layer.colors = [
            UIColor.systemBlue.cgColor,
            UIColor.systemPurple.cgColor,
        ]
        layer.startPoint = CGPoint(x: 0, y: 0)
        layer.endPoint = CGPoint(x: 1, y: 1)
        return layer
    }()

    private let innerContainer: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.black.withAlphaComponent(0.3)
        view.layer.cornerRadius = 16
        view.clipsToBounds = true
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let checkmarkView: UIImageView = {
        let config = UIImage.SymbolConfiguration(pointSize: 36, weight: .medium)
        let iv = UIImageView(image: UIImage(systemName: "checkmark", withConfiguration: config))
        iv.tintColor = .white
        iv.isHidden = true
        iv.translatesAutoresizingMaskIntoConstraints = false
        return iv
    }()

    var onScanned: ((String) -> Void)?

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        gradientLayer.frame = bounds
        layer.cornerRadius = 24
        clipsToBounds = true
    }

    private func setupView() {
        layer.insertSublayer(gradientLayer, at: 0)
        addSubview(innerContainer)
        innerContainer.addSubview(checkmarkView)

        NSLayoutConstraint.activate([
            widthAnchor.constraint(equalToConstant: 200),
            heightAnchor.constraint(equalToConstant: 200),

            innerContainer.topAnchor.constraint(equalTo: topAnchor, constant: 12),
            innerContainer.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 12),
            innerContainer.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -12),
            innerContainer.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -12),

            checkmarkView.centerXAnchor.constraint(equalTo: innerContainer.centerXAnchor),
            checkmarkView.centerYAnchor.constraint(equalTo: innerContainer.centerYAnchor),
        ])

        setupCamera()
    }

    private func setupCamera() {
        captureSession = AVCaptureSession()
        guard let session = captureSession,
              let device = AVCaptureDevice.default(for: .video),
              let input = try? AVCaptureDeviceInput(device: device),
              session.canAddInput(input) else { return }

        session.addInput(input)

        let output = AVCaptureMetadataOutput()
        guard session.canAddOutput(output) else { return }
        session.addOutput(output)
        output.setMetadataObjectsDelegate(self, queue: .main)
        output.metadataObjectTypes = [.qr]

        previewLayer = AVCaptureVideoPreviewLayer(session: session)
        previewLayer?.videoGravity = .resizeAspectFill
        previewLayer?.frame = innerContainer.bounds
        if let layer = previewLayer {
            innerContainer.layer.insertSublayer(layer, at: 0)
        }

        DispatchQueue.global(qos: .userInitiated).async {
            session.startRunning()
        }
    }

    func metadataOutput(_ output: AVCaptureMetadataOutput, didOutput metadataObjects: [AVMetadataObject], from connection: AVCaptureConnection) {
        guard let object = metadataObjects.first as? AVMetadataMachineReadableCodeObject,
              let value = object.stringValue else { return }

        captureSession?.stopRunning()
        checkmarkView.isHidden = false
        checkmarkView.transform = CGAffineTransform(scaleX: 0.5, y: 0.5)
        UIView.animate(withDuration: 0.3, delay: 0, usingSpringWithDamping: 0.6, initialSpringVelocity: 0.8) {
            self.checkmarkView.transform = .identity
        }
        onScanned?(value)
    }
}

// MARK: - Usage
// let minimal = MinimalScannerView()
// view.addSubview(minimal)
// minimal.translatesAutoresizingMaskIntoConstraints = false
// minimal.onScanned = { code in print("Scanned: \\(code)") }
// NSLayoutConstraint.activate([
//     minimal.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     minimal.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// ])
`,
  },
];

/* ------------------------------------------------------------------ */
/*  Export                                                              */
/* ------------------------------------------------------------------ */

export default function ScanQR() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Scan QR</h2>
        <p className="text-neutral-500 mt-1">
          iOS-style QR code scanners and display cards with camera integration.
        </p>
      </div>
      <div className="space-y-4">
        {scanStyles.map((style) => (
          <CodePreview
            key={style.title}
            title={style.title}
            description={style.description}
            preview={style.preview}
            swiftCode={style.swiftCode}
          />
        ))}
      </div>
    </div>
  );
}
