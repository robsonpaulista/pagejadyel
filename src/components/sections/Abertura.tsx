import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../Reveal";
import { Button, Container, Highlight, NameLockup, Section } from "../ui";
import jadyelBandeira from "../../assets/jadyel-bandeira.webp";
import "./Abertura.css";

export function Abertura() {
  const reduceMotion = useReducedMotion();

  return (
    <Section className="abertura" id="abertura" aria-labelledby="abertura-heading">
      <Container className="abertura__inner">
        <motion.figure
          className="abertura__figure"
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <img
            className="abertura__photo"
            src={jadyelBandeira}
            alt="Jadyel Alencar sorrindo com a bandeira do Piauí sobre os ombros"
          />
        </motion.figure>

        <div className="abertura__copy">
          <Reveal>
            <h1 id="abertura-heading" className="headline abertura__headline">
              Grandes causas.
              <br />
              <span className="abertura__purpose">Um só propósito:</span>
              <br />
              <Highlight color="yellow">CUIDAR DO PIAUÍ</Highlight>.
            </h1>
            <p className="lede">
              Proteger as crianças, ampliar o acesso à saúde, cuidar dos animais
              e levar obras para todos os cantos do estado. É assim que o nosso
              mandato cuida do Piauí.
            </p>

            <div className="abertura__brand">
              <NameLockup compact subline={false} className="abertura__lockup" />
              <motion.p
                className="abertura__urn"
                aria-label="Número de urna 1000"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.88, x: 12 }}
                animate={
                  reduceMotion
                    ? { opacity: 1, scale: 1, x: 0 }
                    : { opacity: 1, scale: [0.88, 1.04, 1], x: 0 }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.25,
                        times: [0, 0.6, 1],
                      }
                }
              >
                1000
              </motion.p>
            </div>

            <p className="abertura__slogan">O Piauí É PRA JÁ!</p>

            <div className="abertura__actions">
              <Button
                href="#hospital-de-amor"
                variant="solid"
                arrow
                className="abertura__cta"
              >
                Conheça as causas
              </Button>
              {/* CTA secundário: convite do player (sem som até o clique) */}
              <div id="jingle-invite-root" />
            </div>
          </Reveal>

          <span className="cue abertura__cue">
            Role para conhecer as causas
            <span className="cue__arrow">↓</span>
          </span>
        </div>
      </Container>
    </Section>
  );
}
