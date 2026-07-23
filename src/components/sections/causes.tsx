import { Highlight } from "../ui";
import type { CauseStoryData } from "./CauseStory";

/** Causas narradas pelo CauseStory genérico (ECA e Hospital têm página própria). */
export const CAUSES: CauseStoryData[] = [
  {
    id: "pacto-pelos-animais",
    number: "06",
    tag: "Pacto pelos Animais",
    color: "orange",
    headline: (
      <>
        <Highlight color="orange">Proteção e respeito</Highlight> para quem não
        tem voz.
      </>
    ),
    body: "Mais de 20 mil castrações, combate aos maus-tratos e políticas públicas permanentes para proteger quem não tem voz.",
    mediaCaption: "Fotografia — cão e gato",
    reverse: true,
  },
  {
    id: "infraestrutura",
    number: "08",
    tag: "Infraestrutura",
    color: "amber",
    headline: (
      <>
        Mais <Highlight color="amber">infraestrutura</Highlight>, mais
        dignidade.
      </>
    ),
    body: "Asfalto, calçamento, praças, pontes, UBS e muito mais para levar dignidade e desenvolvimento a todas as regiões do Piauí.",
    mediaCaption: "Fotografia — estrada",
    thumbs: ["Obra 1", "Obra 2", "Obra 3"],
    reverse: true,
  },
  {
    id: "mutirao-da-catarata",
    number: "09",
    tag: "Mutirão da Catarata",
    color: "purple",
    headline: (
      <>
        Devolvendo <Highlight color="purple">visão</Highlight>, devolvendo{" "}
        <Highlight color="purple">esperança</Highlight>.
      </>
    ),
    body: "Mais de 20 mil cirurgias realizadas, devolvendo visão, autoestima e qualidade de vida para milhares de piauienses.",
    mediaCaption: "Fotografia — paciente sorrindo",
  },
];
