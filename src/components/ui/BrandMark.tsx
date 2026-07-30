import "./BrandMark.css";

type BrandMarkProps = {
  className?: string;
};

/** Logomarca compacta — assinatura Jadyel Alencar para as seções. */
export function BrandMark({ className }: BrandMarkProps) {
  return (
    <div
      className={["brand-mark", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <span className="brand-mark__chip">Dep. Federal</span>
      <p className="brand-mark__name">
        Jadyel
        <span className="brand-mark__surname">Alencar</span>
      </p>
    </div>
  );
}
