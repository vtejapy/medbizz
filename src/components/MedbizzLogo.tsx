type Props = { className?: string };

export function MedbizzLogo({ className = "h-10 w-auto" }: Props) {
  return (
    <img
      src="/medbizz-logo.png"
      alt="medbizz Consulting logo"
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}
