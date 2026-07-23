import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  CauseIcon,
  Container,
  Highlight,
  Section,
  SectionTag,
  type AccentColor,
  type CauseIconName,
} from "../ui";
import "./Ecossistema.css";

type EcoNode = {
  id: string;
  label: string;
  icon: CauseIconName;
  color: AccentColor;
  position: "top" | "right-top" | "right-bottom" | "left-bottom" | "left-top";
};

const NODES: EcoNode[] = [
  { id: "hospital", label: "Hospital de Amor", icon: "heart", color: "pink", position: "top" },
  { id: "animais", label: "Pacto pelos Animais", icon: "paw", color: "orange", position: "right-top" },
  { id: "eca", label: "ECA Digital", icon: "shield", color: "blue", position: "right-bottom" },
  { id: "infra", label: "Infraestrutura", icon: "road", color: "amber", position: "left-bottom" },
  { id: "catarata", label: "Mutirão da Catarata", icon: "eye", color: "purple", position: "left-top" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

export function Ecossistema() {
  const reduceMotion = useReducedMotion();

  return (
    <Section className="ecossistema" id="causas" aria-labelledby="eco-heading">
      <Container className="ecossistema__inner">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <SectionTag number="04" label="O ecossistema do cuidado" />
        </motion.div>

        <motion.div
          className="eco"
          role="img"
          aria-label="Cinco causas ao redor do número 10"
          variants={gridVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="eco__ring" aria-hidden="true" />
          <span className="eco__center" aria-hidden="true">
            10
          </span>
          {NODES.map((node) => (
            <span
              key={node.id}
              className={`eco__node eco__node--${node.position} highlight--${node.color}`}
            >
              <motion.span
                className="eco__node-inner"
                variants={cardVariants}
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <span className="eco__icon">
                  <CauseIcon name={node.icon} size={22} />
                </span>
                <span className="eco__label">{node.label}</span>
              </motion.span>
            </span>
          ))}
        </motion.div>

        <motion.p
          id="eco-heading"
          className="ecossistema__caption"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
        >
          Cinco grandes causas. Um só propósito:{" "}
          <Highlight color="pink">cuidar do Piauí</Highlight>.
        </motion.p>
      </Container>
    </Section>
  );
}
