import { Highlight } from "../ui";
import type { CauseStoryData } from "./CauseStory";

/** Causas narradas pelo CauseStory genérico (ECA, Hospital e Animal têm página própria). */
export const CAUSES: CauseStoryData[] = [
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
];
