import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import clubeNews from "../../assets/press/pet/clube-news.jpg";
import gp1 from "../../assets/press/pet/gp1.jpg";
import instagram from "../../assets/press/pet/instagram.jpg";
import pacto from "../../assets/press/pet/pacto.jpg";
import cidadeVerdePacto from "../../assets/press/pet/cidade-verde-pacto.jpg";
import { SectionContact } from "../SectionContact";
import "./EPraJaPet.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIDEO_SRC = "/petjadyel.mp4";

type ClipSlot = "tl" | "tm" | "tr" | "bl" | "br";

type PressClip = {
  id: string;
  slot: ClipSlot;
  source: string;
  title: string;
  body: string;
  href: string;
  image: string;
  imageAlt: string;
  rotate: number;
};

const CLIPS: readonly PressClip[] = [
  {
    id: "clube-news",
    slot: "tl",
    source: "FONTE Clube News",
    title: "1º Festival É Pra Já Pet — Dr. Pet e Patrulha Canina",
    body: "Parque da Cidadania, entrada gratuita — e feira de adoção.",
    href: "https://portalclubenews.com/2025/10/23/1o-festival-e-pra-ja-pet-tera-participacao-do-dr-pet-e-show-cover-da-patrulha-canina/",
    image: clubeNews,
    imageAlt: "Matéria do Clube News sobre o Festival É Pra Já Pet",
    rotate: -1.5,
  },
  {
    id: "instagram",
    slot: "tm",
    source: "FONTE Instagram",
    title: "O primeiro Festival É Pra Já PET foi só o começo",
    body: "Milhares de pessoas, famílias e protetores no Parque da Cidadania.",
    href: "https://www.instagram.com/p/DQUGcVREZAC/?img_index=1",
    image: instagram,
    imageAlt: "Post do Instagram sobre o Festival É Pra Já Pet",
    rotate: 0.6,
  },
  {
    id: "gp1",
    slot: "tr",
    source: "FONTE GP1",
    title: "Lançamento do 1º Festival É Pra Já Pet em Teresina",
    body: "Mais de R$ 20 milhões para a causa animal no Piauí.",
    href: "https://www.gp1.com.br/pi/piaui/noticia/2025/10/15/jadyel-alencar-convida-piauienses-para-lancamento-do-1o-festival-e-pra-ja-pet-em-teresina-605925.html",
    image: gp1,
    imageAlt: "Matéria do GP1 sobre o Festival É Pra Já Pet",
    rotate: 1.3,
  },
  {
    id: "pacto",
    slot: "bl",
    source: "FONTE Instagram",
    title: "Pacto pelos Animais — a causa vira política de estado",
    body: "Viva os animais, viva o Piauí, viva o Pacto pelos Animais.",
    href: "https://www.instagram.com/reels/DZdR_gjohTp/",
    image: pacto,
    imageAlt: "Reel do lançamento do Pacto pelos Animais",
    rotate: -0.9,
  },
  {
    id: "cidade-verde-pacto",
    slot: "br",
    source: "FONTE Cidade Verde",
    title: "Pacto prevê castração de 21 mil cães e gatos e distribuição de ração",
    body: "Política de estado para proteção e cuidado com os animais no Piauí.",
    href: "https://cidadeverde.com/politica/457821/pacto-pelos-animais-preve-castracao-de-21-mil-caes-e-gatos-e-distribuira-racao",
    image: cidadeVerdePacto,
    imageAlt: "Matéria do Cidade Verde sobre o Pacto pelos Animais",
    rotate: 1.1,
  },
];

export function EPraJaPet() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(stageRef, { once: true, amount: 0.12 });
  const [live, setLive] = useState<boolean>(false);

  useEffect(() => {
    if (inView) setLive(true);
  }, [inView]);

  useEffect(() => {
    const boot = () => {
      const node = stageRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const visible =
        rect.top < window.innerHeight * 0.92 &&
        rect.bottom > window.innerHeight * 0.08;
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !live) return;

    video.currentTime = 0;
    const play = video.play();
    if (play && typeof play.catch === "function") {
      play.catch(() => {
        // autoplay bloqueado
      });
    }
  }, [live]);

  return (
    <section
      id="e-pra-ja-pet"
      ref={stageRef}
      className={`epet${live ? " is-live" : ""}${reduceMotion ? " is-instant" : ""}`}
      aria-labelledby="epet-letter-heading"
    >
      <div className="epet__board">
        <motion.article
          className="epet__letter"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={live ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <h2 id="epet-letter-heading" className="sr-only">
            Continuação da carta — É Pra Já Pet
          </h2>
          <p className="epet__letter-text">
            Em um dia de atendimentos no meu gabinete, recebi os responsáveis
            pela comissão de proteção aos animais da OAB Piauí. Estavam em busca
            de doação de ração, e uma pergunta surgiu: em que mais eu poderia
            ajudar a causa? Nasce aí um projeto para cuidar da causa animal no
            estado:{" "}
            <strong className="epet__letter-brand">O É Pra Já Pet</strong>, onde
            destinamos R$ 20 milhões para ações de proteção e cuidado com os
            animais. E, após todas as ações, a causa animal virou política de
            estado — com a criação do{" "}
            <strong className="epet__letter-brand">Pacto pelos Animais</strong>.
          </p>
        </motion.article>

        {CLIPS.map((clip) => (
          <a
            key={clip.id}
            className={`epet__clip epet__clip--${clip.slot}`}
            href={clip.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ["--clip-rot" as string]: `${clip.rotate}deg` }}
          >
            <span className="epet__clip-source">{clip.source}</span>
            <span className="epet__clip-card">
              <span className="epet__clip-copy">
                <span className="epet__clip-title">{clip.title}</span>
                <span className="epet__clip-body">{clip.body}</span>
              </span>
              <img
                className="epet__clip-photo"
                src={clip.image}
                alt={clip.imageAlt}
                loading="lazy"
              />
            </span>
          </a>
        ))}

        <aside className="epet__pets" aria-label="Vídeo É Pra Já Pet">
          <div className="epet__pets-frame">
            <video
              ref={videoRef}
              className="epet__pets-video"
              src={VIDEO_SRC}
              muted
              playsInline
              loop
              preload="auto"
            />
          </div>
        </aside>
      </div>

      <SectionContact />
    </section>
  );
}
