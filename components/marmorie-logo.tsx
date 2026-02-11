"use client"

export function MarmorieLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif tracking-[0.2em] ${className}`} aria-label="Marmorie">
      MARM
      <span className="relative inline-block">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="inline-block h-[0.65em] w-[0.65em] align-middle"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            cx="12"
            cy="3.5"
            r="2.2"
            fill="hsl(var(--primary))"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </span>
      RIE
    </span>
  )
}
