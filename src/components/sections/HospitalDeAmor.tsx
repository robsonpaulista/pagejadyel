import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../Reveal";
import {
  Button,
  Container,
  Highlight,
  Media,
  Section,
  SectionTag,
} from "../ui";
import hospitalPhoto from "../../assets/hospital-de-amor.webp";
import hospitalBarretos from "../../assets/hospital-amor-barretos.webp";
import registroInstitucional from "../../assets/hospital-registro-institucional.webp";
import articulacaoMandato from "../../assets/hospital-articulacao-mandato.webp";
import anuncioConquista from "../../assets/hospital-anuncio-conquista.webp";
import "./HospitalDeAmor.css";

const EASE = [0.22, 1, 0.36, 1] as const;

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

const PROOF = [
  {
    caption: "Registro institucional",
    src: registroInstitucional,
    alt: "Publicação no Instagram com o registro institucional do Hospital de Amor",
    href: "https://www.instagram.com/p/DZnfrOkI_sX/?hl=pt",
  },
  {
    caption: "Articulação do mandato",
    src: articulacaoMandato,
    alt: "Visita ao Hospital de Amor em Barretos — articulação do mandato",
    href: "https://www.instagram.com/p/DagRQ-WFcOH/?hl=pt&img_index=2",
  },
  {
    caption: "Anúncio da conquista",
    src: anuncioConquista,
    alt: "Publicação no Instagram anunciando a conquista do Hospital de Amor no Piauí",
    href: "https://www.instagram.com/p/DWbZ0A6CFfj/?hl=pt",
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

/** 1 — Abertura */
function HospitalHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const show = reduceMotion || inView;

  return (
    <Section className="hamor-hero" aria-labelledby="hamor-heading">
      <div className="hamor-hero__stage" ref={ref}>
        <motion.img
          className="hamor-hero__photo"
          src={hospitalPhoto}
          alt="Unidade do Hospital de Amor — Instituto de Prevenção em Teresina"
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

        <Container className="hamor-hero__inner">
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
              referência em prevenção e diagnóstico oncológico.
            </motion.p>

            <motion.div
              className="hamor-hero__cta highlight--pink"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.62 }}
            >
              <Button href="#hospital-cta" arrow>
                Conheça essa conquista
              </Button>
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
      <div className="hamor-ref__stage" ref={ref}>
        <div className="hamor-ref__media" aria-hidden="true">
          <motion.img
            className="hamor-ref__photo"
            src={hospitalBarretos}
            alt=""
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={show ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.85, ease: EASE }}
          />
        </div>
        <div className="hamor-ref__fade" aria-hidden="true" />
        <div className="hamor-ref__glow" aria-hidden="true" />

        <Container className="hamor-ref__inner">
          <div className="hamor-ref__copy">
            <Reveal>
              <SectionTag className="hamor-tag" label="A referência" />
              <h3 id="hamor-ref-heading" className="headline hamor-ref__title">
                Uma referência do Brasil mais perto dos{" "}
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

            <motion.p
              className="hamor-ref__stat"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.55 }}
            >
              <span className="hamor-ref__stat-num">Mais de 6 mil</span>
              <span className="hamor-ref__stat-label">
                pacientes por dia atendidos gratuitamente pela instituição.
              </span>
            </motion.p>

            <HamorContinue
              href="#pacto-pelos-animais"
              label="Próxima causa: Cuidado Animal"
            />
          </div>
        </Container>
      </div>
    </Section>
  );
}

/** 3 — Encerramento humano + comprovação */
function HospitalClose() {
  return (
    <Section
      className="hamor-cta"
      id="hospital-cta"
      aria-labelledby="hamor-cta-heading"
    >
      <Container className="hamor-cta__inner">
        <div className="hamor-cta__copy">
          <Reveal>
            <SectionTag className="hamor-tag" label="As famílias" />
          </Reveal>
          <Reveal delay={0.06}>
            <h3 id="hamor-cta-heading" className="headline hamor-cta__title">
              Mais perto do diagnóstico. Mais perto da{" "}
              <Highlight color="pink">esperança</Highlight>.
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede hamor-cta__lede">
              Quando a prevenção chega mais perto, diminuem a distância, a espera
              e o medo de milhares de famílias piauienses.
            </p>
          </Reveal>
        </div>

        <ul className="hamor-cta__proof">
          {PROOF.map((item, index) => {
            const photo = (
              <Media
                className="hamor-cta__proof-photo"
                caption={item.caption}
                src={"src" in item ? item.src : undefined}
                alt={"alt" in item ? item.alt : undefined}
              />
            );

            return (
              <li key={item.caption}>
                <Reveal delay={0.08 * index}>
                  {"href" in item && item.href ? (
                    <a
                      className="hamor-cta__proof-link"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {photo}
                    </a>
                  ) : (
                    photo
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>

        <HamorContinue
          href="#hospital-referencia"
          label="Conheça a referência"
        />
      </Container>
    </Section>
  );
}

export function HospitalDeAmor() {
  return (
    <div id="hospital-de-amor" className="hamor-page">
      <HospitalHero />
      <HospitalClose />
      <HospitalReference />
    </div>
  );
}
