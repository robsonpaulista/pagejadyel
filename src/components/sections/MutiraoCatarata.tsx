import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
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
import catarataPhoto from "../../assets/catarata.jpg";
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
  const show = reduceMotion || inView;

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
          alt="Paciente e acompanhante em mutirão de catarata, em momento de cuidado e esperança"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, filter: "blur(16px)", scale: 1.06 }
          }
          animate={
            show
              ? { opacity: 1, filter: "blur(0px)", scale: 1 }
              : { opacity: 0, filter: "blur(16px)", scale: 1.06 }
          }
          transition={{ duration: 1.1, ease: EASE }}
        />
        <motion.div
          className="catarata-hero__fade"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0.35 }}
          animate={show ? { opacity: 1 } : { opacity: 0.35 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
        />
        <motion.div
          className="catarata-hero__glow"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.25 }}
        />

        <Container className="catarata-hero__shell">
          <div className="catarata-hero__copy">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
            >
              <SectionTag
                className="catarata-hero__tag"
                label="Mutirões de Catarata"
              />
            </motion.div>

            <h2 id="catarata-heading" className="headline catarata-hero__headline">
              <motion.span
                className="catarata-hero__line"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
              >
                Devolvendo{" "}
                <Highlight color="purple">visão</Highlight>,
              </motion.span>
              <br />
              <motion.span
                className="catarata-hero__line"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.42 }}
              >
                devolvendo{" "}
                <Highlight color="purple">esperança</Highlight>.
              </motion.span>
            </h2>

            <motion.p
              className="lede catarata-hero__lede"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.55 }}
            >
              Mais de 20 mil cirurgias realizadas, recuperando autonomia,
              autoestima e qualidade de vida para milhares de piauienses.
            </motion.p>
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
          <SectionTag className="catarata-tag" label="Na prática" />
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
              label="Em números"
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
