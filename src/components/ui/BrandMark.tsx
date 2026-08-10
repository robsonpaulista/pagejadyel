import "./BrandMark.css";

type BrandMarkProps = {
  className?: string;
};

const OFFICE_LABEL = "DEPUTADO FEDERAL";

/** Logomarca compacta — assinatura Jadyel Alencar para as seções. */
export function BrandMark({ className }: BrandMarkProps) {
  return (
    <div
      className={["brand-mark", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <span className="brand-mark__chip">
        {Array.from(OFFICE_LABEL).map((char, index) => (
          <span
            key={`${char}-${index}`}
            className={char === " " ? "brand-mark__chip-space" : undefined}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      <p className="brand-mark__name">
        Jadyel
        <span className="brand-mark__surname">Alencar</span>
      </p>
    </div>
  );
}
