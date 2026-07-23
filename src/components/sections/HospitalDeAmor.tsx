import { motion, useInView, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useRef } from "react";
import { Reveal } from "../Reveal";
import {
  Button,
  Container,
  Highlight,
  Section,
  SectionTag,
} from "../ui";
import { useCountUp } from "../../hooks/useCountUp";
import hospitalPhoto from "../../assets/hospital-jadyel.jpg";
import "./HospitalDeAmor.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Balanço institucional mais recente do Hospital de Amor. */
const ATTENDANCES = 2_080_828;
const PATIENTS = 613_202;
const DAILY_AVG = 5_697;
const MUNICIPALITIES = 2_712;

const PILLARS = [
  {
    title: "Prevenir",
    body: "Ações e exames para identificar riscos mais cedo.",
  },
  {
    title: "Descobrir cedo",
    body: "Mais estrutura para descobrir a doença no tempo certo.",
  },
  {
    title: "Cuidar",
    body: "Acolhimento para o paciente e para toda a família.",
  },
] as const;

type ContinueProps = {
  href: string;
  label: string;
};

function HamorContinue({ href, label }: ContinueProps) {
  return (
    <Reveal className="hamor-continue-wrap">
      <a href={href} className="hamor-continue">
        <span>{label}</span>
        <span className="hamor-continue__arrow" aria-hidden="true">
          ↓
        </span>
      </a>
    </Reveal>
  );
}

/** 1 — Capa */
function HospitalHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const show = reduceMotion || inView;

  return (
    <Section
      className="hamor-hero"
      id="hospital-cta"
      aria-labelledby="hamor-heading"
    >
      <div className="hamor-hero__stage" ref={ref}>
        <motion.img
          className="hamor-hero__photo"
          src={hospitalPhoto}
          alt="Jadyel Alencar com a bandeira do Hospital de Amor"
          initial={reduceMotion ? false : { opacity: 0, x: 48, scale: 1.04 }}
          animate={
            show
              ? { opacity: 1, x: 0, scale: 1 }
              : { opacity: 0, x: 48, scale: 1.04 }
          }
          transition={{ duration: 0.85, ease: EASE }}
        />
        <motion.div
          className="hamor-hero__fade"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0.35 }}
          animate={show ? { opacity: 1 } : { opacity: 0.35 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
        />
        <motion.div
          className="hamor-hero__glow"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        />

        <Container className="hamor-hero__shell">
          <div className="hamor-hero__copy">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
            >
              <SectionTag
                className="hamor-hero__tag"
                label="Hospital de Amor"
              />
            </motion.div>

            <h2 id="hamor-heading" className="headline hamor-hero__headline">
              <motion.span
                className="hamor-hero__title-line"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
              >
                Cuidar com{" "}
              </motion.span>
              <motion.span
                className="hamor-hero__amor"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.52 }}
              >
                <Highlight color="pink">amor</Highlight>
              </motion.span>
              <motion.span
                className="hamor-hero__title-line"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.62 }}
              >
                {" "}
                é o que nos move.
              </motion.span>
            </h2>

            <motion.p
              className="lede hamor-hero__body"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.48 }}
            >
              Uma conquista histórica para o Piauí: mais de R$ 60 milhões em
              investimentos para tornar realidade, em Teresina, uma unidade de
              referência em prevenção e diagnóstico oncológico. Quando a
              prevenção chega mais perto, diminuem a distância, a espera e o
              medo de milhares de famílias.
            </motion.p>

            <motion.p
              className="hamor-hero__site"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.58 }}
            >
              <MapPin
                className="hamor-hero__site-icon"
                size={15}
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span>
                Obras iniciando muito em breve na Avenida Ulisses Marques,
                Avenida Presidente Kennedy.
              </span>
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.68 }}
            >
              <HamorContinue
                href="#hospital-referencia"
                label="Conheça a referência"
              />
            </motion.div>
          </div>
        </Container>
      </div>
    </Section>
  );
}

/** 2 — Referência nacional + benefício para o Piauí */
function HospitalReference() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const show = reduceMotion || inView;

  return (
    <Section
      className="hamor-ref"
      id="hospital-referencia"
      aria-labelledby="hamor-ref-heading"
    >
      <Container className="hamor-ref__inner">
        <div className="hamor-ref__copy" ref={ref}>
          <Reveal>
            <SectionTag className="hamor-tag" label="Referência nacional" />
            <h3 id="hamor-ref-heading" className="headline hamor-ref__title">
              A maior referência em oncologia do Brasil mais perto dos{" "}
              <Highlight color="pink">piauienses</Highlight>.
            </h3>
            <p className="lede hamor-ref__lede">
              O Hospital de Amor construiu uma história reconhecida pelo
              atendimento gratuito, pela tecnologia e pelo cuidado humanizado.
              A chegada de uma unidade a Teresina aproxima das famílias
              piauienses a prevenção e o diagnóstico precoce.
            </p>
          </Reveal>

          <div className="hamor-ref__highlights">
            {PILLARS.map((item, index) => (
              <motion.article
                key={item.title}
                className="hamor-ref__item"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={
                  show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                }
                transition={{
                  duration: 0.5,
                  ease: EASE,
                  delay: reduceMotion ? 0 : 0.25 + index * 0.1,
                }}
              >
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </motion.article>
            ))}
          </div>

          <HamorContinue
            href="#hospital-numeros"
            label="Os números da causa"
          />
        </div>
      </Container>
    </Section>
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

/** 3 — Números em fundo preto */
function HospitalNumbers() {
  return (
    <Section
      className="hamor-numbers"
      id="hospital-numeros"
      aria-labelledby="hamor-numbers-heading"
    >
      <Container className="hamor-numbers__shell">
        <div className="hamor-numbers__board">
          <Reveal>
            <SectionTag
              className="hamor-tag hamor-tag--on-dark"
              label="Em números"
            />
            <h3
              id="hamor-numbers-heading"
              className="headline hamor-numbers__title"
            >
              O maior centro oncológico da América Latina,{" "}
              <Highlight color="pink">100% pelo SUS</Highlight>.
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
          <div className="hamor-numbers__actions">
            <Button href="#pacto-pelos-animais" variant="solid" arrow>
              Próxima causa: Cuidado Animal
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
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
