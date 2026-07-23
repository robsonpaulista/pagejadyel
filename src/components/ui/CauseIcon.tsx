export type CauseIconName = "heart" | "paw" | "eye" | "shield" | "road";

type CauseIconProps = {
  name: CauseIconName;
  size?: number;
};

const PATHS: Record<CauseIconName, React.ReactNode> = {
  heart: (
    <path d="M12 20s-7-4.4-9-8.8C1.5 7.7 4 4.5 7.5 4.5c2 0 3.5 1 4.5 2.6 1-1.6 2.5-2.6 4.5-2.6 3.5 0 6 3.2 4.5 6.7-2 4.4-9 8.8-9 8.8z" />
  ),
  paw: (
    <>
      <circle cx="7" cy="8" r="1.7" />
      <circle cx="12" cy="6.4" r="1.7" />
      <circle cx="17" cy="8" r="1.7" />
      <path d="M12 11.5c2.9 0 5.3 2.1 5.3 4.4 0 1.5-1.2 2.7-2.8 2.7-.9 0-1.7-.4-2.5-.4s-1.6.4-2.5.4c-1.6 0-2.8-1.2-2.8-2.7 0-2.3 2.4-4.4 5.3-4.4z" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  shield: (
    <path d="M12 3l7 2.5v5.2c0 4.6-3 8.4-7 10.3-4-1.9-7-5.7-7-10.3V5.5L12 3z" />
  ),
  road: (
    <>
      <path d="M4 20L9 4h2L7.5 20H4z" />
      <path d="M20 20L15 4h-2l3.5 16H20z" />
      <path d="M12 7v2M12 12v2M12 17v2" />
    </>
  ),
};

export function CauseIcon({ name, size = 24 }: CauseIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
