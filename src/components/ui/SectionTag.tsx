import "./SectionTag.css";

type SectionTagProps = {
  number?: string;
  label: string;
  className?: string;
};

export function SectionTag({ number, label, className }: SectionTagProps) {
  return (
    <p className={["section-tag", className].filter(Boolean).join(" ")}>
      {number ? <span className="section-tag__num">{number}</span> : null}
      <span className="section-tag__label">{label}</span>
    </p>
  );
}
