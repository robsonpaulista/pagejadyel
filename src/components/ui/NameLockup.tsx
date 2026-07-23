import "./NameLockup.css";

type NameLockupProps = {
  className?: string;
  compact?: boolean;
  subline?: boolean;
};

/** Assinatura do candidato: chip, nome e subline opcional. */
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
      <p className="name-lockup__chip">
        <span className="name-lockup__chip-badge">Dep. Federal</span>
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
