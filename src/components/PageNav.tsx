import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { refreshScrollLayout, scrollToElement } from "../lib/lenisBridge";
import {
  HOME_PAGE_ID,
  STORY_PAGES,
  type StoryPage,
} from "../lib/storyPages";
import "./PageNav.css";

function navOffset(): number {
  return (
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
    ) || 52
  );
}

function goToPage(page: StoryPage): void {
  const target = document.getElementById(page.id);
  if (!target) return;

  document.body.style.overflow = "";
  refreshScrollLayout();
  scrollToElement(target, {
    offset: -navOffset(),
    immediate: true,
  });

  const hash =
    page.id === HOME_PAGE_ID ? "" : `#${page.id}`;
  const { pathname, search } = window.location;
  window.history.pushState(null, "", `${pathname}${search}${hash}`);
}

/**
 * Barra amarela inferior — anterior / próxima.
 * Oculta na splash (z-index) e na home.
 */
export function PageNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const nodes = STORY_PAGES.map((page) =>
      document.getElementById(page.id),
    ).filter((el): el is HTMLElement => Boolean(el));

    if (nodes.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }

        let bestId = STORY_PAGES[0].id;
        let bestRatio = -1;

        for (const page of STORY_PAGES) {
          const ratio = ratios.get(page.id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = page.id;
          }
        }

        if (bestRatio > 0) {
          const index = STORY_PAGES.findIndex((p) => p.id === bestId);
          if (index >= 0) setActiveIndex(index);
        }
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const isHome = activeIndex <= 0;
  const prev = activeIndex > 0 ? STORY_PAGES[activeIndex - 1] : null;
  const next =
    activeIndex < STORY_PAGES.length - 1
      ? STORY_PAGES[activeIndex + 1]
      : null;
  const current = STORY_PAGES[activeIndex];

  useEffect(() => {
    document.documentElement.classList.toggle("has-page-nav", !isHome);
    return () => document.documentElement.classList.remove("has-page-nav");
  }, [isHome]);

  if (isHome) return null;

  return (
    <nav className="page-nav" aria-label="Navegação entre páginas">
      <div className="page-nav__main">
        <button
          type="button"
          className="page-nav__side page-nav__side--prev"
          disabled={!prev}
          onClick={() => prev && goToPage(prev)}
          aria-label={prev ? `Página anterior: ${prev.label}` : undefined}
        >
          <span className="page-nav__kicker">Anterior</span>
          <span className="page-nav__label">{prev?.label ?? "—"}</span>
        </button>

        <p className="page-nav__current" aria-current="page">
          <span className="page-nav__kicker">Agora</span>
          <span className="page-nav__label">{current.label}</span>
        </p>

        <button
          type="button"
          className="page-nav__side page-nav__side--next"
          disabled={!next}
          onClick={() => next && goToPage(next)}
          aria-label={next ? `Próxima página: ${next.label}` : undefined}
        >
          <span className="page-nav__kicker">Próxima</span>
          <span className="page-nav__label">{next?.label ?? "—"}</span>
        </button>
      </div>

      <div className="page-nav__controls">
        <button
          type="button"
          className="page-nav__chev"
          disabled={!prev}
          onClick={() => prev && goToPage(prev)}
          aria-label={prev ? `Ir para ${prev.label}` : "Sem página anterior"}
        >
          <ChevronLeft size={22} strokeWidth={2.25} aria-hidden />
        </button>
        <button
          type="button"
          className="page-nav__chev"
          disabled={!next}
          onClick={() => next && goToPage(next)}
          aria-label={next ? `Ir para ${next.label}` : "Sem próxima página"}
        >
          <ChevronRight size={22} strokeWidth={2.25} aria-hidden />
        </button>
      </div>
    </nav>
  );
}
