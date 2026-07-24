import { Menu, X } from "lucide-react";
import { useEffect, useId, useState, type MouseEvent } from "react";
import { scrollToElement } from "../../lib/lenisBridge";
import "./BottomBar.css";

type CauseLink = {
  label: string;
  /** Hash da causa (menu / URL) */
  href: string;
  /** Primeira página da causa — destino real do clique */
  entryId: string;
  accent: "yellow" | "blue" | "pink" | "orange" | "purple" | "amber";
};

const CAUSE_LINKS: CauseLink[] = [
  {
    label: "Jadyel",
    href: "#numeros-do-mandato",
    entryId: "nmand-abertura",
    accent: "yellow",
  },
  {
    label: "ECA Digital",
    href: "#eca-digital",
    entryId: "eca-pratica",
    accent: "blue",
  },
  {
    label: "Hospital de Amor",
    href: "#hospital-de-amor",
    entryId: "hospital-cta",
    accent: "pink",
  },
  {
    label: "Causa Animal",
    href: "#pacto-pelos-animais",
    entryId: "animal-politica",
    accent: "orange",
  },
  {
    label: "Catarata",
    href: "#mutirao-da-catarata",
    entryId: "catarata-abertura",
    accent: "purple",
  },
  {
    label: "Infraestrutura",
    href: "#infraestrutura",
    entryId: "infra-abertura",
    accent: "amber",
  },
];

function sectionIdFromHref(href: string): string {
  return href.replace("#", "");
}

function navOffset(): number {
  return (
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
    ) || 52
  );
}

/** Menu = salto para a capa da causa. Scroll handoff é outra trilha. */
function goToCauseEntry(link: CauseLink): void {
  const target =
    document.getElementById(link.entryId) ??
    document.getElementById(sectionIdFromHref(link.href));
  if (!target) return;

  scrollToElement(target, {
    offset: -navOffset(),
    immediate: true,
  });

  const { pathname, search } = window.location;
  window.history.pushState(null, "", `${pathname}${search}${link.href}`);
}

export function BottomBar() {
  const menuId = useId();
  const [activeHref, setActiveHref] = useState<string>(CAUSE_LINKS[0].href);
  const [menuOpen, setMenuOpen] = useState(false);

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
        rootMargin: "-18% 0px -42% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75],
      },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleClick(event: MouseEvent<HTMLAnchorElement>, link: CauseLink) {
    event.preventDefault();
    setActiveHref(link.href);
    setMenuOpen(false);
    goToCauseEntry(link);
  }

  return (
    <nav className="bottom-bar" aria-label="Navegação da campanha">
      <div className="bottom-bar__inner">
        <div className="bottom-bar__mobile">
          <a
            className="bottom-bar__brand"
            href="#abertura"
            onClick={(event) => {
              event.preventDefault();
              setMenuOpen(false);
              const home = document.getElementById("abertura");
              if (home) {
                scrollToElement(home, {
                  offset: -navOffset(),
                  immediate: true,
                });
              }
              const { pathname, search } = window.location;
              window.history.pushState(null, "", `${pathname}${search}`);
            }}
          >
            Jadyel
          </a>
          <button
            type="button"
            className="bottom-bar__toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X size={22} strokeWidth={2.25} aria-hidden />
            ) : (
              <Menu size={22} strokeWidth={2.25} aria-hidden />
            )}
          </button>
        </div>

        <ul className="bottom-bar__list bottom-bar__list--desktop">
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
                  onClick={(event) => handleClick(event, cause)}
                >
                  {cause.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className={[
          "bottom-bar__drawer",
          menuOpen ? "bottom-bar__drawer--open" : null,
        ]
          .filter(Boolean)
          .join(" ")}
        id={menuId}
        hidden={!menuOpen}
      >
        <button
          type="button"
          className="bottom-bar__backdrop"
          aria-label="Fechar menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        />
        <ul className="bottom-bar__drawer-list">
          {CAUSE_LINKS.map((cause) => {
            const isActive = activeHref === cause.href;

            return (
              <li key={cause.href}>
                <a
                  className={[
                    "bottom-bar__drawer-link",
                    isActive ? "bottom-bar__drawer-link--active" : null,
                    isActive
                      ? `bottom-bar__drawer-link--${cause.accent}`
                      : null,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  href={cause.href}
                  aria-current={isActive ? "true" : undefined}
                  onClick={(event) => handleClick(event, cause)}
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
