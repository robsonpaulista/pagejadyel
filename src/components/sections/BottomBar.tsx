import { useEffect, useState } from "react";
import "./BottomBar.css";

type CauseLink = {
  label: string;
  href: string;
  accent: "yellow" | "blue" | "pink" | "orange" | "purple" | "amber";
};

const CAUSE_LINKS: CauseLink[] = [
  { label: "Jadyel", href: "#numeros-do-mandato", accent: "yellow" },
  { label: "ECA Digital", href: "#eca-digital", accent: "blue" },
  { label: "Hospital de Amor", href: "#hospital-de-amor", accent: "pink" },
  { label: "Causa Animal", href: "#pacto-pelos-animais", accent: "orange" },
  { label: "Catarata", href: "#mutirao-da-catarata", accent: "purple" },
  { label: "Infraestrutura", href: "#infraestrutura", accent: "amber" },
];

function sectionIdFromHref(href: string): string {
  return href.replace("#", "");
}

export function BottomBar() {
  const [activeHref, setActiveHref] = useState<string>(CAUSE_LINKS[0].href);

  useEffect(() => {
    const sections = CAUSE_LINKS.map((link) =>
      document.getElementById(sectionIdFromHref(link.href)),
    ).filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }

        let bestId = sectionIdFromHref(CAUSE_LINKS[0].href);
        let bestRatio = -1;

        for (const link of CAUSE_LINKS) {
          const id = sectionIdFromHref(link.href);
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestRatio > 0) {
          setActiveHref(`#${bestId}`);
        }
      },
      {
        // Compensa a barra superior e favorece o miolo da viewport
        rootMargin: "-18% 0px -42% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75],
      },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="bottom-bar" aria-label="Navegação da campanha">
      <div className="bottom-bar__inner">
        <ul className="bottom-bar__list">
          {CAUSE_LINKS.map((cause, index) => {
            const isActive = activeHref === cause.href;

            return (
              <li key={cause.href} className="bottom-bar__item">
                {index > 0 ? (
                  <span className="bottom-bar__sep" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <a
                  className={[
                    "bottom-bar__link",
                    isActive ? "bottom-bar__link--active" : null,
                    isActive ? `bottom-bar__link--${cause.accent}` : null,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  href={cause.href}
                  aria-current={isActive ? "true" : undefined}
                >
                  {cause.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
