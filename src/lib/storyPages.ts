/** Páginas da narrativa (ordem de navegação). Home fica fora da barra. */
export type StoryPage = {
  id: string;
  label: string;
};

export const STORY_PAGES: readonly StoryPage[] = [
  { id: "abertura", label: "Início" },
  { id: "nmand-abertura", label: "Mandato" },
  { id: "nmand-producao", label: "Produção" },
  { id: "nmand-espacos", label: "Espaços" },
  { id: "nmand-marcas", label: "Marcas" },
  { id: "eca-pratica", label: "ECA Digital" },
  { id: "eca-importa", label: "Por que importa" },
  { id: "eca-mandato", label: "No mandato" },
  { id: "eca-numeros", label: "Números ECA" },
  { id: "hospital-cta", label: "Hospital de Amor" },
  { id: "hospital-referencia", label: "Referência" },
  { id: "hospital-numeros", label: "Números HAM" },
  { id: "animal-politica", label: "Causa Animal" },
  { id: "animal-cuidado", label: "Cuidado" },
  { id: "animal-numeros", label: "Números Animal" },
  { id: "catarata-abertura", label: "Catarata" },
  { id: "catarata-impacto", label: "Impacto" },
  { id: "catarata-vidas", label: "Vidas" },
  { id: "infra-abertura", label: "Infraestrutura" },
  { id: "infra-mapa", label: "Mapa" },
  { id: "infra-numeros", label: "Números Infra" },
  { id: "participar", label: "Participar" },
] as const;

export const HOME_PAGE_ID = "abertura";
