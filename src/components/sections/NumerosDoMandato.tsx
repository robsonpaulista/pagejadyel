import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Accessibility,
  Award,
  Cpu,
  Flag,
  Globe2,
  Landmark,
  Leaf,
  MessageSquare,
  Radio,
  Shield,
  Smartphone,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useId, useRef, useState } from "react";
import { Reveal } from "../Reveal";
import {
  MiniScreensHandoff,
} from "../MiniScreensHandoff";
import { ECA_PREVIEWS, MANDATO_PREVIEWS } from "../miniScreenPreviews";
import {
  Container,
  Highlight,
  SectionTag,
} from "../ui";
import { useCountUp } from "../../hooks/useCountUp";
import fotomandato from "../../assets/fotomandato.jpg";
import "./NumerosDoMandato.css";

const EASE = [0.22, 1, 0.36, 1] as const;

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

const HERO_DELIVERIES: readonly {
  title: string;
  ref: string;
  badge: string;
  badgeTone: "ok" | "law";
  relevance: string;
  Icon: LucideIcon;
}[] = [
  {
    title: "Apoio escolar para alunos com deficiência",
    ref: "PL 4050/2023 · Autor",
    badge: "Aprovado na Câmara",
    badgeTone: "ok",
    relevance: "Mais inclusão e suporte para quem mais precisa.",
    Icon: Accessibility,
  },
  {
    title: "Proteção de rios e matas ciliares",
    ref: "PL 4488/2023 · Autor",
    badge: "Aprovado na Câmara",
    badgeTone: "ok",
    relevance: "Uma pauta de preservação com impacto no futuro.",
    Icon: Leaf,
  },
  {
    title: "Torquato Neto como Patrimônio Cultural",
    ref: "PL 597/2021 · Relator",
    badge: "Virou lei",
    badgeTone: "law",
    relevance: "Valorização da cultura e da identidade brasileira.",
    Icon: Landmark,
  },
  {
    title: "52 rádios comunitárias e TVs relatadas",
    ref: "Processos ligados ao interior do Piauí",
    badge: "100% aprovados",
    badgeTone: "ok",
    relevance: "Mais comunicação e voz para diferentes cidades.",
    Icon: Radio,
  },
];

const CDE_PILLARS: readonly {
  title: string;
  body: string;
  Icon: LucideIcon;
}[] = [
  {
    title: "Protagonismo",
    body: "Liderança nos temas que movem o Brasil.",
    Icon: Award,
  },
  {
    title: "Diálogo e consenso",
    body: "Construção coletiva com responsabilidade.",
    Icon: MessageSquare,
  },
  {
    title: "Resultados",
    body: "Decisões que geram desenvolvimento real.",
    Icon: Target,
  },
  {
    title: "Foco no Brasil",
    body: "Soluções para os desafios de hoje e de amanhã.",
    Icon: Flag,
  },
];

const SPACE_CARDS: readonly {
  seal: string;
  title: string;
  body: string;
  relevance: string;
  Icon: LucideIcon;
}[] = [
  {
    seal: "Economia",
    title: "Isenção de importações de até US$ 50",
    body: "Relatoria da proposta na CDE.",
    relevance: "Tema de impacto direto no consumo e na economia nacional.",
    Icon: Globe2,
  },
  {
    seal: "Digital",
    title: "Responsabilidade das big techs no Brasil",
    body: "Relatoria do PL 2575/2025.",
    relevance: "Debate estratégico sobre plataformas e soberania digital.",
    Icon: Smartphone,
  },
  {
    seal: "Futuro",
    title: "Inteligência Artificial",
    body: "Titular da Comissão Especial do PL 2338/2023.",
    relevance: "Participação nas decisões que vão moldar o futuro do país.",
    Icon: Cpu,
  },
  {
    seal: "Energia",
    title: "Transição energética e hidrogênio verde",
    body: "Atuação nos debates sobre o novo ciclo energético brasileiro.",
    relevance: "Agenda estratégica para desenvolvimento e inovação.",
    Icon: Leaf,
  },
  {
    seal: "Representatividade",
    title: "Bancada Negra",
    body: "Integrante desde 2023.",
    relevance: "Presença em espaços de voz, diversidade e representação.",
    Icon: Users,
  },
];

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
  const reduceMotion = useReducedMotion();

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
      <div className="nmand-hero__stage">
        <motion.img
          className="nmand-hero__photo"
          src={fotomandato}
          alt="Jadyel Alencar em sessão legislativa na Câmara dos Deputados"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.015 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE }}
        />
        <div className="nmand-hero__fade" aria-hidden="true" />

        <Container className="nmand-hero__shell">
          <div className="nmand-hero__rail">
            <Reveal className="nmand-hero__intro">
              <SectionTag
                className="nmand-tag nmand-tag--ink"
                label="Jadyel Alencar"
              />
              <h2 id="nmand-hero-heading" className="headline nmand-hero__title">
                Um mandato que cuida,
                <br />
                trabalha e <Highlight color="yellow">entrega</Highlight>.
              </h2>
              <p className="lede nmand-hero__lede">
                Do Piauí para as grandes decisões do Brasil. Um mandato presente
                na proteção das crianças, na inclusão, no desenvolvimento
                econômico e nas pautas que impactam a vida real das pessoas.
              </p>
              <p className="nmand-hero__bio">
                Deputado federal pelo Piauí · Relator do ECA Digital
              </p>
            </Reveal>

            <Reveal delay={0.1} className="nmand-hero__eca-wrap">
              <article className="nmand-hero__eca">
                <div className="nmand-hero__eca-copy">
                  <p className="nmand-hero__eca-eyebrow">Principal conquista</p>
                  <div className="nmand-hero__eca-head">
                    <h3 className="nmand-hero__eca-title">ECA Digital</h3>
                    <span className="nmand-badge nmand-badge--law">
                      Virou lei
                    </span>
                  </div>
                  <p className="nmand-hero__eca-ref">
                    Lei 15.211/2025 · Relator
                  </p>
                  <p className="nmand-hero__eca-body">
                    A lei que fortaleceu a proteção de crianças e adolescentes
                    no ambiente digital e estabeleceu novas responsabilidades
                    para plataformas e aplicativos.
                  </p>
                  <a
                    className="nmand-hero__cta"
                    href="https://www.camara.leg.br/deputados/220697"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver produção na Câmara
                    <span aria-hidden="true"> →</span>
                  </a>
                </div>
                <div className="nmand-hero__eca-art" aria-hidden="true">
                  <Shield
                    className="nmand-hero__eca-shield"
                    size={56}
                    strokeWidth={1.35}
                  />
                </div>
              </article>
            </Reveal>

            <div className="nmand-hero__wins">
              {HERO_DELIVERIES.map(
                (
                  { title, ref, badge, badgeTone, relevance, Icon },
                  index,
                ) => (
                  <Reveal
                    key={title}
                    delay={0.16 + index * 0.06}
                    className="nmand-hero__win-wrap"
                  >
                    <article className="nmand-hero__win">
                      <span
                        className={`nmand-badge nmand-badge--${badgeTone}`}
                      >
                        {badge}
                      </span>
                      <Icon
                        className="nmand-hero__win-icon"
                        size={17}
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      <h4 className="nmand-hero__win-title">{title}</h4>
                      <p className="nmand-hero__win-ref">{ref}</p>
                      <p className="nmand-hero__win-relevance">{relevance}</p>
                      <span
                        className="nmand-hero__win-accent"
                        aria-hidden="true"
                      />
                    </article>
                  </Reveal>
                ),
              )}
            </div>
          </div>
        </Container>
      </div>
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
            label="Jadyel · Produção legislativa"
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
        <div className="nmand-spaces__top">
          <Reveal className="nmand-spaces__intro">
            <SectionTag
              className="nmand-tag nmand-tag--ink"
              label="Jadyel · Espaços de decisão"
            />
            <h3 id="nmand-spaces-heading" className="headline nmand-spaces__title">
              Presente onde as
              <br />
              grandes decisões
              <br />
              são <Highlight color="yellow">tomadas</Highlight>.
            </h3>
            <p className="lede nmand-spaces__lede">
              À frente dos debates sobre indústria, comércio exterior, inovação,
              micro e pequenas empresas e desenvolvimento nacional.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="nmand-spaces__cde-wrap">
            <article className="nmand-spaces__cde" tabIndex={0}>
              <span className="nmand-spaces__cde-mono" aria-hidden="true">
                CDE
              </span>
              <p className="nmand-spaces__cde-seal">Função estratégica</p>
              <h4 className="nmand-spaces__cde-title">
                Presidente da Comissão de
                <br />
                Desenvolvimento Econômico (CDE)
              </h4>
              <p className="nmand-spaces__cde-body">
                No centro das decisões que impulsionam a economia do país, geram
                empregos e abrem caminhos para o futuro.
              </p>
              <ul className="nmand-spaces__pillars">
                {CDE_PILLARS.map(({ title, body, Icon }) => (
                  <li key={title} className="nmand-spaces__pillar">
                    <Icon
                      className="nmand-spaces__pillar-icon"
                      size={16}
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <p className="nmand-spaces__pillar-title">{title}</p>
                    <p className="nmand-spaces__pillar-body">{body}</p>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        <div className="nmand-spaces__grid">
          {SPACE_CARDS.map(({ seal, title, body, relevance, Icon }, index) => (
            <Reveal
              key={title}
              delay={0.18 + index * 0.07}
              className="nmand-spaces__card-wrap"
            >
              <article className="nmand-spaces__card" tabIndex={0}>
                <span className="nmand-spaces__card-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="nmand-spaces__card-seal">{seal}</p>
                <Icon
                  className="nmand-spaces__card-icon"
                  size={20}
                  strokeWidth={1.75}
                  aria-hidden
                />
                <h4 className="nmand-spaces__card-title">{title}</h4>
                <p className="nmand-spaces__card-body">{body}</p>
                <p className="nmand-spaces__card-relevance">{relevance}</p>
                <span className="nmand-spaces__card-accent" aria-hidden="true" />
              </article>
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
            label="Jadyel · Marcas do mandato"
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
