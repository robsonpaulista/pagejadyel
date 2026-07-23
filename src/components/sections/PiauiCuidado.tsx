import { Reveal } from "../Reveal";
import { Container, Highlight, Media, Section, SectionTag } from "../ui";
import "./PiauiCuidado.css";

export function PiauiCuidado() {
  return (
    <Section className="piaui-cuidado" aria-labelledby="piaui-heading">
      <Container grid className="piaui-cuidado__inner">
        <Reveal className="piaui-cuidado__copy">
          <SectionTag number="10" label="O Piauí sendo cuidado" />
          <h2 id="piaui-heading" className="headline piaui-cuidado__headline">
            Cada conquista é um pedaço do Piauí sendo cuidado.
          </h2>
          <p className="headline piaui-cuidado__sub">
            E ainda temos <Highlight color="pink">muito por fazer</Highlight>.
          </p>
        </Reveal>

        <Reveal className="piaui-cuidado__media-col" delay={0.1}>
          <Media
            className="piaui-cuidado__media"
            caption="Ilustração — mapa com as causas"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
