import { Highlight } from "../ui";
import type { CauseStoryData } from "./CauseStory";

/** Causas ainda no CauseStory genérico (as demais têm página própria). */
export const CAUSES: CauseStoryData[] = [
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
