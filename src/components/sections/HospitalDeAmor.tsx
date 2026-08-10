import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Award,
  HandHeart,
  Heart,
  HeartHandshake,
  MapPin,
  Search,
  ShieldPlus,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { useRef } from "react";
import { Reveal } from "../Reveal";
import { MiniScreensHandoff } from "../MiniScreensHandoff";
import {
  ANIMAL_PREVIEWS,
  HOSPITAL_PREVIEWS,
} from "../miniScreenPreviews";
import {
  Container,
  Highlight,
  SectionTag,
} from "../ui";
import { useCountUp } from "../../hooks/useCountUp";
import hospitalPhoto from "../../assets/hospital-jadyel.jpg";
import { SectionContact } from "../SectionContact";
import "./HospitalDeAmor.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Balanço institucional mais recente do Hospital de Amor. */
const ATTENDANCES = 2_080_828;
const PATIENTS = 613_202;
const DAILY_AVG = 5_697;
const MUNICIPALITIES = 2_712;

const REF_PILLARS: readonly {
  title: string;
  body: string;
  Icon: LucideIcon;
}[] = [
  {
    title: "Atendimento gratuito",
    body: "Cuidado oncológico sem cobrança para quem precisa.",
    Icon: HeartHandshake,
  },
  {
    title: "Tecnologia",
    body: "Estrutura moderna para prevenção e diagnóstico.",
    Icon: Stethoscope,
  },
  {
    title: "Cuidado humanizado",
    body: "Acolhimento ao paciente e à família em cada etapa.",
    Icon: HandHeart,
  },
];

const REF_CARDS: readonly {
  seal: string;
  title: string;
  body: string;
  relevance: string;
  Icon: LucideIcon;
}[] = [
  {
    seal: "Prevenção",
    title: "Prevenir",
    body: "Ações e exames para identificar riscos mais cedo.",
    relevance: "Antecipar o cuidado reduz o impacto da doença.",
    Icon: ShieldPlus,
  },
  {
    seal: "Diagnóstico",
    title: "Descobrir cedo",
    body: "Mais estrutura para descobrir a doença no tempo certo.",
    relevance: "Tempo certo muda o curso do tratamento.",
    Icon: Search,
  },
  {
    seal: "Acolhimento",
    title: "Cuidar",
    body: "Acolhimento para o paciente e para toda a família.",
    relevance: "Cuidar é também estar perto de quem ama.",
    Icon: HeartHandshake,
  },
];

/** 1 — Capa → Referência */
function HospitalHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const show = reduceMotion || inView;

  return (
    <MiniScreensHandoff
      id="hospital-cta"
      targetId="hospital-referencia"
      label="Hospital de Amor em quatro telas"
      bandMax="30%"
      previews={HOSPITAL_PREVIEWS}
      activeIndex={1}
      pinClassName="hamor-hero"
      className="hamor-hero-track"
      aria-labelledby="hamor-heading"
    >
      <div className="hamor-hero__stage" ref={ref}>
        <div className="hamor-hero__backdrop" aria-hidden="true" />

        <motion.img
          className="hamor-hero__photo"
          src={hospitalPhoto}
          alt="Jadyel Alencar com a bandeira do Hospital de Amor"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
        />

        <motion.div
          className="hamor-hero__fade"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0.4 }}
          animate={show ? { opacity: 1 } : { opacity: 0.4 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
        />

        <Container className="hamor-hero__shell">
          <div className="hamor-hero__copy">
            <motion.div
              className="hamor-hero__meta"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
            >
              <p className="hamor-hero__index">
                <span className="hamor-hero__index-num">03</span>
                <span className="hamor-hero__index-sep">/</span>
                <span>Hospital de Amor</span>
              </p>
            </motion.div>

            <h2 id="hamor-heading" className="headline hamor-hero__headline">
              <motion.span
                className="hamor-hero__title-line"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
              >
                Cuidar com{" "}
                <Highlight color="pink">amor</Highlight>
                <br />
                é o que nos move.
              </motion.span>
            </h2>

            <motion.div
              className="hamor-hero__lede"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.36 }}
            >
              <p>
                Uma conquista histórica para o Piauí: mais de R$ 100 milhões em
                investimentos para viabilizar em Teresina uma referência em
                prevenção, diagnóstico e cuidado oncológico.
              </p>
              <p>
                Quando a prevenção chega mais perto, diminuem a distância, o
                medo e a espera para milhares de famílias.
              </p>
            </motion.div>

            <motion.div
              className="hamor-hero__highlights"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.48 }}
            >
              <div className="hamor-hero__highlight">
                <Heart
                  className="hamor-hero__highlight-icon"
                  size={18}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <div className="hamor-hero__highlight-copy">
                  <p className="hamor-hero__highlight-value">
                    + R$ 100 milhões
                  </p>
                  <p className="hamor-hero__highlight-label">destinados</p>
                </div>
              </div>
              <div className="hamor-hero__highlight">
                <Award
                  className="hamor-hero__highlight-icon"
                  size={18}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <div className="hamor-hero__highlight-copy">
                  <p className="hamor-hero__highlight-value hamor-hero__highlight-value--ink">
                    Referência nacional
                  </p>
                  <p className="hamor-hero__highlight-label">
                    em prevenção e diagnóstico
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hamor-hero__foot"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.58 }}
            >
              <p className="hamor-hero__site">
                <MapPin
                  className="hamor-hero__site-icon"
                  size={15}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span>
                  Obras iniciando na Avenida Ulisses Marques e Avenida
                  Presidente Kennedy.
                </span>
              </p>

              <a className="hamor-hero__cta" href="#hospital-referencia">
                Conheça essa conquista
                <span className="hamor-hero__cta-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </motion.div>

            <SectionContact className="hamor-hero__contact" />
          </div>
        </Container>
      </div>
    </MiniScreensHandoff>
  );
}

/** 2 — Referência → Números */
function HospitalReference() {
  return (
    <MiniScreensHandoff
      id="hospital-referencia"
      targetId="hospital-numeros"
      label="Hospital de Amor em quatro telas"
      bandMax="30%"
      previews={HOSPITAL_PREVIEWS}
      activeIndex={2}
      pinClassName="hamor-ref"
      className="hamor-ref-track"
      aria-labelledby="hamor-ref-heading"
    >
      <Container className="hamor-ref__shell">
        <div className="hamor-ref__top">
          <Reveal className="hamor-ref__intro">
            <SectionTag
              className="hamor-tag"
              label="Hospital de Amor · Referência nacional"
            />
            <h3 id="hamor-ref-heading" className="headline hamor-ref__title">
              A maior referência
              <br />
              em oncologia do Brasil
              <br />
              mais perto dos{" "}
              <Highlight color="pink">piauienses</Highlight>.
            </h3>
            <p className="lede hamor-ref__lede">
              Uma história reconhecida pelo atendimento gratuito, pela tecnologia
              e pelo cuidado humanizado — agora mais perto das famílias do Piauí.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="hamor-ref__feature-wrap">
            <article className="hamor-ref__feature" tabIndex={0}>
              <span className="hamor-ref__feature-mono" aria-hidden="true">
                HA
              </span>
              <p className="hamor-ref__feature-seal">Chegada a Teresina</p>
              <h4 className="hamor-ref__feature-title">
                Referência nacional
                <br />
                de prevenção e diagnóstico
              </h4>
              <p className="hamor-ref__feature-body">
                A unidade do Hospital de Amor em Teresina aproxima das famílias
                piauienses a prevenção e o diagnóstico precoce, com o mesmo
                padrão de excelência reconhecido no Brasil.
              </p>
              <ul className="hamor-ref__pillars">
                {REF_PILLARS.map(({ title, body, Icon }) => (
                  <li key={title} className="hamor-ref__pillar">
                    <Icon
                      className="hamor-ref__pillar-icon"
                      size={16}
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <p className="hamor-ref__pillar-title">{title}</p>
                    <p className="hamor-ref__pillar-body">{body}</p>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        <div className="hamor-ref__grid">
          {REF_CARDS.map(({ seal, title, body, relevance, Icon }, index) => (
            <Reveal
              key={title}
              delay={0.18 + index * 0.07}
              className="hamor-ref__card-wrap"
            >
              <article className="hamor-ref__card" tabIndex={0}>
                <span className="hamor-ref__card-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="hamor-ref__card-seal">{seal}</p>
                <Icon
                  className="hamor-ref__card-icon"
                  size={20}
                  strokeWidth={1.75}
                  aria-hidden
                />
                <h4 className="hamor-ref__card-title">{title}</h4>
                <p className="hamor-ref__card-body">{body}</p>
                <p className="hamor-ref__card-relevance">{relevance}</p>
                <span className="hamor-ref__card-accent" aria-hidden="true" />
              </article>
            </Reveal>
          ))}
        </div>

        <SectionContact />
      </Container>
    </MiniScreensHandoff>
  );
}

function AttendanceCounter() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const count = useCountUp({
    to: ATTENDANCES,
    enabled: Boolean(inView || reduceMotion),
    reduceMotion: Boolean(reduceMotion),
    duration: 1800,
  });

  return (
    <div className="hamor-score" ref={ref}>
      <p className="hamor-score__value" aria-live="polite">
        {count.toLocaleString("pt-BR")}
      </p>
      <p className="hamor-score__label">atendimentos no balanço mais recente</p>
      <p className="hamor-score__updated">
        Média de {DAILY_AVG.toLocaleString("pt-BR")} procedimentos por dia
        — cerca de 4 por minuto
      </p>
    </div>
  );
}

/** 3 — Números → Causa Animal */
function HospitalNumbers() {
  return (
    <MiniScreensHandoff
      id="hospital-numeros"
      targetId="animal-politica"
      label="Próxima causa · Cuidado Animal"
      bandMax="30%"
      previews={ANIMAL_PREVIEWS}
      activeIndex={0}
      pinClassName="hamor-numbers"
      className="hamor-numbers-track"
      aria-labelledby="hamor-numbers-heading"
    >
      <Container className="hamor-numbers__shell">
        <div className="hamor-numbers__board">
          <Reveal>
            <SectionTag
              className="hamor-tag hamor-tag--on-dark"
              label="Hospital de Amor em números"
            />
            <h3
              id="hamor-numbers-heading"
              className="headline hamor-numbers__title"
            >
              O maior centro oncológico da América Latina,{" "}
              <Highlight color="yellow">100% pelo SUS</Highlight>.
            </h3>
            <p className="lede hamor-numbers__lede">
              Antigo Hospital de Câncer de Barretos, o Hospital de Amor atende
              gratuitamente e agora chega mais perto das famílias piauienses.
            </p>
          </Reveal>

          <AttendanceCounter />

          <div className="hamor-numbers__reach">
            <p className="hamor-numbers__reach-label">Alcance e abrangência</p>
            <dl className="hamor-score__meta">
              <div>
                <dt>Pacientes atendidos</dt>
                <dd>{PATIENTS.toLocaleString("pt-BR")} pessoas</dd>
              </div>
              <div>
                <dt>Cobertura</dt>
                <dd>
                  {MUNICIPALITIES.toLocaleString("pt-BR")} municípios — 48,7%
                  das cidades do Brasil
                </dd>
              </div>
              <div>
                <dt>Atendimento</dt>
                <dd>100% gratuito pelo SUS</dd>
              </div>
            </dl>
          </div>
        </div>

        <Reveal className="hamor-numbers__close">
          <h4 className="hamor-numbers__close-title">
            Uma referência nacional que agora se aproxima do Piauí.
          </h4>
          <p className="hamor-numbers__close-lede">
            Prevenção e diagnóstico precoce mais perto de quem precisa.
          </p>
        </Reveal>

        <SectionContact tone="dark" />
      </Container>
    </MiniScreensHandoff>
  );
}

export function HospitalDeAmor() {
  return (
    <div id="hospital-de-amor" className="hamor-page">
      <HospitalHero />
      <HospitalReference />
      <HospitalNumbers />
    </div>
  );
}
