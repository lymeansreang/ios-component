"use client";

type Status = "online" | "away" | "offline";

export interface AvatarViewProps {
  src?: string;
  alt?: string;
  size?: number;
  status?: Status;
}

const statusColor: Record<Status, string> = {
  online: "bg-emerald-500",
  away: "bg-amber-500",
  offline: "bg-neutral-400",
};

export default function AvatarView({
  src = "/globe.svg",
  alt = "Avatar",
  size = 56,
  status = "online",
}: AvatarViewProps) {
  return (
    <div className="relative inline-flex" style={{ width: size, height: size }}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full rounded-full object-cover border border-neutral-300 dark:border-neutral-700"
      />
      <span
        className={`absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-neutral-950 ${statusColor[status]}`}
      />
    </div>
  );
}
