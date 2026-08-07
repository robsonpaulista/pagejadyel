/** Páginas da narrativa (ordem de navegação). Home fica fora da barra. */
export type StoryPage = {
  id: string;
  label: string;
};

export const STORY_PAGES: readonly StoryPage[] = [
  { id: "mensagem", label: "Mensagem" },
  { id: "env-mand-abertura", label: "Propostas" },
  { id: "hospital-de-amor", label: "Hospital de Amor" },
  { id: "e-pra-ja-pet", label: "É Pra Já Pet" },
] as const;

export const HOME_PAGE_ID = "mensagem";
