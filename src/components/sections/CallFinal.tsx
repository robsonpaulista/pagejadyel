import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../Reveal";
import { Button, Container, NameLockup, Section, SectionTag } from "../ui";
import jadyelPhoto from "../../assets/jadyel.png";
import "./CallFinal.css";

const SOCIAL = ["WhatsApp", "Instagram", "Facebook", "Link"];

export function CallFinal() {
  const reduceMotion = useReducedMotion();

  return (
    <Section className="call-final" id="participar" aria-labelledby="call-heading">
      <Container className="call-final__inner">
        <div className="call-final__copy">
          <Reveal>
            <SectionTag number="12" label="Call to action" />
          </Reveal>

          <Reveal delay={0.08}>
            <h2 id="call-heading" className="headline call-final__headline">
              Juntos, podemos fazer o Piauí ir ainda mais longe.
            </h2>

            <NameLockup className="call-final__lockup" />

            <div className="call-final__actions">
              <Button variant="solid" href="#participar" arrow>
                Quero fazer parte disso
              </Button>
            </div>

            <div className="call-final__share">
              <span className="cue">Compartilhe essa missão</span>
              <ul className="call-final__social">
                {SOCIAL.map((network) => (
                  <li key={network}>
                    <a href="#social" aria-label={network}>
                      <span aria-hidden="true">{network.charAt(0)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <motion.figure
          className="call-final__figure"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="call-final__ten" aria-hidden="true">
            10
          </span>
          <img
            className="call-final__photo"
            src={jadyelPhoto}
            alt="Jadyel Alencar"
          />
        </motion.figure>
      </Container>
    </Section>
  );
}
