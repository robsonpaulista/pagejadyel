import { Reveal } from "../Reveal";
import { Container, Highlight, Media, Section, SectionTag } from "../ui";
import "./Missao.css";

export function Missao() {
  return (
    <Section className="missao" aria-labelledby="missao-heading">
      <Container grid className="missao__inner">
        <Reveal className="missao__media-col">
          <Media className="missao__media" caption="Fotografia — retrato" />
        </Reveal>

        <Reveal className="missao__copy" delay={0.1}>
          <SectionTag number="11" label="A missão continua" />
          <h2 id="missao-heading" className="headline missao__headline">
            Com as bênçãos de Deus e o chamado do povo,{" "}
            <Highlight color="pink">
              vamos seguir cuidando de todas as regiões e de todas as pessoas
            </Highlight>
            .
          </h2>
        </Reveal>
      </Container>
    </Section>
  );
}
