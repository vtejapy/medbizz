type Props = { className?: string };

export function MedbizzLogo({ className = "h-10 w-auto" }: Props) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className={className}
        aria-hidden="true"
      >
        <defs>
          <path
            id="medbizz-shield"
            d="M50 5 L12 22 V50 C12 75 50 95 50 95 C50 95 88 75 88 50 V22 Z"
          />
          <clipPath id="medbizz-shield-clip">
            <use href="#medbizz-shield" />
          </clipPath>
        </defs>
        <use href="#medbizz-shield" fill="#F4F6F8" />
        <g clipPath="url(#medbizz-shield-clip)">
          <rect x="50" y="0" width="50" height="100" fill="#214988" />
        </g>
        <use href="#medbizz-shield" stroke="#214988" strokeWidth={3} />
        <path
          d="M18 52 H32 L38 42 L46 68 L54 30 L62 60 H82"
          stroke="#C83232"
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-semibold tracking-tight text-foreground">
          medbizz
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Consulting
        </span>
      </span>
    </span>
  );
}
