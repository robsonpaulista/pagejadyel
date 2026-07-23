import { Reveal } from "../Reveal";
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

export function Ecossistema() {
  return (
    <Section className="ecossistema" id="causas" aria-labelledby="eco-heading">
      <Container className="ecossistema__inner">
        <Reveal>
          <SectionTag number="04" label="O ecossistema do cuidado" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="eco" role="img" aria-label="Cinco causas ao redor do número 10">
            <span className="eco__ring" aria-hidden="true" />
            <span className="eco__center" aria-hidden="true">
              10
            </span>
            {NODES.map((node) => (
              <span
                key={node.id}
                className={`eco__node eco__node--${node.position} highlight--${node.color}`}
              >
                <span className="eco__icon">
                  <CauseIcon name={node.icon} size={22} />
                </span>
                <span className="eco__label">{node.label}</span>
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p id="eco-heading" className="ecossistema__caption">
            Cinco grandes causas. Um só propósito:{" "}
            <Highlight color="pink">cuidar do Piauí</Highlight>.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
