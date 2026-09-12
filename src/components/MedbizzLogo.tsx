import logoAsset from "@/assets/medbizz-logo.png.asset.json";

type Props = { className?: string };

export function MedbizzLogo({ className = "h-10 w-auto" }: Props) {
  return (
    <img
      src={logoAsset.url}
      alt="medbizz Consulting logo"
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}
