import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../Reveal";
import { PiauiRoadsMap } from "../PiauiRoadsMap";
import { MiniScreensHandoff } from "../MiniScreensHandoff";
import {
  CALL_PREVIEWS,
  INFRA_PREVIEWS,
} from "../miniScreenPreviews";
import {
  Container,
  Highlight,
  SectionTag,
} from "../ui";
import { useCountUp } from "../../hooks/useCountUp";
import tratorMark from "../../assets/bandeiras/trator.webp";
import "./Infraestrutura.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const WORK_TYPES = [
  {
    title: "Asfalto",
    body: "Vias urbanas e conexões regionais com mais mobilidade, segurança e valorização dos bairros.",
  },
  {
    title: "Paralelepípedo",
    body: "Calçamentos que organizam o espaço público e aproximam o cuidado das ruas do cotidiano.",
  },
  {
    title: "Equipamentos",
    body: "Praças, pontes, UBS e obras que levam dignidade e desenvolvimento a todas as regiões.",
  },
] as const;

const HIGHLIGHTS = [
  { value: "R$ 10 mi", label: "em asfalto articulados em Picos" },
  { value: "130 mil m²", label: "de pavimentação asfáltica prevista" },
  { value: "224", label: "municípios no mapa do cuidado" },
] as const;

function SquareMetersCounter() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const count = useCountUp({
    to: 130_000,
    enabled: Boolean(inView || reduceMotion),
    reduceMotion: Boolean(reduceMotion),
    duration: 1700,
  });

  return (
    <div className="infra-score" ref={ref}>
      <p className="infra-score__value" aria-live="polite">
        {count.toLocaleString("pt-BR")} m²
      </p>
      <p className="infra-score__label">de asfalto em obras articuladas</p>
      <p className="infra-score__updated">Exemplo: investimento em Picos</p>
    </div>
  );
}

/** 1 — Capa → Mapa */
function InfraHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const show = reduceMotion || inView;

  return (
    <MiniScreensHandoff
      id="infra-abertura"
      targetId="infra-mapa"
      label="Infraestrutura em quatro telas"
      bandMax="30%"
      previews={INFRA_PREVIEWS}
      activeIndex={1}
      pinClassName="infra-hero"
      className="infra-hero-track"
      aria-labelledby="infra-heading"
    >
      <div className="infra-hero__stage" ref={ref}>
        <div className="infra-hero__visual" aria-hidden="true">
          <motion.img
            className="infra-hero__mark"
            src={tratorMark}
            alt=""
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 24, filter: "blur(12px)" }
            }
            animate={
              show
                ? { opacity: 0.16, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 24, filter: "blur(12px)" }
            }
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          />
          <motion.span
            className="infra-hero__glow"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={show ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          />
        </div>
        <div className="infra-hero__fade" aria-hidden="true" />

        <Container className="infra-hero__shell">
          <div className="infra-hero__copy">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
            >
              <SectionTag className="infra-hero__tag" label="Infraestrutura" />
            </motion.div>

            <h2 id="infra-heading" className="headline infra-hero__headline">
              <motion.span
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
              >
                Mais{" "}
                <Highlight color="amber">infraestrutura</Highlight>,
              </motion.span>
              <br />
              <motion.span
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.42 }}
              >
                mais dignidade.
              </motion.span>
            </h2>

            <motion.p
              className="lede infra-hero__lede"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.55 }}
            >
              Asfalto, calçamento, praças, pontes, UBS e muito mais para levar
              desenvolvimento a todas as regiões do Piauí — rua a rua, cidade a
              cidade.
            </motion.p>
          </div>
        </Container>
      </div>
    </MiniScreensHandoff>
  );
}

/** 2 — Mapa → Números */
function InfraMap() {
  return (
    <MiniScreensHandoff
      id="infra-mapa"
      targetId="infra-numeros"
      label="Infraestrutura em quatro telas"
      bandMax="30%"
      previews={INFRA_PREVIEWS}
      activeIndex={2}
      pinClassName="infra-map"
      className="infra-map-track"
      aria-labelledby="infra-map-heading"
    >
      <Container className="infra-map__shell">
        <div className="infra-map__copy">
          <Reveal>
            <SectionTag className="infra-tag" label="O mapa das obras" />
            <h3 id="infra-map-heading" className="headline infra-map__title">
              O Piauí ganha{" "}
              <Highlight color="amber">caminho</Highlight>.
            </h3>
            <p className="lede infra-map__lede">
              De norte a sul, a obra liga as maiores cidades — as divisorias
              municipais no mapa, o caminho abrindo o estado.
            </p>
          </Reveal>

          <div className="infra-map__pillars">
            {WORK_TYPES.map((item, index) => (
              <Reveal
                key={item.title}
                delay={0.06 * index}
                className="infra-map__pillar"
              >
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="infra-map__visual">
          <PiauiRoadsMap />
        </Reveal>
      </Container>
    </MiniScreensHandoff>
  );
}

/** 3 — Números → Call final */
function InfraNumbers() {
  return (
    <MiniScreensHandoff
      id="infra-numeros"
      targetId="participar"
      label="Continuar a jornada"
      bandMax="30%"
      previews={CALL_PREVIEWS}
      activeIndex={0}
      pinClassName="infra-numbers"
      className="infra-numbers-track"
      aria-labelledby="infra-numbers-heading"
    >
      <Container className="infra-numbers__shell">
        <div className="infra-numbers__board">
          <Reveal>
            <SectionTag
              className="infra-tag infra-tag--on-dark"
              label="Em números"
            />
            <h3
              id="infra-numbers-heading"
              className="headline infra-numbers__title"
            >
              Cada metro quadrado é um pedaço de{" "}
              <Highlight color="amber">dignidade</Highlight>.
            </h3>
            <p className="lede infra-numbers__lede">
              Investimento, articulação e presença para que a infraestrutura
              chegue onde a população precisa — do bairro à ligação entre
              municípios.
            </p>
          </Reveal>

          <SquareMetersCounter />

          <div className="infra-numbers__reach">
            <p className="infra-numbers__reach-label">Destaques</p>
            <dl className="infra-score__meta">
              {HIGHLIGHTS.map((item) => (
                <div key={item.value}>
                  <dt>{item.value}</dt>
                  <dd>{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <Reveal className="infra-numbers__close">
          <h4 className="infra-numbers__close-title">
            Porque desenvolver também é abrir caminho.
          </h4>
          <p className="infra-numbers__close-lede">
            Asfalto e paralelepípedo não são só obra: são dignidade chegando na
            porta de casa.
          </p>
        </Reveal>
      </Container>
    </MiniScreensHandoff>
  );
}

export function Infraestrutura() {
  return (
    <div id="infraestrutura" className="infra-page">
      <InfraHero />
      <InfraMap />
      <InfraNumbers />
    </div>
  );
}
