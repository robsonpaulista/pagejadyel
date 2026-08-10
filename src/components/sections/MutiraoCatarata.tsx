import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { Reveal } from "../Reveal";
import { MiniScreensHandoff } from "../MiniScreensHandoff";
import {
  CATARATA_PREVIEWS,
  INFRA_PREVIEWS,
} from "../miniScreenPreviews";
import {
  Container,
  Highlight,
  SectionTag,
} from "../ui";
import { useCountUp } from "../../hooks/useCountUp";
import { scrollToElement } from "../../lib/lenisBridge";
import catarataPhoto from "../../assets/cataratanova.png";
import { SectionContact } from "../SectionContact";
import "./MutiraoCatarata.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const SURGERIES = 20_000;

const PILLARS = [
  {
    title: "Atendimento",
    body: "Triagem e avaliação para identificar quem precisava da cirurgia.",
  },
  {
    title: "Cirurgia",
    body: "Procedimento realizado de forma acessível e organizada.",
  },
  {
    title: "Autonomia",
    body: "Mais liberdade para caminhar, ler, trabalhar e viver com segurança.",
  },
] as const;

const HIGHLIGHTS = [
  {
    value: "+20 mil",
    label: "cirurgias realizadas",
  },
  {
    value: "Mutirões",
    label: "em várias regiões do Piauí",
  },
  {
    value: "Famílias",
    label: "com mais qualidade de vida",
  },
] as const;

const IMPACTS = [
  {
    title: "Reconhecer quem ama",
    body: "Ver com clareza os rostos da família e das pessoas próximas.",
  },
  {
    title: "Retomar a rotina",
    body: "Ler, caminhar, cozinhar e sair de casa com mais confiança.",
  },
  {
    title: "Viver com mais dignidade",
    body: "Mais autoestima, independência e qualidade de vida.",
  },
] as const;

function navOffset(): number {
  return (
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
    ) || 52
  );
}

function SurgeriesCounter() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const count = useCountUp({
    to: SURGERIES,
    enabled: Boolean(inView || reduceMotion),
    reduceMotion: Boolean(reduceMotion),
    duration: 1600,
  });

  return (
    <div className="catarata-score" ref={ref}>
      <p className="catarata-score__value" aria-live="polite">
        +{count.toLocaleString("pt-BR")}
      </p>
      <p className="catarata-score__label">cirurgias realizadas</p>
      <p className="catarata-score__updated">
        Novos começos em diferentes regiões do Piauí
      </p>
    </div>
  );
}

/** 1 — Capa → Impacto */
function CatarataHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const show = Boolean(reduceMotion || inView);

  function goToStory(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const target = document.getElementById("catarata-impacto");
    if (!target) return;
    scrollToElement(target, {
      offset: -navOffset(),
      immediate: true,
    });
    const { pathname, search } = window.location;
    window.history.pushState(null, "", `${pathname}${search}#catarata-impacto`);
  }

  return (
    <MiniScreensHandoff
      id="catarata-abertura"
      targetId="catarata-impacto"
      label="Catarata em quatro telas"
      bandMax="30%"
      previews={CATARATA_PREVIEWS}
      activeIndex={1}
      pinClassName="catarata-hero"
      className="catarata-hero-track"
      aria-labelledby="catarata-heading"
    >
      <div className="catarata-hero__stage" ref={ref}>
        <motion.img
          className="catarata-hero__photo"
          src={catarataPhoto}
          alt="Atendimento em mutirão de catarata — cuidado e recuperação da visão"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        />
        <motion.div
          className="catarata-hero__fade"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0.4 }}
          animate={show ? { opacity: 1 } : { opacity: 0.4 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
        />

        <Container className="catarata-hero__shell">
          <div className="catarata-hero__copy">
            <motion.div
              className="catarata-hero__meta"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <p className="catarata-hero__index">
                <span className="catarata-hero__index-num">05</span>
                <span className="catarata-hero__index-sep">/</span>
                <span>Mutirões de Catarata</span>
              </p>
            </motion.div>

            <h2 id="catarata-heading" className="headline catarata-hero__headline">
              <motion.span
                className="catarata-hero__line"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.14 }}
              >
                Devolver a visão é devolver
                <br />
                <Highlight color="purple">autonomia</Highlight>, dignidade e{" "}
                <Highlight color="purple">esperança</Highlight>.
              </motion.span>
            </h2>

            <motion.p
              className="lede catarata-hero__lede"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.32 }}
            >
              Com os mutirões de catarata, o mandato ajudou a ampliar o acesso à
              cirurgia e a devolver visão, autoestima e qualidade de vida para
              milhares de piauienses. É um cuidado que transforma a rotina,
              resgata a independência e devolve segurança para seguir em frente.
            </motion.p>

            <motion.p
              className="catarata-hero__proof"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.42 }}
            >
              <span className="catarata-hero__proof-value">20 mil+</span>
              <span className="catarata-hero__proof-label">
                cirurgias realizadas
              </span>
            </motion.p>

            <motion.a
              className="catarata-hero__cta"
              href="#catarata-impacto"
              onClick={goToStory}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.52 }}
            >
              Conheça essa história
              <span className="catarata-hero__cta-arrow" aria-hidden="true">
                →
              </span>
            </motion.a>

            <SectionContact className="catarata-hero__contact" />
          </div>
        </Container>
      </div>
    </MiniScreensHandoff>
  );
}

/** 2 — Impacto → Números */
function CatarataPractice() {
  return (
    <MiniScreensHandoff
      id="catarata-impacto"
      targetId="catarata-vidas"
      label="Catarata em quatro telas"
      bandMax="30%"
      previews={CATARATA_PREVIEWS}
      activeIndex={2}
      pinClassName="catarata-practice"
      className="catarata-practice-track"
      aria-labelledby="catarata-practice-heading"
    >
      <Container className="catarata-practice__shell">
        <Reveal>
          <SectionTag className="catarata-tag" label="Mutirões de Catarata na prática" />
          <h3
            id="catarata-practice-heading"
            className="headline catarata-practice__title"
          >
            Mais de{" "}
            <Highlight color="purple">20 mil</Highlight> novos começos.
          </h3>
          <p className="lede catarata-practice__lede">
            Os mutirões levaram atendimento, avaliação e cirurgia para mais
            perto de quem precisava, devolvendo independência a milhares de
            pessoas em diferentes regiões do Piauí.
          </p>
        </Reveal>

        <div className="catarata-path" aria-hidden="true">
          <span>Atendimento</span>
          <span className="catarata-path__arrow">→</span>
          <span>Cirurgia</span>
          <span className="catarata-path__arrow">→</span>
          <span>Nova vida</span>
        </div>

        <div className="catarata-practice__pillars">
          {PILLARS.map((item, index) => (
            <Reveal
              key={item.title}
              delay={0.06 * index}
              className="catarata-practice__pillar"
            >
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="catarata-highlights">
          {HIGHLIGHTS.map((item, index) => (
            <Reveal
              key={item.value}
              delay={0.06 * index}
              className="catarata-highlight"
            >
              <p className="catarata-highlight__value">{item.value}</p>
              <p className="catarata-highlight__label">{item.label}</p>
            </Reveal>
          ))}
        </div>

        <SectionContact />
      </Container>
    </MiniScreensHandoff>
  );
}

/** 3 — Números → Infraestrutura */
function CatarataNumbers() {
  return (
    <MiniScreensHandoff
      id="catarata-vidas"
      targetId="infra-abertura"
      label="Próxima causa · Infraestrutura"
      bandMax="30%"
      previews={INFRA_PREVIEWS}
      activeIndex={0}
      pinClassName="catarata-numbers"
      className="catarata-numbers-track"
      aria-labelledby="catarata-numbers-heading"
    >
      <Container className="catarata-numbers__shell">
        <div className="catarata-numbers__board">
          <Reveal>
            <SectionTag
              className="catarata-tag catarata-tag--on-dark"
              label="Mutirões de Catarata em números"
            />
            <h3
              id="catarata-numbers-heading"
              className="headline catarata-numbers__title"
            >
              Voltar a enxergar é voltar a{" "}
              <Highlight color="purple">viver</Highlight>.
            </h3>
            <p className="lede catarata-numbers__lede">
              Quando a visão volta, voltam também a autonomia, a segurança e a
              alegria de realizar coisas simples do dia a dia.
            </p>
          </Reveal>

          <SurgeriesCounter />

          <div className="catarata-numbers__impacts">
            <p className="catarata-numbers__impacts-label">
              O que muda na vida
            </p>
            <ul className="catarata-numbers__list">
              {IMPACTS.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="catarata-numbers__close">
          <p className="catarata-numbers__mandate">
            <strong>Papel do mandato:</strong> investimento, articulação e
            presença para levar os mutirões a quem mais precisava.
          </p>
          <h4 className="catarata-numbers__close-title">
            Porque cuidar também é ajudar as pessoas a enxergarem novos
            caminhos.
          </h4>
        </Reveal>

        <SectionContact tone="dark" />
      </Container>
    </MiniScreensHandoff>
  );
}

export function MutiraoCatarata() {
  return (
    <div id="mutirao-da-catarata" className="catarata-page">
      <CatarataHero />
      <CatarataPractice />
      <CatarataNumbers />
    </div>
  );
}
