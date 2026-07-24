import { motion, useInView, useReducedMotion } from "framer-motion";
import { useId, useRef, useState } from "react";
import { Reveal } from "../Reveal";
import {
  MiniScreensHandoff,
  type MiniScreenPreview,
} from "../MiniScreensHandoff";
import { ECA_PREVIEWS } from "../miniScreenPreviews";
import {
  Button,
  Container,
  Highlight,
  SectionTag,
} from "../ui";
import { useCountUp } from "../../hooks/useCountUp";
import "./NumerosDoMandato.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const MANDATO_PREVIEWS: MiniScreenPreview[] = [
  {
    id: "conquistas",
    tone: "light",
    tag: "Jadyel Alencar",
    title: "Um mandato que entrega",
    meta: "Conquistas · ECA Digital",
  },
  {
    id: "producao",
    tone: "dark",
    tag: "Produção",
    title: "783 proposições",
    meta: "51 de autoria · 82 relatadas",
  },
  {
    id: "espacos",
    tone: "light",
    tag: "Espaços",
    title: "Grandes decisões",
    meta: "Câmara · Comissões · Frentes",
  },
  {
    id: "marcas",
    tone: "dark",
    tag: "Marcas",
    title: "Causas do mandato",
    meta: "ECA · Animal · Saúde · Obras",
  },
];

const STATS = [
  {
    value: 783,
    label: "Proposições apresentadas",
    meta: "Atualizado em 21/07/2026",
    tip: "Inclui projetos, requerimentos, indicações, emendas e outras proposições legislativas.",
  },
  {
    value: 51,
    label: "Propostas de autoria própria",
    meta: "29 PLs · 21 PECs · 1 PDL",
  },
  {
    value: 82,
    label: "Proposições relatadas",
    meta: "52 TVRs + 30 PLs e PDLs",
  },
  {
    value: 226,
    label: "Frentes parlamentares integradas",
    meta: null,
  },
] as const;

const LAWS_SECONDARY = [
  {
    title: "Apoio escolar para alunos com deficiência",
    ref: "PL 4050/2023 · Autor",
    badge: "Aprovado na Câmara",
    badgeTone: "ok" as const,
  },
  {
    title: "Proteção de rios e matas ciliares",
    ref: "PL 4488/2023 · Autor",
    badge: "Aprovado na Câmara",
    badgeTone: "ok" as const,
  },
  {
    title: "Torquato Neto como Patrimônio Cultural",
    ref: "PL 597/2021 · Relator",
    badge: "Virou lei",
    badgeTone: "law" as const,
  },
  {
    title: "52 rádios comunitárias e TVs relatadas",
    ref: "Processos aprovados, muitos ligados ao interior do Piauí.",
    badge: "100% aprovados",
    badgeTone: "ok" as const,
  },
] as const;

const SPACES = [
  {
    title: "Isenção de importações de até US$ 50",
    body: "Relator da proposta na CDE.",
  },
  {
    title: "Responsabilidade das big techs no Brasil",
    body: "Relator do PL 2575/2025.",
  },
  {
    title: "Inteligência Artificial",
    body: "Titular da Comissão Especial do PL 2338/2023.",
  },
  {
    title: "Transição energética e hidrogênio verde",
    body: "Participação nos debates sobre o futuro energético do país.",
  },
  {
    title: "Bancada Negra",
    body: "Integrante desde 2023.",
  },
] as const;

const PILLARS = [
  {
    id: "criancas",
    title: "Crianças e ambiente digital",
    lead: "ECA Digital · principal marca legislativa",
    body: "Proteção de crianças e adolescentes na internet.",
  },
  {
    id: "animal",
    title: "Causa animal",
    lead: "6+ projetos de lei",
    body: "Proteção, saúde, bem-estar e combate aos maus-tratos.",
  },
  {
    id: "inclusao",
    title: "Inclusão e TEA",
    lead: "4 projetos de lei",
    body: "Direitos, educação e apoio às pessoas com deficiência.",
  },
  {
    id: "economia",
    title: "Economia e indústria",
    lead: "Presidência da CDE + 8 projetos",
    body: "Desenvolvimento, emprego, inovação e fortalecimento de empresas.",
  },
  {
    id: "piaui",
    title: "Piauí e interior",
    lead: "TVRs, emendas e articulação",
    body: "Comunicação, infraestrutura e investimentos chegando às cidades.",
  },
] as const;

function StatValue({
  value,
  enabled,
  reduceMotion,
}: {
  value: number;
  enabled: boolean;
  reduceMotion: boolean;
}) {
  const count = useCountUp({
    to: value,
    enabled,
    reduceMotion,
  });
  return <>{count.toLocaleString("pt-BR")}</>;
}

/** Abertura + leis: um mandato que entrega */
function MandatoHero() {
  const [openExtra, setOpenExtra] = useState(false);

  return (
    <MiniScreensHandoff
      id="nmand-abertura"
      targetId="nmand-producao"
      label="O mandato em quatro telas"
      bandMax="30%"
      previews={MANDATO_PREVIEWS}
      activeIndex={1}
      pinClassName="nmand-hero"
      className="nmand-hero-track"
      aria-labelledby="nmand-hero-heading"
    >
      <Container className="nmand-hero__shell">
        <div className="nmand-hero__intro">
          <Reveal>
            <SectionTag
              className="nmand-tag nmand-tag--ink"
              label="Jadyel Alencar"
            />
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="nmand-hero-heading" className="headline nmand-hero__title">
              Um mandato que cuida, trabalha e{" "}
              <Highlight color="yellow">entrega</Highlight>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede nmand-hero__lede">
              Do Piauí para as grandes decisões do Brasil. Presente na proteção
              das crianças, na inclusão, no desenvolvimento econômico e no
              interior do estado — e com leis que saíram do papel.
            </p>
            <p className="nmand-hero__bio">
              Deputado federal pelo Piauí · Presidente da CDE · Relator do ECA
              Digital
            </p>
          </Reveal>
        </div>

        <div className="nmand-hero__proof">
          <Reveal className="nmand-hero__featured">
            <p className="nmand-hero__eyebrow">Principal conquista</p>
            <div className="nmand-hero__featured-top">
              <h3 className="nmand-hero__feature-title">ECA Digital</h3>
              <span className="nmand-badge nmand-badge--law">Virou lei</span>
            </div>
            <p className="nmand-hero__ref">Lei 15.211/2025 · Relator</p>
            <p className="nmand-hero__feature-body">
              A lei que fortaleceu a proteção de crianças e adolescentes no
              ambiente digital e estabeleceu novas responsabilidades para
              plataformas e aplicativos.
            </p>
          </Reveal>

          <div className="nmand-hero__wins">
            {LAWS_SECONDARY.map((item, index) => (
              <Reveal
                key={item.title}
                delay={0.05 * index}
                className="nmand-hero__win"
              >
                <span
                  className={`nmand-badge nmand-badge--${item.badgeTone}`}
                >
                  {item.badge}
                </span>
                <h4>{item.title}</h4>
                <p>{item.ref}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="nmand-hero__foot">
          <Reveal delay={0.1}>
            <button
              type="button"
              className="nmand-laws__more"
              aria-expanded={openExtra}
              onClick={() => setOpenExtra((v) => !v)}
            >
              {openExtra
                ? "Recolher produção legislativa"
                : "Ver produção na Câmara"}
              <span aria-hidden="true">{openExtra ? " ↑" : " →"}</span>
            </button>
            {openExtra ? (
              <div className="nmand-laws__extra">
                <p>
                  A produção completa — proposições, relatorias e tramitações —
                  está disponível nos sistemas da Câmara dos Deputados.
                </p>
                <Button
                  href="https://www.camara.leg.br/deputados/220697"
                  variant="outline"
                  target="_blank"
                  rel="noopener noreferrer"
                  arrow
                >
                  Abrir página na Câmara
                </Button>
              </div>
            ) : null}
          </Reveal>
        </div>
      </Container>
    </MiniScreensHandoff>
  );
}

/** 02 — Produção legislativa */
function MandatoProducao() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const tipId = useId();
  const [tipOpen, setTipOpen] = useState(false);

  return (
    <MiniScreensHandoff
      id="nmand-producao"
      targetId="nmand-espacos"
      label="O mandato em quatro telas"
      bandMax="30%"
      previews={MANDATO_PREVIEWS}
      activeIndex={2}
      pinClassName="nmand-stats"
      className="nmand-stats-track"
      aria-labelledby="nmand-stats-heading"
    >
      <Container className="nmand-stats__shell">
        <Reveal>
          <SectionTag
            className="nmand-tag nmand-tag--on-dark"
            label="Produção legislativa"
          />
          <h3 id="nmand-stats-heading" className="headline nmand-stats__title">
            Trabalho que aparece nos{" "}
            <Highlight color="yellow">números</Highlight>.
          </h3>
        </Reveal>

        <div className="nmand-stats__strip" ref={ref}>
          {STATS.map((stat, index) => (
            <motion.article
              key={stat.label}
              className="nmand-stat"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={
                inView || reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              transition={{
                duration: 0.55,
                ease: EASE,
                delay: reduceMotion ? 0 : 0.08 * index,
              }}
            >
              <p className="nmand-stat__value">
                <StatValue
                  value={stat.value}
                  enabled={Boolean(inView || reduceMotion)}
                  reduceMotion={Boolean(reduceMotion)}
                />
                {"tip" in stat && stat.tip ? (
                  <button
                    type="button"
                    className="nmand-stat__tip-btn"
                    aria-expanded={tipOpen}
                    aria-controls={tipId}
                    onClick={() => setTipOpen((open) => !open)}
                  >
                    ?
                    <span className="sr-only">
                      O que conta como proposição apresentada
                    </span>
                  </button>
                ) : null}
              </p>
              <h4 className="nmand-stat__label">{stat.label}</h4>
              {stat.meta ? (
                <p className="nmand-stat__meta">{stat.meta}</p>
              ) : null}
              {"tip" in stat && stat.tip && tipOpen ? (
                <p id={tipId} className="nmand-stat__tip" role="note">
                  {stat.tip}
                </p>
              ) : null}
            </motion.article>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="nmand-stats__presence">
            <strong>Presença em 2026:</strong> 54 dias de plenário · 106 votos
            nominais
          </p>
        </Reveal>
      </Container>
    </MiniScreensHandoff>
  );
}

/** 03 — Espaços de decisão */
function MandatoEspacos() {
  return (
    <MiniScreensHandoff
      id="nmand-espacos"
      targetId="nmand-marcas"
      label="O mandato em quatro telas"
      bandMax="30%"
      previews={MANDATO_PREVIEWS}
      activeIndex={3}
      pinClassName="nmand-spaces"
      className="nmand-spaces-track"
      aria-labelledby="nmand-spaces-heading"
    >
      <Container className="nmand-spaces__shell">
        <Reveal>
          <SectionTag
            className="nmand-tag nmand-tag--ink"
            label="Espaços de decisão"
          />
          <h3 id="nmand-spaces-heading" className="headline nmand-spaces__title">
            Presente onde as grandes decisões são{" "}
            <Highlight color="yellow">tomadas</Highlight>.
          </h3>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="nmand-spaces__lead">
            <h4>Presidente da Comissão de Desenvolvimento Econômico</h4>
            <p className="lede">
              À frente dos debates sobre indústria, comércio exterior, inovação,
              micro e pequenas empresas e desenvolvimento nacional.
            </p>
          </article>
        </Reveal>

        <div className="nmand-spaces__grid">
          {SPACES.map((item, index) => (
            <Reveal
              key={item.title}
              delay={0.05 * index}
              className="nmand-spaces__card"
            >
              <span className="nmand-spaces__card-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </MiniScreensHandoff>
  );
}

/** 05 — Marcas do mandato → ECA Digital */
function MandatoMarcas() {
  const [openId, setOpenId] = useState<string | null>(PILLARS[0].id);

  return (
    <MiniScreensHandoff
      id="nmand-marcas"
      targetId="eca-pratica"
      label="Próxima causa · ECA Digital"
      bandMax="30%"
      previews={ECA_PREVIEWS}
      activeIndex={0}
      pinClassName="nmand-brands"
      className="nmand-brands-track"
      aria-labelledby="nmand-brands-heading"
    >
      <Container className="nmand-brands__shell">
        <Reveal>
          <SectionTag
            className="nmand-tag nmand-tag--on-dark"
            label="Marcas do mandato"
          />
          <h3 id="nmand-brands-heading" className="headline nmand-brands__title">
            Grandes causas. Um só propósito:{" "}
            <Highlight color="yellow">cuidar</Highlight>.
          </h3>
        </Reveal>

        <ul className="nmand-brands__list">
          {PILLARS.map((pillar) => {
            const open = openId === pillar.id;
            return (
              <li key={pillar.id} className="nmand-brands__item">
                <button
                  type="button"
                  className={`nmand-brands__trigger${open ? " is-open" : ""}`}
                  aria-expanded={open}
                  onClick={() =>
                    setOpenId((current) =>
                      current === pillar.id ? null : pillar.id,
                    )
                  }
                >
                  <span className="nmand-brands__name">{pillar.title}</span>
                  <span className="nmand-brands__lead">{pillar.lead}</span>
                  <span className="nmand-brands__chevron" aria-hidden="true">
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open ? (
                  <p className="nmand-brands__body">{pillar.body}</p>
                ) : null}
              </li>
            );
          })}
        </ul>

        <Reveal delay={0.12}>
          <p className="nmand-brands__closer">
            Jadyel não ocupa apenas uma cadeira na Câmara. Ele apresenta, relata,
            transforma propostas em lei e ocupa espaços onde decisões importantes
            são tomadas.
          </p>
        </Reveal>
      </Container>
    </MiniScreensHandoff>
  );
}

export function NumerosDoMandato() {
  return (
    <div id="numeros-do-mandato" className="nmand-page">
      <MandatoHero />
      <MandatoProducao />
      <MandatoEspacos />
      <MandatoMarcas />
    </div>
  );
}
