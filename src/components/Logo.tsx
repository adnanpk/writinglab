export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#0F172A" />
      <path d="M26 14H38M29 14V23L19 42C17.8 44.3 19.5 47 22.1 47H41.9C44.5 47 46.2 44.3 45 42L35 23V14" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 25L27 36L32 41L37 36L32 25Z" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="34" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5" dir="ltr">
      <LogoMark />
      <span className={`whitespace-nowrap font-heading text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        Writing <span className="text-cobalt-fg">Lab</span>
      </span>
    </span>
  );
}
