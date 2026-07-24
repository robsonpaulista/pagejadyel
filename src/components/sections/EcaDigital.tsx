import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../Reveal";
import { MiniScreensHandoff } from "../MiniScreensHandoff";
import {
  ECA_PREVIEWS,
  HOSPITAL_PREVIEWS,
} from "../miniScreenPreviews";
import {
  Button,
  Container,
  Highlight,
  SectionTag,
} from "../ui";
import { useCountUp } from "../../hooks/useCountUp";
import ecaDigitalPhoto from "../../assets/eca-digital.webp";
import pressRepublicanos from "../../assets/press/republicanos-eca.webp";
import pressVeja from "../../assets/press/veja-eca.webp";
import pressAci from "../../assets/press/aci-eca.webp";
import "./EcaDigital.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Exposição a conteúdos inadequados — Unico / Ipsos (2026). */
const EXPOSURE_PCT = 57;

const CHANGES = [
  {
    title: "Conteúdos impróprios",
    body: "Mais proteção contra abusos e materiais inadequados online.",
  },
  {
    title: "Plataformas e apps",
    body: "Mais segurança no uso do que as crianças acessam todos os dias.",
  },
  {
    title: "Riscos digitais",
    body: "Mais atenção aos perigos do ambiente online.",
  },
  {
    title: "Famílias",
    body: "Mais respaldo para responsáveis que acompanham a infância na rede.",
  },
] as const;

const WHY = [
  "Crianças passam mais tempo online.",
  "A internet traz oportunidades, mas também riscos.",
  "A lei ajuda a dar proteção nesse novo cotidiano.",
] as const;

const MANDATE = [
  {
    title: "Relatoria",
    body: "Condução do PL 2.628/2022 na Câmara, com foco em proteger a infância no digital.",
  },
  {
    title: "Liderança",
    body: "Articulação para que a proteção digital deixasse de ser só promessa.",
  },
  {
    title: "Conquista nacional",
    body: "Uma lei que fortalece o ECA em todo o Brasil, também na internet.",
  },
] as const;

const TIMELINE = [
  { label: "Projeto", note: "PL 2.628/2022" },
  { label: "Relatoria", note: "Jadyel Alencar" },
  { label: "Aprovação", note: "Câmara dos Deputados" },
  { label: "Sanção", note: "Lei nº 15.211/25" },
] as const;

const PRESS = [
  {
    source: "Republicanos",
    date: "18 set 2025",
    title:
      "Sancionada lei que cria o Estatuto Digital da Criança e do Adolescente",
    deck: "Marco legal pioneiro nas Américas. Na Câmara, o texto foi relatado por Jadyel Alencar.",
    href: "https://republicanos10.org.br/republicanos-na-camara/sancionada-lei-que-cria-o-estatuto-digital-da-crianca-e-do-adolescente/",
    image: pressRepublicanos,
    imageAlt:
      "Deputado Jadyel Alencar em cobertura do Republicanos sobre o ECA Digital",
  },
  {
    source: "VEJA",
    date: "20 ago 2025",
    title:
      "Câmara aprova ECA Digital, que obriga redes a proteger menores de idade",
    deck: "Projeto relatado por Jadyel Alencar amplia as obrigações das plataformas digitais.",
    href: "https://veja.abril.com.br/coluna/maquiavel/camara-aprova-eca-digital-que-obriga-redes-a-proteger-menores-de-idade/",
    image: pressVeja,
    imageAlt:
      "Deputado Jadyel Alencar, relator do ECA Digital, em matéria da VEJA",
  },
  {
    source: "ACI Digital",
    date: "21 ago 2025",
    title:
      "Câmara dos Deputados aprova o ECA Digital, projeto que protege menores",
    deck: "Aprovação destaca supervisão parental e segurança de crianças no ambiente digital.",
    href: "https://www.acidigital.com/noticia/64195/camara-dos-deputados-aprova-o-eca-digital-projeto-que-protege-menores-de-idade-em-ambientes-digitais",
    image: pressAci,
    imageAlt:
      "Hugo Motta e Jadyel Alencar celebrando a aprovação do ECA Digital",
  },
] as const;

function EcaHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const show = reduceMotion || inView;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.55"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const cardVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.1 },
    },
  };

  const partVariants: Variants = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: EASE },
    },
  };

  return (
    <MiniScreensHandoff
      id="eca-pratica"
      targetId="eca-importa"
      label="ECA Digital em quatro telas"
      bandMax="30%"
      previews={ECA_PREVIEWS}
      activeIndex={1}
      pinClassName="eca-hero"
      className="eca-hero-track"
      aria-labelledby="eca-heading"
    >
      <div className="eca-hero__stage" ref={ref}>
        <motion.img
          className="eca-hero__photo"
          src={ecaDigitalPhoto}
          alt="Mãe e filho no sofá, acompanhando o tablet juntos"
          initial={reduceMotion ? false : { opacity: 0, x: 48, scale: 1.04 }}
          animate={
            show
              ? { opacity: 1, x: 0, scale: 1 }
              : { opacity: 0, x: 48, scale: 1.04 }
          }
          transition={{ duration: 0.85, ease: EASE }}
        />
        <motion.div
          className="eca-hero__fade"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0.35 }}
          animate={show ? { opacity: 1 } : { opacity: 0.35 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
        />
        <motion.div
          className="eca-hero__glow"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.35 }}
        />

        <Container className="eca-hero__shell">
          <div className="eca-hero__copy">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
            >
              <SectionTag className="eca-hero__tag" label="ECA Digital" />
            </motion.div>

            <h2 id="eca-heading" className="headline eca-hero__headline">
              <motion.span
                className="eca-hero__title-line"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
              >
                Proteção para as crianças também na{" "}
              </motion.span>
              <motion.span
                className="eca-hero__internet"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.55 }}
              >
                <Highlight color="blue">internet</Highlight>
              </motion.span>
              <motion.span
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={show ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.7 }}
              >
                .
              </motion.span>
            </h2>

            <motion.div
              className="lede eca-hero__body"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.48 }}
            >
              <p>
                O ECA já garantia direitos e proteção para crianças e
                adolescentes. Com a nova lei, essa proteção foi fortalecida
                também no ambiente digital.
              </p>
            </motion.div>
          </div>

          <div className="eca-hero__practice" aria-labelledby="eca-changes-heading">
            <div className="eca-hero__practice-head">
              <SectionTag label="Na prática" />
              <h3 id="eca-changes-heading" className="eca-hero__practice-title">
                O que mudou na prática
              </h3>
            </div>

            <div className="eca-changes__track">
              <div className="eca-changes__line" aria-hidden="true">
                <motion.div
                  className="eca-changes__line-draw"
                  style={{ scaleX: lineProgress }}
                />
              </div>

              <motion.div
                className="eca-changes__grid"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {CHANGES.map((item, index) => (
                  <motion.article
                    key={item.title}
                    className="eca-card"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: reduceMotion ? 0 : 0.06,
                        },
                      },
                    }}
                  >
                    <motion.span
                      className="eca-card__index"
                      aria-hidden="true"
                      variants={partVariants}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.span>
                    <motion.h4
                      className="eca-card__title"
                      variants={partVariants}
                    >
                      {item.title}
                    </motion.h4>
                    <motion.p className="eca-card__body" variants={partVariants}
                    >
                      {item.body}
                    </motion.p>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </MiniScreensHandoff>
  );
}

function EcaWhy() {
  const reduceMotion = useReducedMotion();

  return (
    <MiniScreensHandoff
      id="eca-importa"
      targetId="eca-mandato"
      label="ECA Digital em quatro telas"
      bandMax="30%"
      previews={ECA_PREVIEWS}
      activeIndex={2}
      pinClassName="eca-why"
      className="eca-why-track"
      aria-labelledby="eca-why-heading"
    >
      <div className="eca-why__marks" aria-hidden="true">
        <span className="eca-why__mark eca-why__mark--ring" />
        <span className="eca-why__mark eca-why__mark--shield" />
        <span className="eca-why__mark eca-why__mark--grid" />
      </div>

      <Container className="eca-why__inner">
        <Reveal>
          <SectionTag label="No dia a dia" />
          <h3 id="eca-why-heading" className="headline eca-block__title">
            Por que isso importa
          </h3>
        </Reveal>

        <div className="eca-why__kinetic">
          <motion.p
            className="eca-why__kinetic-line"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            A infância também acontece{" "}
            <Highlight color="blue">online</Highlight>.
          </motion.p>
          <motion.p
            className="eca-why__kinetic-line eca-why__kinetic-line--second"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}
          >
            A proteção precisava chegar lá.
          </motion.p>
        </div>

        <p className="lede eca-why__lede">
          Uma explicação simples do cotidiano das famílias piauienses.
        </p>

        <ol className="eca-why__list">
          {WHY.map((item, index) => (
            <Reveal key={item} delay={0.08 * index}>
              <li className="eca-why__item">
                <span className="eca-why__num" aria-hidden="true">
                  {index + 1}
                </span>
                <p>{item}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </MiniScreensHandoff>
  );
}

function EcaMandate() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.4 });

  return (
    <MiniScreensHandoff
      id="eca-mandato"
      targetId="eca-numeros"
      label="ECA Digital em quatro telas"
      bandMax="30%"
      previews={ECA_PREVIEWS}
      activeIndex={3}
      pinClassName="eca-mandate"
      className="eca-mandate-track"
      aria-labelledby="eca-mandate-heading"
    >
      <div ref={sectionRef} className="eca-mandate__shell-wrap">
        <Container className="eca-mandate__shell">
          <div className="eca-mandate__top">
            <Reveal>
              <SectionTag label="O mandato" />
              <h3 id="eca-mandate-heading" className="headline eca-block__title">
                Papel do mandato
              </h3>
            </Reveal>

            <div className="eca-timeline">
              <div className="eca-timeline__track" aria-hidden="true">
                <motion.div
                  className="eca-timeline__fill"
                  initial={{ width: "0%" }}
                  animate={
                    reduceMotion || inView ? { width: "100%" } : { width: "0%" }
                  }
                  transition={{ duration: 1.05, ease: EASE, delay: 0.15 }}
                />
              </div>
              <ol className="eca-timeline__steps">
                {TIMELINE.map((step, index) => (
                  <motion.li
                    key={step.label}
                    className="eca-timeline__step"
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={
                      reduceMotion || inView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 10 }
                    }
                    transition={{
                      duration: 0.45,
                      ease: EASE,
                      delay: reduceMotion ? 0 : 0.2 + index * 0.08,
                    }}
                  >
                    <span className="eca-timeline__dot" aria-hidden="true" />
                    <span className="eca-timeline__label">{step.label}</span>
                    <span className="eca-timeline__note">{step.note}</span>
                  </motion.li>
                ))}
              </ol>
            </div>

            <div className="eca-mandate__grid">
              {MANDATE.map((item, index) => (
                <Reveal key={item.title} delay={0.06 * index}>
                  <article
                    className={[
                      "eca-mandate__item",
                      item.title === "Relatoria"
                        ? "eca-mandate__item--featured"
                        : null,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="eca-press" aria-labelledby="eca-press-heading">
            <div className="eca-press__head">
              <p className="eca-press__eyebrow">Relatoria · Na imprensa</p>
              <h4 id="eca-press-heading" className="eca-press__title">
                O que a cobertura registrou
              </h4>
            </div>

            <ul className="eca-press__list">
              {PRESS.map((item, index) => (
                <li key={item.href} className="eca-press__item">
                  <Reveal delay={0.1 * index} className="eca-press__reveal">
                    <a
                      className="eca-press__link"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="eca-press__thumb">
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <span className="eca-press__body">
                        <span className="eca-press__meta">
                          <span className="eca-press__source">{item.source}</span>
                          <span className="eca-press__dot" aria-hidden="true">
                            ·
                          </span>
                          <time className="eca-press__date">{item.date}</time>
                        </span>
                        <span className="eca-press__headline">{item.title}</span>
                        <span className="eca-press__cta">
                          Ler matéria
                          <span aria-hidden="true">↗</span>
                        </span>
                      </span>
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </MiniScreensHandoff>
  );
}

function ExposureCounter() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const count = useCountUp({
    to: EXPOSURE_PCT,
    enabled: Boolean(inView || reduceMotion),
    reduceMotion: Boolean(reduceMotion),
  });

  return (
    <div className="eca-score" ref={ref}>
      <p className="eca-score__value" aria-live="polite">
        {count}%
      </p>
      <p className="eca-score__label">
        dos jovens e adolescentes já foram expostos a conteúdos inadequados na
        internet
      </p>
    </div>
  );
}

/** Números em fundo preto → Hospital de Amor */
function EcaNumbers() {
  return (
    <MiniScreensHandoff
      id="eca-numeros"
      targetId="hospital-cta"
      label="Próxima causa · Hospital de Amor"
      bandMax="30%"
      previews={HOSPITAL_PREVIEWS}
      activeIndex={0}
      pinClassName="eca-numbers"
      className="eca-numbers-track"
      aria-labelledby="eca-numbers-heading"
    >
      <Container className="eca-numbers__shell">
        <div className="eca-numbers__board">
          <Reveal>
            <SectionTag
              className="eca-tag eca-tag--on-dark"
              label="Em números"
            />
            <h3
              id="eca-numbers-heading"
              className="headline eca-numbers__title"
            >
              A proteção das crianças não termina fora da{" "}
              <Highlight color="blue">tela</Highlight>.
            </h3>
            <p className="lede eca-numbers__lede">
              O acesso cresce cedo — e os riscos também. Por isso a proteção
              precisa acompanhar a infância no ambiente digital.
            </p>
          </Reveal>

          <ExposureCounter />

          <div className="eca-numbers__reach">
            <p className="eca-numbers__reach-label">Exposição, conexão e acesso</p>
            <dl className="eca-score__meta">
              <div>
                <dt>Situações ofensivas</dt>
                <dd>
                  Cerca de 1 em cada 5 crianças e adolescentes (9 a 17 anos) já
                  passou por situações ofensivas ou humilhantes online
                </dd>
              </div>
              <div>
                <dt>Volume de conexão</dt>
                <dd>
                  93% da população de 9 a 17 anos no Brasil tem acesso à
                  internet — cerca de 24,5 milhões de pessoas
                </dd>
              </div>
              <div>
                <dt>Acesso precoce</dt>
                <dd>
                  Entre crianças de 0 a 2 anos, o acesso saltou de 9% em 2015
                  para 44% nos últimos anos
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <Reveal className="eca-numbers__close">
          <p className="eca-numbers__sources">
            Fontes: Unico / Ipsos (exposição a conteúdos inadequados); SaferNet
            Brasil e pesquisas nacionais (situações ofensivas ou humilhantes);
            TIC Kids Online Brasil 2024 — Cetic.br / NIC.br (acesso de 9 a 17
            anos); Cetic.br (acesso de 0 a 2 anos).
          </p>
          <div className="eca-numbers__actions">
            <Button
              href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15211.htm"
              variant="solid"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver a lei completa
            </Button>
          </div>
        </Reveal>
      </Container>
    </MiniScreensHandoff>
  );
}

export function EcaDigital() {
  return (
    <div id="eca-digital" className="eca-page">
      <EcaHero />
      <EcaWhy />
      <EcaMandate />
      <EcaNumbers />
    </div>
  );
}
