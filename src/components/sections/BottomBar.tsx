import { Home, Menu, X } from "lucide-react";
import { useEffect, useId, useState, type MouseEvent } from "react";
import { scrollToElement } from "../../lib/lenisBridge";
import "./BottomBar.css";

const HOME_HREF = "#abertura";
const HOME_ID = "abertura";

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
    label: "Mandato",
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

function goHome(): void {
  const home = document.getElementById(HOME_ID);
  if (!home) return;

  scrollToElement(home, {
    offset: -navOffset(),
    immediate: true,
  });

  const { pathname, search } = window.location;
  window.history.pushState(null, "", `${pathname}${search}`);
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
  const [activeHref, setActiveHref] = useState<string>(HOME_HREF);
  const [menuOpen, setMenuOpen] = useState(false);
  const homeActive = activeHref === HOME_HREF;

  useEffect(() => {
    const trackedIds = [
      HOME_ID,
      ...CAUSE_LINKS.map((link) => sectionIdFromHref(link.href)),
    ];
    const sections = trackedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }

        let bestId = HOME_ID;
        let bestRatio = -1;

        for (const id of trackedIds) {
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

  function handleHomeClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setActiveHref(HOME_HREF);
    document.body.style.overflow = "";
    setMenuOpen(false);
    requestAnimationFrame(() => {
      goHome();
    });
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>, link: CauseLink) {
    event.preventDefault();
    setActiveHref(link.href);
    document.body.style.overflow = "";
    setMenuOpen(false);
    requestAnimationFrame(() => {
      goToCauseEntry(link);
    });
  }

  return (
    <nav className="bottom-bar" aria-label="Navegação da campanha">
      <div className="bottom-bar__inner">
        <a
          className="bottom-bar__brand"
          href={HOME_HREF}
          aria-label="Jadyel Alencar — Início"
          onClick={handleHomeClick}
        >
          <span className="bottom-bar__brand-chip" aria-hidden="true">
            {Array.from("DEPUTADO FEDERAL").map((char, index) => (
              <span
                key={`${char}-${index}`}
                className={
                  char === " " ? "bottom-bar__brand-chip-space" : undefined
                }
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
          <span className="bottom-bar__brand-name">
            Jadyel <span className="bottom-bar__brand-surname">Alencar</span>
          </span>
        </a>

        <div className="bottom-bar__mobile">
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
          <li className="bottom-bar__item">
            <a
              className={[
                "bottom-bar__home",
                homeActive ? "bottom-bar__home--active" : null,
              ]
                .filter(Boolean)
                .join(" ")}
              href={HOME_HREF}
              aria-label="Início"
              aria-current={homeActive ? "page" : undefined}
              onClick={handleHomeClick}
            >
              <Home size={18} strokeWidth={2.25} aria-hidden />
            </a>
          </li>
          {CAUSE_LINKS.map((cause) => {
            const isActive = activeHref === cause.href;

            return (
              <li key={cause.href} className="bottom-bar__item">
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
          <li>
            <a
              className={[
                "bottom-bar__drawer-link",
                "bottom-bar__drawer-link--home",
                homeActive ? "bottom-bar__drawer-link--active" : null,
                homeActive ? "bottom-bar__drawer-link--yellow" : null,
              ]
                .filter(Boolean)
                .join(" ")}
              href={HOME_HREF}
              aria-current={homeActive ? "page" : undefined}
              onClick={handleHomeClick}
            >
              <Home size={18} strokeWidth={2.25} aria-hidden />
              <span>Início</span>
            </a>
          </li>
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
