import type { HTMLAttributes } from "react";

type BrandLogoProps = HTMLAttributes<SVGElement> & {
  size?: number;
};

export function BrandLogo({ size = 24, className, ...props }: BrandLogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="12"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M14 32L24 10L34 32"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 24H30"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="34.5" cy="34.5" r="3.5" fill="currentColor" />
    </svg>
  );
}

type BrandWordmarkProps = {
  title?: string;
  subtitle?: string;
  iconSize?: number;
  className?: string;
};

export function BrandWordmark({
  title = "iOS Components",
  subtitle,
  iconSize = 24,
  className,
}: BrandWordmarkProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <BrandLogo size={iconSize} className="text-current" />
      <span className="leading-tight">
        <span className="block font-semibold tracking-tight">{title}</span>
        {subtitle ? (
          <span className="block text-xs text-neutral-500">{subtitle}</span>
        ) : null}
      </span>
    </span>
  );
}
