"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";
import CodePreview from "@/components/ui/CodePreview";

// ─── Types ──────────────────────────────────────────────────────────

interface TableSection {
  header?: string;
  rows: TableRow[];
}

interface TableRow {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  iconBgColor: string;
  accessory?: "chevron" | "none";
}

interface SwipeEditRow {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

interface TelegramMessage {
  id: string;
  avatar: string;
  avatarColor: string;
  name: string;
  preview: string;
  time: string;
  unreadCount?: number;
  isPinned?: boolean;
}

// ─── Swipe Hook ─────────────────────────────────────────────────────

interface UseSwipeRowOptions {
  leftActionsWidth?: number;
  rightActionsWidth?: number;
  snapThreshold?: number;
  velocityThreshold?: number;
  fullSwipeRatio?: number;
  onFullSwipeLeft?: () => void;
  onFullSwipeRight?: () => void;
  onOpen?: () => void;
  forceClose?: boolean;
}

function useSwipeRow(options: UseSwipeRowOptions) {
  const {
    leftActionsWidth = 0,
    rightActionsWidth = 160,
    snapThreshold = 0.4,
    velocityThreshold = 0.5,
    fullSwipeRatio = 0,
    onFullSwipeLeft,
    onFullSwipeRight,
    onOpen,
    forceClose = false,
  } = options;

  const x = useMotionValue(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);
  const offsetAtStart = useRef(0);
  const isHorizontal = useRef<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forceClose && x.get() !== 0) {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 35 });
    }
  }, [forceClose, x]);

  const onStart = useCallback(
    (clientX: number, clientY: number) => {
      isDragging.current = true;
      startX.current = clientX;
      startY.current = clientY;
      startTime.current = Date.now();
      offsetAtStart.current = x.get();
      isHorizontal.current = null;
    },
    [x]
  );

  const onMove = useCallback(
    (clientX: number, clientY: number, e?: React.TouchEvent) => {
      if (!isDragging.current) return;

      const deltaX = clientX - startX.current;
      const deltaY = clientY - startY.current;

      if (isHorizontal.current === null && (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8)) {
        isHorizontal.current = Math.abs(deltaX) > Math.abs(deltaY);
      }

      if (!isHorizontal.current) return;
      if (e) e.preventDefault();

      let rawX = offsetAtStart.current + deltaX;

      // Rubber-band resistance
      if (rawX < 0 && rightActionsWidth > 0) {
        if (Math.abs(rawX) > rightActionsWidth) {
          const overshoot = Math.abs(rawX) - rightActionsWidth;
          rawX = -(rightActionsWidth + overshoot * 0.3);
        }
      } else if (rawX < 0 && rightActionsWidth === 0) {
        rawX = rawX * 0.3;
      }

      if (rawX > 0 && leftActionsWidth > 0) {
        if (rawX > leftActionsWidth) {
          const overshoot = rawX - leftActionsWidth;
          rawX = leftActionsWidth + overshoot * 0.3;
        }
      } else if (rawX > 0 && leftActionsWidth === 0) {
        rawX = rawX * 0.3;
      }

      x.set(rawX);
    },
    [x, rightActionsWidth, leftActionsWidth]
  );

  const onEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const currentX = x.get();
    const deltaX = currentX - offsetAtStart.current;
    const elapsed = Math.max(Date.now() - startTime.current, 1);
    const velocity = deltaX / elapsed;
    const containerWidth = containerRef.current?.offsetWidth ?? 320;

    const spring = { type: "spring" as const, stiffness: 500, damping: 35 };

    if (currentX < 0) {
      // Swiped left
      if (
        fullSwipeRatio > 0 &&
        Math.abs(currentX) > containerWidth * fullSwipeRatio
      ) {
        animate(x, -containerWidth, {
          type: "spring",
          stiffness: 300,
          damping: 30,
        });
        setTimeout(() => onFullSwipeLeft?.(), 250);
        return;
      }
      if (
        rightActionsWidth > 0 &&
        (Math.abs(currentX) > rightActionsWidth * snapThreshold ||
          velocity < -velocityThreshold)
      ) {
        animate(x, -rightActionsWidth, spring);
        onOpen?.();
      } else {
        animate(x, 0, spring);
      }
    } else if (currentX > 0) {
      // Swiped right
      if (
        fullSwipeRatio > 0 &&
        currentX > containerWidth * fullSwipeRatio
      ) {
        animate(x, containerWidth, {
          type: "spring",
          stiffness: 300,
          damping: 30,
        });
        setTimeout(() => onFullSwipeRight?.(), 250);
        return;
      }
      if (
        leftActionsWidth > 0 &&
        (currentX > leftActionsWidth * snapThreshold ||
          velocity > velocityThreshold)
      ) {
        animate(x, leftActionsWidth, spring);
        onOpen?.();
      } else {
        animate(x, 0, spring);
      }
    }
  }, [
    x,
    rightActionsWidth,
    leftActionsWidth,
    snapThreshold,
    velocityThreshold,
    fullSwipeRatio,
    onFullSwipeLeft,
    onFullSwipeRight,
    onOpen,
  ]);

  const handlers = {
    onTouchStart: (e: React.TouchEvent) =>
      onStart(e.touches[0].clientX, e.touches[0].clientY),
    onTouchMove: (e: React.TouchEvent) =>
      onMove(e.touches[0].clientX, e.touches[0].clientY, e),
    onTouchEnd: onEnd,
    onMouseDown: (e: React.MouseEvent) => onStart(e.clientX, e.clientY),
    onMouseMove: (e: React.MouseEvent) => onMove(e.clientX, e.clientY),
    onMouseUp: onEnd,
    onMouseLeave: () => {
      if (isDragging.current) onEnd();
    },
  };

  return { x, handlers, containerRef };
}

// ─── Icons (inline SVGs) ────────────────────────────────────────────

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const WifiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
);

const BluetoothIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
  </svg>
);

const CellularIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="16" width="4" height="6" rx="1" />
    <rect x="7" y="11" width="4" height="11" rx="1" />
    <rect x="12" y="6" width="4" height="16" rx="1" />
    <rect x="17" y="2" width="4" height="20" rx="1" />
  </svg>
);

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const SpeakerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const InboxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ArchiveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="17" x2="12" y2="22" />
    <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
  </svg>
);

const ArchiveLargeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>
);

const ReadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

// ─── Demo Data ──────────────────────────────────────────────────────

const settingsData: TableSection[] = [
  {
    header: "General",
    rows: [
      { id: "wifi", title: "Wi-Fi", subtitle: "Home Network", icon: <WifiIcon />, iconBgColor: "bg-blue-500", accessory: "chevron" },
      { id: "bluetooth", title: "Bluetooth", subtitle: "On", icon: <BluetoothIcon />, iconBgColor: "bg-blue-500", accessory: "chevron" },
      { id: "cellular", title: "Cellular", icon: <CellularIcon />, iconBgColor: "bg-green-500", accessory: "chevron" },
    ],
  },
  {
    header: "Notifications",
    rows: [
      { id: "notifications", title: "Notifications", icon: <BellIcon />, iconBgColor: "bg-red-500", accessory: "chevron" },
      { id: "sounds", title: "Sounds & Haptics", icon: <SpeakerIcon />, iconBgColor: "bg-pink-500", accessory: "chevron" },
      { id: "focus", title: "Focus", icon: <MoonIcon />, iconBgColor: "bg-indigo-500", accessory: "chevron" },
    ],
  },
];

const initialEditRows: SwipeEditRow[] = [
  { id: "1", title: "Inbox", subtitle: "3 new messages", icon: <InboxIcon />, iconBgColor: "bg-blue-500" },
  { id: "2", title: "Starred", subtitle: "12 items", icon: <StarIcon />, iconBgColor: "bg-yellow-500" },
  { id: "3", title: "Drafts", subtitle: "2 drafts", icon: <FileIcon />, iconBgColor: "bg-neutral-500" },
  { id: "4", title: "Sent", subtitle: "Last: Today", icon: <SendIcon />, iconBgColor: "bg-green-500" },
  { id: "5", title: "Archive", subtitle: "148 items", icon: <ArchiveIcon />, iconBgColor: "bg-purple-500" },
];

const initialMessages: TelegramMessage[] = [
  { id: "1", avatar: "AS", avatarColor: "bg-blue-500", name: "Alice Smith", preview: "Hey! Are we still meeting tomorrow at the cafe?", time: "10:42", unreadCount: 2 },
  { id: "2", avatar: "TC", avatarColor: "bg-green-500", name: "Team Chat", preview: "Bob: I just pushed the latest changes to main...", time: "9:15" },
  { id: "3", avatar: "JD", avatarColor: "bg-purple-500", name: "John Doe", preview: "Thanks for sending the documents!", time: "Yesterday", isPinned: true },
  { id: "4", avatar: "SW", avatarColor: "bg-orange-500", name: "Sarah Wilson", preview: "The presentation looks great. Let me know...", time: "Yesterday" },
  { id: "5", avatar: "MK", avatarColor: "bg-red-500", name: "Mike Kim", preview: "Can you review the PR when you get a chance?", time: "Monday", unreadCount: 1 },
];

// ─── Variant 1: Normal Table View ───────────────────────────────────

function NormalTablePreview() {
  return (
    <div className="w-[320px] bg-neutral-100 dark:bg-neutral-900 rounded-2xl py-4">
      {settingsData.map((section) => (
        <div key={section.header} className="mb-4 last:mb-0">
          {section.header && (
            <p className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400 uppercase px-6 py-1.5">
              {section.header}
            </p>
          )}
          <div className="mx-4 rounded-xl overflow-hidden bg-white dark:bg-neutral-800">
            {section.rows.map((row, i) => (
              <div
                key={row.id}
                className={`flex items-center px-4 py-3 ${
                  i > 0 ? "border-t border-neutral-200 dark:border-neutral-700" : ""
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-md ${row.iconBgColor} flex items-center justify-center mr-3 shrink-0`}
                >
                  {row.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] text-neutral-900 dark:text-white">
                    {row.title}
                  </p>
                  {row.subtitle && (
                    <p className="text-[13px] text-neutral-500">
                      {row.subtitle}
                    </p>
                  )}
                </div>
                {row.accessory === "chevron" && <ChevronRight />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Variant 2: Swipe Edit & Delete ─────────────────────────────────

function SwipeEditDeleteRow({
  row,
  isOpen,
  onOpen,
  onDelete,
  onEdit,
}: {
  row: SwipeEditRow;
  isOpen: boolean;
  onOpen: () => void;
  onDelete: () => void;
  onEdit: () => void;
}) {
  const { x, handlers, containerRef } = useSwipeRow({
    rightActionsWidth: 160,
    leftActionsWidth: 0,
    snapThreshold: 0.4,
    velocityThreshold: 0.5,
    onOpen,
    forceClose: !isOpen,
  });

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Action buttons behind */}
      <div className="absolute inset-y-0 right-0 flex">
        <button
          onClick={onEdit}
          className="w-20 bg-blue-500 flex flex-col items-center justify-center text-white text-xs font-medium gap-1"
        >
          <EditIcon />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="w-20 bg-red-500 flex flex-col items-center justify-center text-white text-xs font-medium gap-1"
        >
          <TrashIcon />
          Delete
        </button>
      </div>

      {/* Foreground row */}
      <motion.div
        style={{ x }}
        className="relative z-10 bg-white dark:bg-neutral-800 flex items-center px-4 py-3 cursor-grab active:cursor-grabbing select-none"
        {...handlers}
      >
        <div
          className={`w-7 h-7 rounded-md ${row.iconBgColor} flex items-center justify-center mr-3 shrink-0`}
        >
          {row.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] text-neutral-900 dark:text-white">
            {row.title}
          </p>
          {row.subtitle && (
            <p className="text-[13px] text-neutral-500">{row.subtitle}</p>
          )}
        </div>
        <ChevronRight />
      </motion.div>
    </div>
  );
}

function SwipeEditDeletePreview() {
  const [rows, setRows] = useState(initialEditRows);
  const [openRowId, setOpenRowId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
    setOpenRowId(null);
  };

  const handleEdit = (id: string) => {
    setOpenRowId(null);
  };

  return (
    <div className="w-[320px] bg-neutral-100 dark:bg-neutral-900 rounded-2xl py-4">
      <p className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400 uppercase px-6 py-1.5">
        Mailboxes
      </p>
      <div className="mx-4 rounded-xl overflow-hidden bg-white dark:bg-neutral-800">
        {rows.map((row, i) => (
          <div
            key={row.id}
            className={
              i > 0
                ? "border-t border-neutral-200 dark:border-neutral-700"
                : ""
            }
          >
            <SwipeEditDeleteRow
              row={row}
              isOpen={openRowId === row.id}
              onOpen={() => setOpenRowId(row.id)}
              onDelete={() => handleDelete(row.id)}
              onEdit={() => handleEdit(row.id)}
            />
          </div>
        ))}
      </div>
      <p className="text-[12px] text-neutral-400 text-center mt-3 px-4">
        Swipe left on a row to reveal Edit and Delete actions
      </p>
    </div>
  );
}

// ─── Variant 3: Telegram-style Swipe ────────────────────────────────

function TelegramSwipeRow({
  message,
  isOpen,
  onOpen,
  onDelete,
  onPin,
  onArchive,
  onRead,
}: {
  message: TelegramMessage;
  isOpen: boolean;
  onOpen: () => void;
  onDelete: () => void;
  onPin: () => void;
  onArchive: () => void;
  onRead: () => void;
}) {
  const rightActionsWidth = 240;
  const leftActionsWidth = 80;

  const { x, handlers, containerRef } = useSwipeRow({
    rightActionsWidth,
    leftActionsWidth,
    snapThreshold: 0.35,
    velocityThreshold: 0.5,
    fullSwipeRatio: 0.75,
    onFullSwipeLeft: onArchive,
    onFullSwipeRight: onRead,
    onOpen,
    forceClose: !isOpen,
  });

  // Proportional action widths derived from x
  const rightRevealed = useTransform(x, (val) =>
    Math.min(Math.abs(Math.min(val, 0)), rightActionsWidth + 60)
  );

  const actionWidth = useTransform(rightRevealed, (val) =>
    Math.max(val / 3, 0)
  );

  const leftRevealed = useTransform(x, (val) =>
    Math.min(Math.max(val, 0), leftActionsWidth + 40)
  );

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Right actions: Delete | Pin | Archive */}
      <div className="absolute inset-y-0 right-0 flex">
        <motion.button
          style={{ width: actionWidth }}
          onClick={onDelete}
          className="bg-red-500 flex flex-col items-center justify-center text-white text-[11px] font-medium gap-0.5 overflow-hidden"
        >
          <TrashIcon />
          <span>Delete</span>
        </motion.button>
        <motion.button
          style={{ width: actionWidth }}
          onClick={onPin}
          className="bg-orange-500 flex flex-col items-center justify-center text-white text-[11px] font-medium gap-0.5 overflow-hidden"
        >
          <PinIcon />
          <span>Pin</span>
        </motion.button>
        <motion.button
          style={{ width: actionWidth }}
          onClick={onArchive}
          className="bg-blue-500 flex flex-col items-center justify-center text-white text-[11px] font-medium gap-0.5 overflow-hidden"
        >
          <ArchiveLargeIcon />
          <span>Archive</span>
        </motion.button>
      </div>

      {/* Left action: Read */}
      <div className="absolute inset-y-0 left-0 flex">
        <motion.button
          style={{ width: leftRevealed }}
          onClick={onRead}
          className="bg-blue-500 flex flex-col items-center justify-center text-white text-[11px] font-medium gap-0.5 overflow-hidden"
        >
          <ReadIcon />
          <span>Read</span>
        </motion.button>
      </div>

      {/* Foreground message row */}
      <motion.div
        style={{ x }}
        className="relative z-10 bg-white dark:bg-neutral-800 flex items-center px-4 py-3 cursor-grab active:cursor-grabbing select-none"
        {...handlers}
      >
        <div
          className={`w-12 h-12 rounded-full ${message.avatarColor} flex items-center justify-center mr-3 shrink-0`}
        >
          <span className="text-white text-sm font-semibold">
            {message.avatar}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-semibold text-neutral-900 dark:text-white truncate">
              {message.name}
            </p>
            <p className="text-[12px] text-neutral-400 ml-2 shrink-0">
              {message.time}
            </p>
          </div>
          <p className="text-[14px] text-neutral-500 truncate mt-0.5">
            {message.preview}
          </p>
        </div>
        {message.unreadCount && (
          <div className="ml-2 min-w-5 h-5 px-1.5 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
            <span className="text-[11px] text-white font-bold">
              {message.unreadCount}
            </span>
          </div>
        )}
        {message.isPinned && !message.unreadCount && (
          <div className="ml-2 text-neutral-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
              <line x1="12" y1="17" x2="12" y2="22" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function TelegramSwipePreview() {
  const [messages, setMessages] = useState(initialMessages);
  const [openRowId, setOpenRowId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setOpenRowId(null);
  };

  const handlePin = (id: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, isPinned: !m.isPinned } : m
      )
    );
    setOpenRowId(null);
  };

  const handleArchive = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setOpenRowId(null);
  };

  const handleRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, unreadCount: m.unreadCount ? undefined : 1 } : m
      )
    );
    setOpenRowId(null);
  };

  return (
    <div className="w-[360px] bg-neutral-100 dark:bg-neutral-900 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 bg-neutral-100 dark:bg-neutral-900">
        <p className="text-[17px] font-bold text-neutral-900 dark:text-white">
          Messages
        </p>
      </div>
      <div className="bg-white dark:bg-neutral-800">
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={
              i > 0
                ? "border-t border-neutral-200 dark:border-neutral-700"
                : ""
            }
          >
            <TelegramSwipeRow
              message={msg}
              isOpen={openRowId === msg.id}
              onOpen={() => setOpenRowId(msg.id)}
              onDelete={() => handleDelete(msg.id)}
              onPin={() => handlePin(msg.id)}
              onArchive={() => handleArchive(msg.id)}
              onRead={() => handleRead(msg.id)}
            />
          </div>
        ))}
      </div>
      <p className="text-[12px] text-neutral-400 text-center py-3 px-4">
        Swipe left for Delete, Pin, Archive — Swipe right for Read — Full swipe to archive
      </p>
    </div>
  );
}

// ─── Swift Code Strings ─────────────────────────────────────────────

const normalTableSwift = `import UIKit

// MARK: - Data Model
struct SettingsItem {
    let icon: UIImage?
    let iconBackgroundColor: UIColor
    let title: String
    let subtitle: String?
    let accessoryType: UITableViewCell.AccessoryType

    init(icon: UIImage?, iconBgColor: UIColor, title: String,
         subtitle: String? = nil, accessory: UITableViewCell.AccessoryType = .disclosureIndicator) {
        self.icon = icon
        self.iconBackgroundColor = iconBgColor
        self.title = title
        self.subtitle = subtitle
        self.accessoryType = accessory
    }
}

struct SettingsSection {
    let header: String?
    let items: [SettingsItem]
}

// MARK: - Settings Table View Controller
class SettingsTableViewController: UITableViewController {

    private var sections: [SettingsSection] = []

    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Settings"
        tableView.register(SettingsCell.self, forCellReuseIdentifier: "SettingsCell")
        tableView.backgroundColor = .systemGroupedBackground
        setupData()
    }

    private func setupData() {
        sections = [
            SettingsSection(header: "General", items: [
                SettingsItem(icon: UIImage(systemName: "wifi"), iconBgColor: .systemBlue,
                             title: "Wi-Fi", subtitle: "Home Network"),
                SettingsItem(icon: UIImage(systemName: "dot.radiowaves.left.and.right"),
                             iconBgColor: .systemBlue, title: "Bluetooth", subtitle: "On"),
                SettingsItem(icon: UIImage(systemName: "antenna.radiowaves.left.and.right"),
                             iconBgColor: .systemGreen, title: "Cellular"),
            ]),
            SettingsSection(header: "Notifications", items: [
                SettingsItem(icon: UIImage(systemName: "bell.badge.fill"),
                             iconBgColor: .systemRed, title: "Notifications"),
                SettingsItem(icon: UIImage(systemName: "speaker.wave.3.fill"),
                             iconBgColor: .systemPink, title: "Sounds & Haptics"),
                SettingsItem(icon: UIImage(systemName: "moon.fill"),
                             iconBgColor: .systemIndigo, title: "Focus"),
            ]),
        ]
        tableView.reloadData()
    }

    // MARK: - Data Source
    override func numberOfSections(in tableView: UITableView) -> Int {
        sections.count
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        sections[section].items.count
    }

    override func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        sections[section].header
    }

    override func tableView(_ tableView: UITableView,
                             cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "SettingsCell",
                                                  for: indexPath) as! SettingsCell
        let item = sections[indexPath.section].items[indexPath.row]
        cell.configure(with: item)
        return cell
    }
}

// MARK: - Custom Cell
class SettingsCell: UITableViewCell {

    private let iconContainer: UIView = {
        let v = UIView()
        v.layer.cornerRadius = 6
        v.clipsToBounds = true
        v.translatesAutoresizingMaskIntoConstraints = false
        return v
    }()

    private let iconImageView: UIImageView = {
        let iv = UIImageView()
        iv.tintColor = .white
        iv.contentMode = .scaleAspectFit
        iv.translatesAutoresizingMaskIntoConstraints = false
        return iv
    }()

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: .subtitle, reuseIdentifier: reuseIdentifier)
        setupViews()
    }

    required init?(coder: NSCoder) { fatalError() }

    private func setupViews() {
        contentView.addSubview(iconContainer)
        iconContainer.addSubview(iconImageView)

        NSLayoutConstraint.activate([
            iconContainer.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 16),
            iconContainer.centerYAnchor.constraint(equalTo: contentView.centerYAnchor),
            iconContainer.widthAnchor.constraint(equalToConstant: 28),
            iconContainer.heightAnchor.constraint(equalToConstant: 28),

            iconImageView.centerXAnchor.constraint(equalTo: iconContainer.centerXAnchor),
            iconImageView.centerYAnchor.constraint(equalTo: iconContainer.centerYAnchor),
            iconImageView.widthAnchor.constraint(equalToConstant: 16),
            iconImageView.heightAnchor.constraint(equalToConstant: 16),
        ])

        indentationLevel = 0
        separatorInset = UIEdgeInsets(top: 0, left: 56, bottom: 0, right: 0)
    }

    func configure(with item: SettingsItem) {
        iconContainer.backgroundColor = item.iconBackgroundColor
        iconImageView.image = item.icon
        textLabel?.text = item.title
        textLabel?.font = .systemFont(ofSize: 15)
        detailTextLabel?.text = item.subtitle
        detailTextLabel?.font = .systemFont(ofSize: 13)
        detailTextLabel?.textColor = .secondaryLabel
        accessoryType = item.accessoryType
    }
}

// MARK: - Usage
// let vc = SettingsTableViewController(style: .insetGrouped)
// navigationController?.pushViewController(vc, animated: true)`;

const swipeEditDeleteSwift = `import UIKit

// MARK: - Swipe Edit & Delete Table View Controller
class SwipeEditDeleteViewController: UITableViewController {

    struct MailboxItem {
        let id: String
        let title: String
        let subtitle: String
        let iconName: String
        let iconColor: UIColor
    }

    private var items: [MailboxItem] = [
        MailboxItem(id: "1", title: "Inbox", subtitle: "3 new messages",
                    iconName: "tray.fill", iconColor: .systemBlue),
        MailboxItem(id: "2", title: "Starred", subtitle: "12 items",
                    iconName: "star.fill", iconColor: .systemYellow),
        MailboxItem(id: "3", title: "Drafts", subtitle: "2 drafts",
                    iconName: "doc.text.fill", iconColor: .systemGray),
        MailboxItem(id: "4", title: "Sent", subtitle: "Last: Today",
                    iconName: "paperplane.fill", iconColor: .systemGreen),
        MailboxItem(id: "5", title: "Archive", subtitle: "148 items",
                    iconName: "archivebox.fill", iconColor: .systemPurple),
    ]

    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Mailboxes"
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "Cell")
        tableView.backgroundColor = .systemGroupedBackground
    }

    // MARK: - Data Source
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        items.count
    }

    override func tableView(_ tableView: UITableView,
                             cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
        let item = items[indexPath.row]

        var config = cell.defaultContentConfiguration()
        config.text = item.title
        config.secondaryText = item.subtitle
        config.image = UIImage(systemName: item.iconName)
        config.imageProperties.tintColor = .white

        let bgView = UIView(frame: CGRect(x: 0, y: 0, width: 28, height: 28))
        bgView.backgroundColor = item.iconColor
        bgView.layer.cornerRadius = 6

        cell.contentConfiguration = config
        cell.accessoryType = .disclosureIndicator
        return cell
    }

    // MARK: - Swipe Actions
    override func tableView(_ tableView: UITableView,
                             trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath)
    -> UISwipeActionsConfiguration? {

        let deleteAction = UIContextualAction(style: .destructive, title: "Delete") {
            [weak self] _, _, completion in
            self?.items.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: .automatic)
            completion(true)
        }
        deleteAction.backgroundColor = .systemRed
        deleteAction.image = UIImage(systemName: "trash.fill")

        let editAction = UIContextualAction(style: .normal, title: "Edit") {
            _, _, completion in
            // Handle edit action
            completion(true)
        }
        editAction.backgroundColor = .systemBlue
        editAction.image = UIImage(systemName: "pencil")

        let config = UISwipeActionsConfiguration(actions: [deleteAction, editAction])
        config.performsFirstActionWithFullSwipe = false
        return config
    }
}

// MARK: - Usage
// let vc = SwipeEditDeleteViewController(style: .insetGrouped)
// navigationController?.pushViewController(vc, animated: true)`;

const telegramSwipeSwift = `import UIKit

// MARK: - Message Model
struct ChatMessage {
    let id: String
    let avatar: String
    let avatarColor: UIColor
    let name: String
    let preview: String
    let time: String
    var unreadCount: Int
    var isPinned: Bool
}

// MARK: - Delegate to inform owner about open/close state
protocol SwipeableMessageCellDelegate: AnyObject {
    func swipeCellDidBeginReveal(_ cell: SwipeableMessageCell)
    func swipeCellDidClose(_ cell: SwipeableMessageCell)
}

// MARK: - Swipeable Message Cell
class SwipeableMessageCell: UITableViewCell {

    // Callbacks for actions
    var onDelete: (() -> Void)?
    var onPin: (() -> Void)?
    var onArchive: (() -> Void)?
    var onRead: (() -> Void)?

    // Delegate for coordination (one open at a time)
    weak var delegate: SwipeableMessageCellDelegate?

    private let containerView = UIView()
    private let avatarView = UIView()
    private let avatarLabel = UILabel()
    private let nameLabel = UILabel()
    private let previewLabel = UILabel()
    private let timeLabel = UILabel()
    private let badgeView = UIView()
    private let badgeLabel = UILabel()

    // Right actions
    private let deleteButton = UIButton(type: .system)
    private let pinButton = UIButton(type: .system)
    private let archiveButton = UIButton(type: .system)

    // Left action
    private let readButton = UIButton(type: .system)

    private var panGesture: UIPanGestureRecognizer!

    // Track horizontal offset using transform (smoother)
    private var startOffsetX: CGFloat = 0

    private let rightActionsWidth: CGFloat = 240
    private let leftActionsWidth: CGFloat = 80
    private let fullSwipeRatio: CGFloat = 0.75

    private var didSetupConstraints = false

    // Track state transitions for delegate notifications
    private var wasOpen: Bool = false
    private var isOpen: Bool {
        abs(currentOffsetX) > 1.0 // treat near-zero as closed
    }

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        setupViews()
        setupGesture()
        setNeedsUpdateConstraints()
    }

    required init?(coder: NSCoder) { fatalError() }

    private func setupViews() {
        selectionStyle = .none
        clipsToBounds = true

        configure(actionButton: deleteButton, title: "Delete", image: "trash.fill", bg: .systemRed, action: #selector(deleteTapped))
        configure(actionButton: pinButton, title: "Pin", image: "pin.fill", bg: .systemOrange, action: #selector(pinTapped))
        configure(actionButton: archiveButton, title: "Archive", image: "archivebox.fill", bg: .systemBlue, action: #selector(archiveTapped))
        configure(actionButton: readButton, title: "Read", image: "eye.fill", bg: .systemBlue, action: #selector(readTapped))

        [readButton, deleteButton, pinButton, archiveButton].forEach {
            contentView.addSubview($0) // frames calculated in layoutActionButtons(using:)
        }

        containerView.backgroundColor = .systemBackground
        containerView.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(containerView)

        avatarView.translatesAutoresizingMaskIntoConstraints = false
        avatarView.layer.cornerRadius = 24
        avatarView.clipsToBounds = true

        avatarLabel.font = .boldSystemFont(ofSize: 14)
        avatarLabel.textColor = .white
        avatarLabel.textAlignment = .center
        avatarLabel.translatesAutoresizingMaskIntoConstraints = false

        avatarView.addSubview(avatarLabel)
        containerView.addSubview(avatarView)

        nameLabel.font = .boldSystemFont(ofSize: 15)
        nameLabel.translatesAutoresizingMaskIntoConstraints = false
        nameLabel.setContentCompressionResistancePriority(.required, for: .vertical)

        previewLabel.font = .systemFont(ofSize: 14)
        previewLabel.textColor = .secondaryLabel
        previewLabel.numberOfLines = 1
        previewLabel.translatesAutoresizingMaskIntoConstraints = false

        timeLabel.font = .systemFont(ofSize: 12)
        timeLabel.textColor = .tertiaryLabel
        timeLabel.translatesAutoresizingMaskIntoConstraints = false

        containerView.addSubview(nameLabel)
        containerView.addSubview(previewLabel)
        containerView.addSubview(timeLabel)

        badgeView.backgroundColor = .systemBlue
        badgeView.layer.cornerRadius = 10
        badgeView.translatesAutoresizingMaskIntoConstraints = false

        badgeLabel.font = .boldSystemFont(ofSize: 11)
        badgeLabel.textColor = .white
        badgeLabel.textAlignment = .center
        badgeLabel.translatesAutoresizingMaskIntoConstraints = false

        badgeView.addSubview(badgeLabel)
        containerView.addSubview(badgeView)
    }

    private func configure(actionButton: UIButton, title: String, image: String, bg: UIColor, action: Selector) {
        actionButton.backgroundColor = bg
        actionButton.setTitle(title, for: .normal)
        actionButton.setImage(UIImage(systemName: image), for: .normal)
        actionButton.tintColor = .white
        actionButton.titleLabel?.font = .systemFont(ofSize: 14, weight: .semibold)
        actionButton.addTarget(self, action: action, for: .touchUpInside)
        actionButton.contentHorizontalAlignment = .center
        actionButton.imageEdgeInsets = UIEdgeInsets(top: 0, left: -4, bottom: 0, right: 4)
    }

    override func prepareForReuse() {
        super.prepareForReuse()
        // Always reset to closed for reused cells
        containerView.transform = .identity
        layoutActionButtons(using: 0)
        wasOpen = false
    }

    override func updateConstraints() {
        if !didSetupConstraints {
            didSetupConstraints = true

            NSLayoutConstraint.activate([
                containerView.topAnchor.constraint(equalTo: contentView.topAnchor),
                containerView.bottomAnchor.constraint(equalTo: contentView.bottomAnchor),
                containerView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),
                containerView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor),

                avatarView.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 16),
                avatarView.centerYAnchor.constraint(equalTo: containerView.centerYAnchor),
                avatarView.widthAnchor.constraint(equalToConstant: 48),
                avatarView.heightAnchor.constraint(equalToConstant: 48),

                avatarLabel.centerXAnchor.constraint(equalTo: avatarView.centerXAnchor),
                avatarLabel.centerYAnchor.constraint(equalTo: avatarView.centerYAnchor),
                avatarLabel.leadingAnchor.constraint(equalTo: avatarView.leadingAnchor, constant: 4),
                avatarLabel.trailingAnchor.constraint(equalTo: avatarView.trailingAnchor, constant: -4),

                timeLabel.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 12),
                timeLabel.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -16),

                nameLabel.leadingAnchor.constraint(equalTo: avatarView.trailingAnchor, constant: 12),
                nameLabel.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 12),
                nameLabel.trailingAnchor.constraint(lessThanOrEqualTo: timeLabel.leadingAnchor, constant: -8),

                previewLabel.leadingAnchor.constraint(equalTo: nameLabel.leadingAnchor),
                previewLabel.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -16),
                previewLabel.topAnchor.constraint(equalTo: nameLabel.bottomAnchor, constant: 4),
                previewLabel.bottomAnchor.constraint(lessThanOrEqualTo: containerView.bottomAnchor, constant: -12),
                
                badgeView.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -16),
                badgeView.centerYAnchor.constraint(equalTo: containerView.centerYAnchor),
                badgeView.heightAnchor.constraint(equalToConstant: 20),
                badgeView.widthAnchor.constraint(greaterThanOrEqualToConstant: 20),

                badgeLabel.leadingAnchor.constraint(equalTo: badgeView.leadingAnchor, constant: 6),
                badgeLabel.trailingAnchor.constraint(equalTo: badgeView.trailingAnchor, constant: -6),
                badgeLabel.topAnchor.constraint(equalTo: badgeView.topAnchor, constant: 2),
                badgeLabel.bottomAnchor.constraint(equalTo: badgeView.bottomAnchor, constant: -2)
            ])

            let minHeight = contentView.heightAnchor.constraint(greaterThanOrEqualToConstant: 72)
            minHeight.priority = .defaultHigh
            minHeight.isActive = true
        }

        super.updateConstraints()
    }

    private func setupGesture() {
        panGesture = UIPanGestureRecognizer(target: self, action: #selector(handlePan(_:)))
        panGesture.delegate = self
        containerView.addGestureRecognizer(panGesture)
    }

    // Current effective horizontal offset (from transform)
    private var currentOffsetX: CGFloat { containerView.transform.tx }

    // Apply transform and layout action buttons accordingly
    private func apply(offset x: CGFloat) {
        containerView.transform = CGAffineTransform(translationX: x, y: 0)
        layoutActionButtons(using: x)

        // Notify delegate if state changed between open/closed
        let nowOpen = isOpen
        if nowOpen != wasOpen {
            wasOpen = nowOpen
            if nowOpen {
                delegate?.swipeCellDidBeginReveal(self)
            } else {
                delegate?.swipeCellDidClose(self)
            }
        }
    }

    @objc private func handlePan(_ gesture: UIPanGestureRecognizer) {
        let translation = gesture.translation(in: self)
        let velocity = gesture.velocity(in: self)

        switch gesture.state {
        case .began:
            startOffsetX = currentOffsetX

        case .changed:
            var x = startOffsetX + translation.x

            // Rubber-band effect near limits
            if x < -rightActionsWidth {
                let overshoot = abs(x) - rightActionsWidth
                x = -(rightActionsWidth + overshoot * 0.3)
            } else if x > leftActionsWidth {
                let overshoot = x - leftActionsWidth
                x = leftActionsWidth + overshoot * 0.3
            }

            apply(offset: x)

        case .ended, .cancelled:
            let x = currentOffsetX

            // Full swipe triggers action and fling offscreen
            if abs(x) > bounds.width * fullSwipeRatio {
                let target = x < 0 ? -bounds.width : bounds.width
                UIView.animate(withDuration: 0.32,
                               delay: 0,
                               usingSpringWithDamping: 0.86,
                               initialSpringVelocity: 0.8,
                               options: [.allowUserInteraction, .curveEaseOut]) {
                    self.apply(offset: target)
                } completion: { _ in
                    if x < 0 { self.onArchive?() } else { self.onRead?() }
                }
                return
            }

            // Snap-open rules
            var target: CGFloat = 0
            if x < 0 {
                if abs(x) > rightActionsWidth * 0.4 || velocity.x < -500 {
                    target = -rightActionsWidth
                }
            } else if x > 0 {
                if x > leftActionsWidth * 0.4 || velocity.x > 500 {
                    target = leftActionsWidth
                }
            }

            UIView.animate(withDuration: 0.38,
                           delay: 0,
                           usingSpringWithDamping: 0.82,
                           initialSpringVelocity: 0.7,
                           options: [.allowUserInteraction, .curveEaseInOut]) {
                self.apply(offset: target)
            }

        default:
            break
        }
    }

    private func layoutActionButtons(using offsetX: CGFloat) {
        let h = bounds.height

        if offsetX < 0 {
            let revealed = min(abs(offsetX), rightActionsWidth + 60)
            let w = revealed / 3
            deleteButton.frame = CGRect(x: bounds.width - revealed, y: 0, width: w, height: h)
            pinButton.frame = CGRect(x: bounds.width - revealed + w, y: 0, width: w, height: h)
            archiveButton.frame = CGRect(x: bounds.width - revealed + 2 * w, y: 0, width: w, height: h)
        } else {
            deleteButton.frame = .zero
            pinButton.frame = .zero
            archiveButton.frame = .zero
        }

        if offsetX > 0 {
            readButton.frame = CGRect(x: 0, y: 0, width: offsetX, height: h)
        } else {
            readButton.frame = .zero
        }
    }

    func configure(with message: ChatMessage) {
        avatarView.backgroundColor = message.avatarColor
        avatarLabel.text = message.avatar
        nameLabel.text = message.name
        previewLabel.text = message.preview
        timeLabel.text = message.time
        badgeView.isHidden = message.unreadCount == 0
        badgeLabel.text = "\(message.unreadCount)"
    }

    func closeActions(animated: Bool = true) {
        let work = { self.apply(offset: 0) }
        if animated {
            UIView.animate(withDuration: 0.3,
                           delay: 0,
                           usingSpringWithDamping: 0.9,
                           initialSpringVelocity: 0.6,
                           options: [.allowUserInteraction, .curveEaseInOut],
                           animations: work)
        } else {
            work()
        }
    }

    @objc private func deleteTapped() { onDelete?() }
    @objc private func pinTapped() { onPin?() }
    @objc private func archiveTapped() { onArchive?() }
    @objc private func readTapped() { onRead?() }
}

// MARK: - Gesture delegate
extension SwipeableMessageCell {
    override func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
        guard let pan = gestureRecognizer as? UIPanGestureRecognizer else { return true }
        let v = pan.velocity(in: self)
        return abs(v.x) > abs(v.y) && abs(v.x) > 60
    }

    override func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer,
                           shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer) -> Bool {
        guard let pan = gestureRecognizer as? UIPanGestureRecognizer else { return false }
        let v = pan.velocity(in: self)
        return abs(v.x) > abs(v.y)
    }
}

// MARK: - Usage
// Register: tableView.register(SwipeableMessageCell.self, forCellReuseIdentifier: "MessageCell")
// In cellForRowAt:
//   let cell = tableView.dequeueReusableCell(withIdentifier: "MessageCell") as! SwipeableMessageCell
//   cell.configure(with: messages[indexPath.row])
//   cell.onDelete = { [weak self] in self?.deleteMessage(at: indexPath) }
//   cell.onPin = { [weak self] in self?.pinMessage(at: indexPath) }
//   cell.onArchive = { [weak self] in self?.archiveMessage(at: indexPath) }
//   cell.onRead = { [weak self] in self?.toggleRead(at: indexPath) }
// 

import UIKit

class testViewController: UIViewController {

    // MARK: - UI
    private lazy var tableView: UITableView = {
        let tv = UITableView(frame: .zero, style: .plain)
        tv.translatesAutoresizingMaskIntoConstraints = false
        tv.backgroundColor = .systemBackground
        tv.separatorStyle = .singleLine
        tv.dataSource = self
        tv.delegate = self
        tv.register(SwipeableMessageCell.self, forCellReuseIdentifier: "MessageCell")
        return tv
    }()

    // Keep track of currently open cell
    private weak var openCell: SwipeableMessageCell?

    // MARK: - Data
    private var messages: [ChatMessage] = [
        ChatMessage(id: "1", avatar: "AL", avatarColor: .systemBlue,  name: "Alice",   preview: "Hey, how are you?", time: "10:21", unreadCount: 2, isPinned: false),
        ChatMessage(id: "2", avatar: "BO", avatarColor: .systemGreen, name: "Bob",     preview: "Let’s catch up later.", time: "09:05", unreadCount: 0, isPinned: true),
        ChatMessage(id: "3", avatar: "CH", avatarColor: .systemPink,  name: "Charlie", preview: "Draft is ready.", time: "Yesterday", unreadCount: 1, isPinned: false),
        ChatMessage(id: "4", avatar: "DA", avatarColor: .systemOrange,name: "Dana",    preview: "Photos look great!", time: "Mon", unreadCount: 0, isPinned: false),
        ChatMessage(id: "5", avatar: "EL", avatarColor: .systemPurple,name: "Eli",     preview: "Can you review?", time: "Sun", unreadCount: 3, isPinned: false)
    ]

    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Messages"
        view.backgroundColor = .systemBackground
        setupLayout()
        tableView.reloadData()
    }

    private func setupLayout() {
        view.addSubview(tableView)
        NSLayoutConstraint.activate([
            tableView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            tableView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
            tableView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor),
            tableView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }

    // MARK: - Actions for swipe callbacks
    private func deleteMessage(at indexPath: IndexPath) {
        messages.remove(at: indexPath.row)
        tableView.deleteRows(at: [indexPath], with: .automatic)
    }

    private func pinMessage(at indexPath: IndexPath) {
        messages[indexPath.row].isPinned.toggle()
        let message = messages.remove(at: indexPath.row)
        if message.isPinned {
            messages.insert(message, at: 0)
        } else {
            messages.append(message)
        }
        tableView.reloadData()
    }

    private func archiveMessage(at indexPath: IndexPath) {
        messages.remove(at: indexPath.row)
        tableView.deleteRows(at: [indexPath], with: .automatic)
    }

    private func toggleRead(at indexPath: IndexPath) {
        if messages[indexPath.row].unreadCount > 0 {
            messages[indexPath.row].unreadCount = 0
        } else {
            messages[indexPath.row].unreadCount = 1
        }
        tableView.reloadRows(at: [indexPath], with: .automatic)
    }
}

extension testViewController: UITableViewDataSource, UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        messages.count
    }

    func tableView(_ tableView: UITableView,
                   cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(
            withIdentifier: "MessageCell",
            for: indexPath
        ) as? SwipeableMessageCell else {
            return UITableViewCell()
        }

        let message = messages[indexPath.row]
        cell.configure(with: message)
        cell.delegate = self

        cell.onDelete = { [weak self, weak cell] in
            guard let self, let cell, let index = tableView.indexPath(for: cell) else { return }
            self.deleteMessage(at: index)
        }
        cell.onPin = { [weak self, weak cell] in
            guard let self, let cell, let index = tableView.indexPath(for: cell) else { return }
            self.pinMessage(at: index)
        }
        cell.onArchive = { [weak self, weak cell] in
            guard let self, let cell, let index = tableView.indexPath(for: cell) else { return }
            self.archiveMessage(at: index)
        }
        cell.onRead = { [weak self, weak cell] in
            guard let self, let cell, let index = tableView.indexPath(for: cell) else { return }
            self.toggleRead(at: index)
        }

        return cell
    }

    func scrollViewWillBeginDragging(_ scrollView: UIScrollView) {
        // Close any open cell when starting to scroll
        openCell?.closeActions()
        openCell = nil
    }

    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        76
    }

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
    }
}

extension testViewController: SwipeableMessageCellDelegate {
    func swipeCellDidBeginReveal(_ cell: SwipeableMessageCell) {
        // If another cell is open, close it
        if openCell !== cell {
            openCell?.closeActions()
            openCell = cell
        }
    }

    func swipeCellDidClose(_ cell: SwipeableMessageCell) {
        if openCell === cell {
            openCell = nil
        }
    }
}`;

// ─── Default Export ─────────────────────────────────────────────────

export default function TableView() {
  const tableViewStyles = [
    {
      title: "Normal Table View",
      description:
        "iOS Settings-style grouped table view with sections, icons, and chevron accessories.",
      preview: <NormalTablePreview />,
      swiftCode: normalTableSwift,
    },
    {
      title: "Swipe to Edit & Delete",
      description:
        "Swipe a row left to reveal Edit and Delete action buttons with spring physics.",
      preview: <SwipeEditDeletePreview />,
      swiftCode: swipeEditDeleteSwift,
    },
    {
      title: "Telegram-style Swipe Actions",
      description:
        "Swipe left for Delete, Pin, and Archive. Swipe right for Read. Full swipe to archive.",
      preview: <TelegramSwipePreview />,
      swiftCode: telegramSwipeSwift,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Table View</h2>
        <p className="text-neutral-500 mt-1">
          iOS-style table view with sections, swipe actions, and Telegram-style gestures.
        </p>
      </div>
      <div className="space-y-4">
        {tableViewStyles.map((style) => (
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
