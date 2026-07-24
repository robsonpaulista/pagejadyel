import type { MiniScreenPreview } from "./MiniScreensHandoff";

import mandatoConquistas from "../assets/previews/mandato-conquistas.jpg";
import mandatoProducao from "../assets/previews/mandato-producao.jpg";
import mandatoEspacos from "../assets/previews/mandato-espacos.jpg";
import mandatoMarcas from "../assets/previews/mandato-marcas.jpg";

import ecaPratica from "../assets/previews/eca-pratica.jpg";
import ecaImporta from "../assets/previews/eca-importa.jpg";
import ecaMandato from "../assets/previews/eca-mandato.jpg";
import ecaNumeros from "../assets/previews/eca-numeros.jpg";

import hospitalCapa from "../assets/previews/hospital-capa.jpg";
import hospitalReferencia from "../assets/previews/hospital-referencia.jpg";
import hospitalNumeros from "../assets/previews/hospital-numeros.jpg";
import hospitalAlcance from "../assets/previews/hospital-alcance.jpg";

import animalPolitica from "../assets/previews/animal-politica.jpg";
import animalCuidado from "../assets/previews/animal-cuidado.jpg";
import animalNumeros from "../assets/previews/animal-numeros.jpg";
import animalPacto from "../assets/previews/animal-pacto.jpg";

import catarataAbertura from "../assets/previews/catarata-abertura.jpg";
import catarataImpacto from "../assets/previews/catarata-impacto.jpg";
import catarataVidas from "../assets/previews/catarata-vidas.jpg";
import catarataAlcance from "../assets/previews/catarata-alcance.jpg";

import infraAbertura from "../assets/previews/infra-abertura.jpg";
import infraMapa from "../assets/previews/infra-mapa.jpg";
import infraNumeros from "../assets/previews/infra-numeros.jpg";
import infraAlcance from "../assets/previews/infra-alcance.jpg";

import callParticipar from "../assets/previews/call-participar.jpg";
import callJuntos from "../assets/previews/call-juntos.jpg";
import callUrna from "../assets/previews/call-urna.jpg";
import callCompartilhar from "../assets/previews/call-compartilhar.jpg";

const PRINT_POS = "top center";

/** Quatro telas do mandato (home → números) */
export const MANDATO_PREVIEWS: MiniScreenPreview[] = [
  {
    id: "conquistas",
    tone: "light",
    tag: "Jadyel Alencar",
    title: "Um mandato que entrega",
    meta: "Conquistas · ECA Digital",
    image: mandatoConquistas,
    imagePosition: PRINT_POS,
  },
  {
    id: "producao",
    tone: "dark",
    tag: "Produção",
    title: "783 proposições",
    meta: "51 de autoria · 82 relatadas",
    image: mandatoProducao,
    imagePosition: PRINT_POS,
  },
  {
    id: "espacos",
    tone: "light",
    tag: "Espaços",
    title: "Grandes decisões",
    meta: "Câmara · Comissões · Frentes",
    image: mandatoEspacos,
    imagePosition: PRINT_POS,
  },
  {
    id: "marcas",
    tone: "dark",
    tag: "Marcas",
    title: "Causas do mandato",
    meta: "ECA · Animal · Saúde · Obras",
    image: mandatoMarcas,
    imagePosition: PRINT_POS,
  },
];

/** Quatro telas da causa ECA Digital */
export const ECA_PREVIEWS: MiniScreenPreview[] = [
  {
    id: "pratica",
    tone: "light",
    tag: "ECA Digital",
    title: "Proteção na internet",
    meta: "O que mudou na prática",
    image: ecaPratica,
    imagePosition: PRINT_POS,
  },
  {
    id: "importa",
    tone: "dark",
    tag: "No dia a dia",
    title: "Por que isso importa",
    meta: "Infância também online",
    image: ecaImporta,
    imagePosition: PRINT_POS,
  },
  {
    id: "mandato",
    tone: "light",
    tag: "O mandato",
    title: "Papel do mandato",
    meta: "Relatoria · Lei 15.211",
    image: ecaMandato,
    imagePosition: PRINT_POS,
  },
  {
    id: "numeros",
    tone: "dark",
    tag: "Em números",
    title: "57% de exposição",
    meta: "Riscos no ambiente digital",
    image: ecaNumeros,
    imagePosition: PRINT_POS,
  },
];

/** Quatro telas da causa Hospital de Amor */
export const HOSPITAL_PREVIEWS: MiniScreenPreview[] = [
  {
    id: "capa",
    tone: "light",
    tag: "Hospital de Amor",
    title: "Cuidar com amor",
    meta: "Unidade em Teresina",
    image: hospitalCapa,
    imagePosition: PRINT_POS,
  },
  {
    id: "referencia",
    tone: "dark",
    tag: "Referência",
    title: "Oncologia no Piauí",
    meta: "Prevenir · Descobrir · Cuidar",
    image: hospitalReferencia,
    imagePosition: PRINT_POS,
  },
  {
    id: "numeros",
    tone: "light",
    tag: "Em números",
    title: "2 milhões+",
    meta: "Atendimentos · 100% SUS",
    image: hospitalNumeros,
    imagePosition: PRINT_POS,
  },
  {
    id: "alcance",
    tone: "dark",
    tag: "Alcance",
    title: "2.712 municípios",
    meta: "América Latina · SUS",
    image: hospitalAlcance,
    imagePosition: PRINT_POS,
  },
];

/** Quatro telas da causa Causa Animal */
export const ANIMAL_PREVIEWS: MiniScreenPreview[] = [
  {
    id: "politica",
    tone: "light",
    tag: "Causa Animal",
    title: "Compromisso de Estado",
    meta: "Pacto pelos Animais",
    image: animalPolitica,
    imagePosition: PRINT_POS,
  },
  {
    id: "cuidado",
    tone: "dark",
    tag: "Na ponta",
    title: "Castrar. Alimentar. Proteger.",
    meta: "Política completa",
    image: animalCuidado,
    imagePosition: PRINT_POS,
  },
  {
    id: "numeros",
    tone: "light",
    tag: "Em números",
    title: "4.877 castrações",
    meta: "Meta · 20 mil",
    image: animalNumeros,
    imagePosition: PRINT_POS,
  },
  {
    id: "pacto",
    tone: "dark",
    tag: "Alcance",
    title: "224 municípios",
    meta: "É Pra Já Pet",
    image: animalPacto,
    imagePosition: PRINT_POS,
  },
];

/** Quatro telas da causa Mutirões de Catarata */
export const CATARATA_PREVIEWS: MiniScreenPreview[] = [
  {
    id: "abertura",
    tone: "light",
    tag: "Catarata",
    title: "Visão e esperança",
    meta: "Mutirões no Piauí",
    image: catarataAbertura,
    imagePosition: PRINT_POS,
  },
  {
    id: "impacto",
    tone: "dark",
    tag: "Na prática",
    title: "20 mil novos começos",
    meta: "Atendimento · Cirurgia",
    image: catarataImpacto,
    imagePosition: PRINT_POS,
  },
  {
    id: "vidas",
    tone: "light",
    tag: "Em números",
    title: "Voltar a viver",
    meta: "Autonomia e dignidade",
    image: catarataVidas,
    imagePosition: PRINT_POS,
  },
  {
    id: "alcance",
    tone: "dark",
    tag: "Alcance",
    title: "Regiões do Piauí",
    meta: "Mutirões itinerantes",
    image: catarataAlcance,
    imagePosition: PRINT_POS,
  },
];

/** Quatro telas da causa Infraestrutura */
export const INFRA_PREVIEWS: MiniScreenPreview[] = [
  {
    id: "abertura",
    tone: "light",
    tag: "Infraestrutura",
    title: "Mais dignidade",
    meta: "Asfalto · Obras · Piauí",
    image: infraAbertura,
    imagePosition: PRINT_POS,
  },
  {
    id: "mapa",
    tone: "dark",
    tag: "O mapa",
    title: "O Piauí ganha caminho",
    meta: "Cidades e trajetos",
    image: infraMapa,
    imagePosition: PRINT_POS,
  },
  {
    id: "numeros",
    tone: "light",
    tag: "Em números",
    title: "130 mil m²",
    meta: "Asfalto · Investimento",
    image: infraNumeros,
    imagePosition: PRINT_POS,
  },
  {
    id: "alcance",
    tone: "dark",
    tag: "Alcance",
    title: "224 municípios",
    meta: "Rua a rua",
    image: infraAlcance,
    imagePosition: PRINT_POS,
  },
];

/** Entrada do call final */
export const CALL_PREVIEWS: MiniScreenPreview[] = [
  {
    id: "participar",
    tone: "light",
    tag: "Jadyel Alencar",
    title: "Fazer parte",
    meta: "A jornada continua",
    image: callParticipar,
    imagePosition: PRINT_POS,
  },
  {
    id: "juntos",
    tone: "dark",
    tag: "Piauí",
    title: "Ir mais longe",
    meta: "Missão coletiva",
    image: callJuntos,
    imagePosition: PRINT_POS,
  },
  {
    id: "urna",
    tone: "light",
    tag: "1000",
    title: "É pra já",
    meta: "Compromisso com o estado",
    image: callUrna,
    imagePosition: PRINT_POS,
  },
  {
    id: "compartilhar",
    tone: "dark",
    tag: "Convite",
    title: "Compartilhe",
    meta: "Quero fazer parte",
    image: callCompartilhar,
    imagePosition: PRINT_POS,
  },
];
