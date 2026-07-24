import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
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
import causaAnimalPhoto from "../../assets/causa-animal.jpg";
import "./CausaAnimal.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Balanço Semarh desde 2023, divulgado no lançamento do Pacto (jun/2026). */
const CASTRATIONS_DONE = 4877;
const CASTRATIONS_UPDATED = "julho de 2026";

const TIMELINE = [
  {
    when: "Outubro de 2025",
    title: "É Pra Já Pet",
    body: "Festival idealizado por Jadyel, reunindo famílias, tutores, protetores e organizações em torno da adoção responsável, dos serviços veterinários e da defesa animal. O evento marcou o anúncio de mais de R$ 20 milhões para ações da causa animal.",
  },
  {
    when: "Junho de 2026",
    title: "Pacto pelos Animais",
    body: "A parceria com o Governo do Estado transformou a mobilização em política pública permanente, com ações previstas nos 224 municípios piauienses.",
  },
] as const;

const HIGHLIGHTS = [
  {
    value: "R$ 20 mi+",
    label: "anunciados para ações da causa animal",
  },
  {
    value: "20 mil",
    label: "castrações previstas pelo Pacto",
  },
  {
    value: "224",
    label: "municípios contemplados",
  },
] as const;

const PILLARS = [
  {
    title: "Castração e saúde",
    body: "Procedimentos gratuitos, atendimento veterinário e ações itinerantes para levar cuidado a diferentes regiões do estado.",
  },
  {
    title: "Apoio à rede protetora",
    body: "Ração Solidária, apoio a protetores independentes e fortalecimento das entidades que já realizam esse trabalho diariamente.",
  },
  {
    title: "Proteção e responsabilidade",
    body: "Ações integradas de combate aos maus-tratos, educação para a guarda responsável e conscientização da população.",
  },
] as const;

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

/** Seção 1 — Capa → Cuidado */
function AnimalPolicy() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const show = reduceMotion || inView;

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
          initial={reduceMotion ? false : { opacity: 0, x: 36 }}
          animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: 36 }}
          transition={{ duration: 0.85, ease: EASE }}
        />
        <div className="animal-policy__fade" aria-hidden="true" />

        <Container className="animal-policy__shell">
          <Reveal>
            <SectionTag
              className="animal-tag"
              label="Do movimento à política"
            />
            <h3
              id="animal-policy-heading"
              className="headline animal-policy__title"
            >
              O cuidado virou{" "}
              <Highlight color="orange">compromisso de Estado</Highlight>.
            </h3>
            <p className="lede animal-policy__lede">
              O É Pra Já Pet reuniu a sociedade, colocou a causa animal no centro
              do debate e deu início a um grande movimento. Com a parceria do
              Governo do Piauí, esse trabalho avançou para o Pacto pelos Animais:
              uma política permanente de proteção e bem-estar animal.
            </p>
          </Reveal>

          <div className="animal-timeline">
            {TIMELINE.map((item, index) => (
              <Reveal
                key={item.title}
                delay={0.08 * index}
                className="animal-timeline__item"
              >
                <p className="animal-timeline__when">{item.when}</p>
                <h4 className="animal-timeline__title">{item.title}</h4>
                <p className="animal-timeline__body">{item.body}</p>
              </Reveal>
            ))}
          </div>

          <div className="animal-path" aria-hidden="true">
            <span>Movimento</span>
            <span className="animal-path__arrow">→</span>
            <span>Parceria</span>
            <span className="animal-path__arrow">→</span>
            <span>Política permanente</span>
          </div>

          <div className="animal-highlights">
            {HIGHLIGHTS.map((item, index) => (
              <Reveal
                key={item.value}
                delay={0.06 * index}
                className="animal-highlight"
              >
                <p className="animal-highlight__value">{item.value}</p>
                <p className="animal-highlight__label">{item.label}</p>
              </Reveal>
            ))}
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
        <Reveal>
          <SectionTag className="animal-tag" label="Na ponta" />
          <h3 id="animal-care-heading" className="headline animal-care__title">
            Castrar. Alimentar.{" "}
            <Highlight color="orange">Proteger</Highlight>.
          </h3>
          <p className="lede animal-care__lede">
            Uma política completa para controlar a população animal de forma
            ética, reduzir o abandono, apoiar quem cuida e fortalecer o
            combate aos maus-tratos.
          </p>
        </Reveal>

        <div className="animal-care__pillars">
          {PILLARS.map((item, index) => (
            <Reveal
              key={item.title}
              delay={0.06 * index}
              className="animal-care__pillar"
            >
              <h4>{item.title}</h4>
              <p>{item.body}</p>
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
              label="Em números"
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
