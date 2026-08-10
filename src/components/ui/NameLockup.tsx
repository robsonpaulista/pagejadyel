import "./NameLockup.css";

type NameLockupProps = {
  className?: string;
  compact?: boolean;
  subline?: boolean;
};

const OFFICE_LABEL = "DEPUTADO FEDERAL";

/** Assinatura do candidato: cargo, nome e subline opcional. */
export function NameLockup({
  className,
  compact = false,
  subline = true,
}: NameLockupProps) {
  return (
    <div
      className={[
        "name-lockup",
        compact ? "name-lockup--compact" : null,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="name-lockup__chip" aria-label="Deputado Federal">
        <span className="name-lockup__chip-badge" aria-hidden="true">
          {Array.from(OFFICE_LABEL).map((char, index) => (
            <span
              key={`${char}-${index}`}
              className={
                char === " " ? "name-lockup__chip-space" : undefined
              }
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </p>

      <p className="name-lockup__name">
        Jadyel <span className="name-lockup__surname">Alencar</span>
      </p>

      {subline && (
        <p className="name-lockup__subline">
          O mesmo que cuida das famílias piauienses.
        </p>
      )}
    </div>
  );
}
