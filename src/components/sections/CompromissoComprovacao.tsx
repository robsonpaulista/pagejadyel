import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import cidadeVerdeSaude from "../../assets/press/cidade-verde-saude.png";
import metaMetaverso from "../../assets/press/meta-metaverso.png";
import radiosComunitarias from "../../assets/press/radios-comunitarias.png";
import fotomandato from "../../assets/fotomandato.jpg";
import "./CompromissoComprovacao.css";

const EASE = [0.22, 1, 0.36, 1] as const;

type ProofClip = {
  id: string;
  slot: "tl" | "tr" | "bl" | "br";
  source: string;
  title: string;
  body: string;
  href: string;
  image: string;
  imageAlt: string;
  rotate: number;
};

type LineGeom = {
  id: string;
  d: string;
  x2: number;
  y2: number;
};

const PROOFS: readonly ProofClip[] = [
  {
    id: "comissoes",
    slot: "tl",
    source: "FONTE Câmara dos Deputados",
    title: "Atuação e presidência em comissões que constroem soluções",
    body: "Trabalho constante em comissões ligadas a infraestrutura, meio ambiente, saúde e desenvolvimento regional — incluindo a presidência da CDE.",
    href: "https://www.camara.leg.br/deputados/220697",
    image: fotomandato,
    imageAlt: "Reunião de comissão na Câmara dos Deputados",
    rotate: -0.9,
  },
  {
    id: "saude",
    slot: "tr",
    source: "FONTE Cidade Verde",
    title: "Jadyel destina recursos pra Teresina e reforça parceria…",
    body: "Emenda parlamentar fortalece unidades de saúde e amplia atendimentos à população.",
    href: "https://cidadeverde.com/temporeal/129641/jadyel-destina-recursos-pra-teresina-e-reforca-parceria-com-silvio-mendes",
    image: cidadeVerdeSaude,
    imageAlt: "Encontro e articulação pela saúde no Piauí",
    rotate: 1.2,
  },
  {
    id: "radios",
    slot: "bl",
    source: "FONTE Câmara dos Deputados",
    title: "52 rádios e TVs relatadas — 100% aprovadas",
    body: "Mais voz, mais comunidade, mais cidadania no ar.",
    href: "https://amarcbrasil.com/lancamento-de-frente-parlamentar-em-apoio-as-radios-comunitarias-e-marcado-pelo-anuncio-de-novo-decreto-regulatorio/",
    image: radiosComunitarias,
    imageAlt: "Estúdio de rádio comunitária no ar",
    rotate: -1.4,
  },
  {
    id: "meta",
    slot: "br",
    source: "FONTE Republicanos 10",
    title:
      "Parceria com a Meta leva cursos de metaverso, realidade aumentada e qualificação digital",
    body: "Iniciativa abre portas para o futuro e gera oportunidades para milhares de piauienses.",
    href: "https://republicanos10.org.br/republicanos-na-camara/jadyel-alencar-leva-curso-de-metaverso-do-facebook-ao-piaui/",
    image: metaMetaverso,
    imageAlt: "Lançamento da parceria Metaverso com a Meta no Piauí",
    rotate: 0.8,
  },
];

function relativePoint(
  board: DOMRect,
  el: Element,
): { x: number; y: number } {
  const r = el.getBoundingClientRect();
  return {
    x: ((r.left + r.width / 2 - board.left) / board.width) * 100,
    y: ((r.top + r.height / 2 - board.top) / board.height) * 100,
  };
}

/** Curva que contorna a carta: sai do hub e vai ao card sem cruzar o centro. */
function curveAround(
  hub: { x: number; y: number },
  end: { x: number; y: number },
  slot: ProofClip["slot"],
): string {
  const midY = (hub.y + end.y) / 2;

  if (slot === "tr") {
    return `M ${hub.x} ${hub.y} C ${hub.x + 14} ${hub.y}, ${end.x} ${midY + 4}, ${end.x} ${end.y}`;
  }
  if (slot === "tl") {
    return `M ${hub.x} ${hub.y} C ${hub.x - 14} ${hub.y}, ${end.x} ${midY + 4}, ${end.x} ${end.y}`;
  }
  if (slot === "br") {
    return `M ${hub.x} ${hub.y} C ${hub.x + 12} ${hub.y + 3}, ${end.x} ${hub.y + (end.y - hub.y) * 0.4}, ${end.x} ${end.y}`;
  }
  // bl
  return `M ${hub.x} ${hub.y} C ${hub.x - 12} ${hub.y + 3}, ${end.x} ${hub.y + (end.y - hub.y) * 0.4}, ${end.x} ${end.y}`;
}

/** Cena editorial: carta → provas ao redor → linhas → CUIDADO. */
export function CompromissoComprovacao() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLSpanElement>(null);
  const endRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const inView = useInView(stageRef, { once: true, amount: 0.15 });
  const [live, setLive] = useState<boolean>(false);
  const [lines, setLines] = useState<LineGeom[]>([]);

  useEffect(() => {
    if (inView) setLive(true);
  }, [inView]);

  useEffect(() => {
    const boot = () => {
      const node = stageRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const visible =
        rect.top < window.innerHeight * 0.9 &&
        rect.bottom > window.innerHeight * 0.1;
      if (visible) setLive(true);
    };

    const t1 = window.setTimeout(boot, 300);
    const t2 = window.setTimeout(boot, 1200);
    window.addEventListener("scroll", boot, { passive: true });
    window.addEventListener("hashchange", boot);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("scroll", boot);
      window.removeEventListener("hashchange", boot);
    };
  }, []);

  const measureLines = useCallback(() => {
    const board = stageRef.current;
    const hubEl = hubRef.current;
    if (!board || !hubEl) return;

    const boardRect = board.getBoundingClientRect();
    if (boardRect.width < 8 || boardRect.height < 8) return;

    const hub = relativePoint(boardRect, hubEl);
    const next: LineGeom[] = [];

    for (const proof of PROOFS) {
      const endEl = endRefs.current[proof.id];
      if (!endEl) continue;
      const end = relativePoint(boardRect, endEl);
      next.push({
        id: proof.id,
        d: curveAround(hub, end, proof.slot),
        x2: end.x,
        y2: end.y,
      });
    }

    setLines(next);
  }, []);

  useLayoutEffect(() => {
    if (!live) return;

    measureLines();
    const onResize = () => measureLines();
    window.addEventListener("resize", onResize);

    // depois das animações dos cards
    const t1 = window.setTimeout(measureLines, 400);
    const t2 = window.setTimeout(measureLines, 1800);
    const t3 = window.setTimeout(measureLines, 2800);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [live, measureLines]);

  return (
    <section
      id="env-mand-abertura"
      className={`comprova${live ? " is-live" : ""}${reduceMotion ? " is-instant" : ""}`}
      aria-labelledby="comprova-excerpt-heading"
    >
      <div
        id="mandato-apos-mensagem"
        ref={stageRef}
        className="comprova__board"
      >
        <svg
          className="comprova__lines"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {lines.map((line) => (
            <path key={line.id} d={line.d} vectorEffect="non-scaling-stroke" />
          ))}
          {lines.map((line) => (
            <circle
              key={`${line.id}-node`}
              className="comprova__node"
              cx={line.x2}
              cy={line.y2}
              r="0.55"
            />
          ))}
        </svg>

        <span
          ref={hubRef}
          className="comprova__hub-anchor"
          aria-hidden="true"
        />

        <motion.article
          className="comprova__letter"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={live ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <h2 id="comprova-excerpt-heading" className="sr-only">
            Trecho da carta — as propostas da caminhada
          </h2>
          <p className="comprova__letter-text">
            Em um dos bolsos do paletó no dia de assumir o cargo, tinham algumas
            frases que não decorei, em outro, as propostas que apresentei durante
            a caminhada:{" "}
            <strong>
              Desenvolvimento econômico, infraestrutura, cuidado ambiental,
              apoio às rádios comunitárias, apoio à saúde…
            </strong>
          </p>
        </motion.article>

        {PROOFS.map((proof) => (
          <a
            key={proof.id}
            className={`comprova__clip comprova__clip--${proof.slot}`}
            href={proof.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ["--clip-rot" as string]: `${proof.rotate}deg` }}
          >
            <span
              ref={(node) => {
                endRefs.current[proof.id] = node;
              }}
              className="comprova__clip-anchor"
              aria-hidden="true"
            />
            <span className="comprova__clip-source">{proof.source}</span>
            <span className="comprova__clip-card">
              <span className="comprova__clip-copy">
                <span className="comprova__clip-title">{proof.title}</span>
                <span className="comprova__clip-body">{proof.body}</span>
              </span>
              <img
                className="comprova__clip-photo"
                src={proof.image}
                alt={proof.imageAlt}
              />
            </span>
          </a>
        ))}

        <footer className="comprova__cuidado">
          <p className="comprova__cuidado-line">
            Estávamos cumprindo o prometido, com muito trabalho, com muito
            cuidado, com muita vontade de fazer, o Piauí não queria mais esperar,
            queria tudo pra ontem, tudo pra <em>JÁ</em>!
          </p>
        </footer>
      </div>
    </section>
  );
}
