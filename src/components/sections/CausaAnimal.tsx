import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  HeartPulse,
  Scale,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { Reveal } from "../Reveal";
import { MiniScreensHandoff } from "../MiniScreensHandoff";
import {
  ANIMAL_PREVIEWS,
  CATARATA_PREVIEWS,
} from "../miniScreenPreviews";
import {
  Button,
  Container,
  Highlight,
  SectionTag,
} from "../ui";
import { useCountUp } from "../../hooks/useCountUp";
import { scrollToElement } from "../../lib/lenisBridge";
import causaAnimalPhoto from "../../assets/causa-animal.jpg";
import "./CausaAnimal.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Balanço Semarh desde 2023, divulgado no lançamento do Pacto (jun/2026). */
const CASTRATIONS_DONE = 4877;
const CASTRATIONS_UPDATED = "julho de 2026";

const CARE_FEATURE_PILLARS: readonly {
  title: string;
  body: string;
  Icon: LucideIcon;
}[] = [
  {
    title: "Ética",
    body: "Controle populacional sem violência nem abandono.",
    Icon: Scale,
  },
  {
    title: "Rede",
    body: "Apoio a quem já cuida todos os dias.",
    Icon: Users,
  },
  {
    title: "Estado",
    body: "Política pública permanente, não só campanha.",
    Icon: Shield,
  },
];

const CARE_CARDS: readonly {
  seal: string;
  title: string;
  body: string;
  relevance: string;
  Icon: LucideIcon;
}[] = [
  {
    seal: "Saúde",
    title: "Castração e saúde",
    body: "Procedimentos gratuitos, atendimento veterinário e ações itinerantes para levar cuidado a diferentes regiões do estado.",
    relevance: "Cuidado que chega às cidades e reduz o abandono.",
    Icon: HeartPulse,
  },
  {
    seal: "Rede",
    title: "Apoio à rede protetora",
    body: "Ração Solidária, apoio a protetores independentes e fortalecimento das entidades que já realizam esse trabalho diariamente.",
    relevance: "Quem protege precisa de estrutura e parceria.",
    Icon: Users,
  },
  {
    seal: "Proteção",
    title: "Proteção e responsabilidade",
    body: "Ações integradas de combate aos maus-tratos, educação para a guarda responsável e conscientização da população.",
    relevance: "Mais fiscalização, educação e respeito à vida animal.",
    Icon: Shield,
  },
];

const MANDATE_ROLE = [
  {
    verb: "Idealizou",
    body: "o Festival É Pra Já Pet.",
  },
  {
    verb: "Investiu",
    body: "recursos para ampliar as ações de proteção animal.",
  },
  {
    verb: "Articulou",
    body: "a parceria que ajudou a transformar o cuidado em política pública permanente.",
  },
] as const;

function navOffset(): number {
  return (
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
    ) || 52
  );
}

function CastrationCounter() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const count = useCountUp({
    to: CASTRATIONS_DONE,
    enabled: Boolean(inView || reduceMotion),
    reduceMotion: Boolean(reduceMotion),
  });

  return (
    <div className="animal-score" ref={ref}>
      <p className="animal-score__value" aria-live="polite">
        {count.toLocaleString("pt-BR")}
      </p>
      <p className="animal-score__label">castrações realizadas</p>
      <p className="animal-score__updated">
        Dado atualizado em {CASTRATIONS_UPDATED}
      </p>
      <dl className="animal-score__meta">
        <div>
          <dt>Meta do Pacto</dt>
          <dd>20 mil castrações</dd>
        </div>
        <div>
          <dt>Alcance</dt>
          <dd>224 municípios</dd>
        </div>
        <div>
          <dt>Rede</dt>
          <dd>governo, protetores, entidades e sociedade</dd>
        </div>
      </dl>
    </div>
  );
}

/** Seção 1 — Capa emocional da causa animal */
function AnimalPolicy() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.28 });
  const show = Boolean(reduceMotion || inView);

  function goToStory(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const target = document.getElementById("animal-cuidado");
    if (!target) return;
    scrollToElement(target, {
      offset: -navOffset(),
      immediate: true,
    });
    const { pathname, search } = window.location;
    window.history.pushState(null, "", `${pathname}${search}#animal-cuidado`);
  }

  return (
    <MiniScreensHandoff
      id="animal-politica"
      targetId="animal-cuidado"
      label="Causa Animal em quatro telas"
      bandMax="30%"
      previews={ANIMAL_PREVIEWS}
      activeIndex={1}
      pinClassName="animal-policy"
      className="animal-policy-track"
      aria-labelledby="animal-policy-heading"
    >
      <div className="animal-policy__stage" ref={ref}>
        <motion.img
          className="animal-policy__photo"
          src={causaAnimalPhoto}
          alt="Jadyel Alencar com um cão, campanha da causa animal"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.28 }}
        />
        <div className="animal-policy__fade" aria-hidden="true" />

        <Container className="animal-policy__shell">
          <div className="animal-policy__copy">
            <motion.p
              className="animal-policy__kicker"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              Causa Animal
            </motion.p>

            <h3
              id="animal-policy-heading"
              className="headline animal-policy__title"
            >
              <motion.span
                className="animal-policy__title-line"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
              >
                O cuidado virou
              </motion.span>
              <motion.span
                className="animal-policy__title-line animal-policy__title-line--accent"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
              >
                compromisso
              </motion.span>
              <motion.span
                className="animal-policy__title-line animal-policy__title-line--accent"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.65, delay: 0.32, ease: EASE }}
              >
                de Estado.
              </motion.span>
            </h3>

            <motion.p
              className="lede animal-policy__lede"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.42, ease: EASE }}
            >
              Do É Pra Já Pet ao Pacto pelos Animais: um movimento que
              transformou amor pelos animais em investimento e política pública
              permanente.
            </motion.p>

            <motion.a
              className="animal-policy__cta"
              href="#animal-cuidado"
              onClick={goToStory}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.55, delay: 0.55, ease: EASE }}
            >
              Conheça essa história
              <span className="animal-policy__cta-arrow" aria-hidden="true">
                →
              </span>
            </motion.a>
          </div>
        </Container>
      </div>
    </MiniScreensHandoff>
  );
}

/** Seção 2 — Cuidado → Números */
function AnimalCare() {
  return (
    <MiniScreensHandoff
      id="animal-cuidado"
      targetId="animal-numeros"
      label="Causa Animal em quatro telas"
      bandMax="30%"
      previews={ANIMAL_PREVIEWS}
      activeIndex={2}
      pinClassName="animal-care"
      className="animal-care-track"
      aria-labelledby="animal-care-heading"
    >
      <Container className="animal-care__shell">
        <div className="animal-care__top">
          <Reveal className="animal-care__intro">
            <SectionTag className="animal-tag" label="Causa Animal na ponta" />
            <h3 id="animal-care-heading" className="headline animal-care__title">
              Castrar. Alimentar.
              <br />
              <Highlight color="orange">Proteger</Highlight>.
            </h3>
            <p className="lede animal-care__lede">
              Uma política completa para controlar a população animal de forma
              ética, reduzir o abandono, apoiar quem cuida e fortalecer o
              combate aos maus-tratos.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="animal-care__feature-wrap">
            <article className="animal-care__feature" tabIndex={0}>
              <span className="animal-care__feature-mono" aria-hidden="true">
                PA
              </span>
              <p className="animal-care__feature-seal">Trilha do cuidado</p>
              <h4 className="animal-care__feature-title">
                Do movimento
                <br />
                à política permanente
              </h4>
              <p className="animal-care__feature-body">
                Castração, alimentação, rede protetora e combate aos maus-tratos
                em uma mesma agenda — para o cuidado deixar de depender só de
                quem ama os animais.
              </p>
              <ul className="animal-care__mini">
                {CARE_FEATURE_PILLARS.map(({ title, body, Icon }) => (
                  <li key={title} className="animal-care__mini-item">
                    <Icon
                      className="animal-care__mini-icon"
                      size={16}
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <p className="animal-care__mini-title">{title}</p>
                    <p className="animal-care__mini-body">{body}</p>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        <div className="animal-care__grid">
          {CARE_CARDS.map(({ seal, title, body, relevance, Icon }, index) => (
            <Reveal
              key={title}
              delay={0.18 + index * 0.07}
              className="animal-care__card-wrap"
            >
              <article className="animal-care__card" tabIndex={0}>
                <span className="animal-care__card-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="animal-care__card-seal">{seal}</p>
                <Icon
                  className="animal-care__card-icon"
                  size={20}
                  strokeWidth={1.75}
                  aria-hidden
                />
                <h4 className="animal-care__card-title">{title}</h4>
                <p className="animal-care__card-body">{body}</p>
                <p className="animal-care__card-relevance">{relevance}</p>
                <span className="animal-care__card-accent" aria-hidden="true" />
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </MiniScreensHandoff>
  );
}

/** Seção 3 — Números → Catarata */
function AnimalNumbers() {
  return (
    <MiniScreensHandoff
      id="animal-numeros"
      targetId="catarata-abertura"
      label="Próxima causa · Catarata"
      bandMax="30%"
      previews={CATARATA_PREVIEWS}
      activeIndex={0}
      pinClassName="animal-numbers"
      className="animal-numbers-track"
      aria-labelledby="animal-numbers-heading"
    >
      <Container className="animal-numbers__shell">
        <div className="animal-numbers__board">
          <Reveal>
            <SectionTag
              className="animal-tag animal-tag--on-dark"
              label="Causa Animal em números"
            />
            <h3
              id="animal-numbers-heading"
              className="headline animal-numbers__title"
            >
              O cuidado que{" "}
              <Highlight color="orange">já chegou</Highlight>.
            </h3>
          </Reveal>

          <CastrationCounter />

          <div className="animal-numbers__role">
            <p className="animal-numbers__role-label">Papel do mandato</p>
            <ul className="animal-numbers__verbs">
              {MANDATE_ROLE.map((item) => (
                <li key={item.verb}>
                  <strong>{item.verb}</strong> {item.body}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="animal-numbers__close">
          <h4 className="animal-numbers__close-title">
            O cuidado não pode depender apenas de quem ama os animais.
          </h4>
          <p className="animal-numbers__close-lede">
            Precisa de investimento, estrutura e política pública.
          </p>
          <div className="animal-numbers__actions">
            <Button
              href="https://www.gp1.com.br/pi/piaui/noticia/2026/6/16/governador-rafael-fonteles-lanca-pacto-pelos-animais-e-amplia-acoes-de-protecao-e-cuidado-625249.html"
              variant="solid"
              arrow
              target="_blank"
              rel="noopener noreferrer"
            >
              Veja as ações realizadas
            </Button>
          </div>
        </Reveal>
      </Container>
    </MiniScreensHandoff>
  );
}

export function CausaAnimal() {
  return (
    <div id="pacto-pelos-animais" className="animal-page">
      <AnimalPolicy />
      <AnimalCare />
      <AnimalNumbers />
    </div>
  );
}
