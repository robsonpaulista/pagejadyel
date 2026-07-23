import { Reveal } from "../Reveal";
import { Container, Highlight, Media, Section, SectionTag } from "../ui";
import "./MapaRevela.css";

export function MapaRevela() {
  return (
    <Section className="mapa-revela" aria-labelledby="mapa-heading">
      <Container grid className="mapa-revela__inner">
        <Reveal className="mapa-revela__media-col">
          <Media
            className="mapa-revela__media"
            caption="Ilustração — mapa do Piauí"
          />
        </Reveal>

        <Reveal className="mapa-revela__copy" delay={0.1}>
          <SectionTag number="03" label="O mapa se revela" />
          <h2 id="mapa-heading" className="headline mapa-revela__headline">
            Um mandato que transformou desafios em{" "}
            <Highlight color="pink">conquistas</Highlight>.
          </h2>
          <span className="cue mapa-revela__cue">
            Explore as causas
            <span className="cue__arrow">↓</span>
          </span>
        </Reveal>
      </Container>
    </Section>
  );
}
