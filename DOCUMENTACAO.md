# Documentação do site — Jadyel Alencar

Landing page de campanha do Deputado Federal **Jadyel Alencar** (Piauí).  
Este arquivo descreve a estrutura, a narrativa e as ideias por trás de cada seção.

---

## 1. Visão geral

O site conta o mandato como uma sequência de **causas** — cada uma com uma capa emocional e telas de aprofundamento. A identidade gira em torno de:

- **Cuidar do Piauí** (propósito central)
- **É pra já** (urgência e entrega)
- **Prova** (números, leis, obras, imprensa)

Há **duas homes** no mesmo projeto:

| Rota | Nome | Para quê |
|------|------|----------|
| `/` | Home oficial | Campanha completa, com menu de causas |
| `/historia` | Home narrativa | Fluxo do envelope → comprovação → É Pra Já Pet (teste / versão narrativa) |

---

## 2. Stack técnica

| Camada | Tecnologia |
|--------|------------|
| Build | Vite 8 + TypeScript |
| UI | React 19 |
| Animação | Framer Motion + GSAP (ScrollTrigger) |
| Scroll | Lenis (smooth scroll) |
| Ícones | Lucide React |
| Lint | oxlint |

**Como rodar**

```bash
npm install
npm run dev      # http://localhost:5174
npm run build
```

Não há React Router: a troca entre `/` e `/historia` usa `window.location.pathname` + `popstate`.

---

## 3. Ideia de navegação

### Menu superior (`BottomBar`) — só na home oficial

Itens com acento de cor por causa:

1. **Início** → `#abertura`
2. **Mandato** (amarelo) → `#nmand-abertura`
3. **ECA Digital** (azul) → `#eca-pratica`
4. **Hospital de Amor** (rosa) → `#hospital-cta`
5. **Causa Animal** (laranja) → `#animal-politica`
6. **Catarata** (roxo) → `#catarata-abertura`
7. **Infraestrutura** (âmbar) → `#infra-abertura`

O clique leva à **primeira tela** da causa (entry panel), não só ao wrapper da seção.

### Scroll “handoff” (`MiniScreensHandoff`) — desktop

Em telas ≥ 768px, cada painel é uma etapa pinada: ao rolar, aparece uma faixa com **mini-telas** da próxima etapa e o salto suave para o painel seguinte. No mobile o fluxo fica mais estático (sem o mesmo scrub).

### Contato (`SectionContact`)

Bloco repetido no rodapé das telas:

- Instagram [@jadyelalencar](https://www.instagram.com/jadyelalencar/)
- E-mail `contato@jadyelalencar.com.br`
- WhatsApp (número configurável em `src/components/SectionContact.tsx` → `WHATSAPP_NUMBER`)

### Jingle (`JinglePlayer`)

Player do jingle da campanha (“O Piauí é pra já”), ligado ao YouTube. O convite para tocar aparece na abertura; o jingle influencia o “ambiente” visual da home.

---

## 4. Home oficial (`/`) — mapa das seções

Ordem no `main`:

```
Abertura
  → Mandato (4 telas)
  → ECA Digital (4 telas)
  → Hospital de Amor (3 telas)
  → Causa Animal (3 telas)
  → Catarata (3 telas)
  → Infraestrutura (3 telas)
  → Call Final
```

### 4.1 Abertura — `#abertura`

**Arquivo:** `src/components/sections/Abertura.tsx`  
**Ideia:** primeira impressão. Um só propósito — cuidar do Piauí.

| Elemento | Conteúdo / função |
|----------|-------------------|
| Headline | “Um só propósito: CUIDAR DO PIAUÍ” |
| Lede | Crianças, saúde, animais e obras |
| Marca | `NameLockup` (Deputado Federal · Jadyel Alencar) |
| CTAs | “Junte-se a nós” + convite do jingle |
| Contato | Instagram, e-mail, WhatsApp |
| Visual | Foto com bandeira do Piauí em full-bleed |

Ao rolar (desktop), a abertura “abre” a próxima seção (Mandato) via handoff.

---

### 4.2 Números do Mandato — `#numeros-do-mandato`

**Arquivo:** `src/components/sections/NumerosDoMandato.tsx`  
**Ideia:** o mandato que cuida, trabalha e **entrega**. Produção legislativa + presença em espaços de decisão.

| Id do painel | Tema |
|--------------|------|
| `nmand-abertura` | Capa: ECA Digital como principal conquista + outras entregas (inclusão, meio ambiente, cultura, rádios) |
| `nmand-producao` | Números: proposições, autoria, relatorias, frentes (fundo escuro) |
| `nmand-espacos` | CDE e agendas estratégicas (economia digital, IA, energia…) |
| `nmand-marcas` | Marcas do mandato por causa (crianças digitais, animal, TEA, economia, Piauí) |

**Tom visual:** capa clara/editorial → números escuros → fechamento das marcas.

---

### 4.3 ECA Digital — `#eca-digital`

**Arquivo:** `src/components/sections/EcaDigital.tsx`  
**Ideia:** proteção das crianças **também na internet**. Relatoria de Jadyel → Lei 15.211/2025.

| Id do painel | Tema |
|--------------|------|
| `eca-pratica` | O que mudou na prática (cards) |
| `eca-importa` | Por que o tema importa |
| `eca-mandato` | Linha do tempo + papel do mandato + cobertura de imprensa |
| `eca-numeros` | Exposição infantil à internet + CTA “Ver a lei” (fundo escuro) |

**Insight de design:** em fundos escuros, o texto de detalhe (lede) usa `#C8C5BF` para leitura confortável.

---

### 4.4 Hospital de Amor — `#hospital-de-amor`

**Arquivo:** `src/components/sections/HospitalDeAmor.tsx`  
**Ideia:** cuidado oncológico de referência chegando ao Piauí — prevenção e diagnóstico pelo SUS.

| Id do painel | Tema |
|--------------|------|
| `hospital-cta` | Capa emocional (“cuidar com amor”); investimento e local das obras |
| `hospital-referencia` | Referência nacional (Barretos / Hospital de Amor) no estado |
| `hospital-numeros` | Escala de atendimentos; “100% pelo SUS” (fundo escuro) |

---

### 4.5 Causa Animal — `#pacto-pelos-animais`

**Arquivo:** `src/components/sections/CausaAnimal.tsx`  
**Ideia:** do cuidado pontual à **política pública permanente** (Pacto / É Pra Já Pet).

| Id do painel | Tema |
|--------------|------|
| `animal-politica` | Capa: “Cuidar dos animais virou compromisso de Estado” + CTA “Conheça essa história” |
| `animal-cuidado` | Pilares: castrar, alimentar, proteger |
| `animal-numeros` | Castrações e alcance do Pacto (fundo escuro) |

---

### 4.6 Mutirão da Catarata — `#mutirao-da-catarata`

**Arquivo:** `src/components/sections/MutiraoCatarata.tsx`  
**Ideia:** devolver visão = devolver autonomia e esperança.

| Id do painel | Tema |
|--------------|------|
| `catarata-abertura` | Capa emocional; escala das cirurgias |
| `catarata-impacto` | Jornada: atendimento → cirurgia → nova vida |
| `catarata-vidas` | Números e sentido humano (fundo escuro) |

---

### 4.7 Infraestrutura — `#infraestrutura`

**Arquivo:** `src/components/sections/Infraestrutura.tsx`  
**Ideia:** obras como dignidade — asfalto, praças, UBS, pontes em todo o estado.

| Id do painel | Tema |
|--------------|------|
| `infra-abertura` | “Mais infraestrutura, mais dignidade” |
| `infra-mapa` | Mapa das obras (`PiauiRoadsMap`) |
| `infra-numeros` | Indicadores (ex.: m² de asfalto) + ponte para o call final |

---

### 4.8 Call Final — `#participar`

**Arquivo:** `src/components/sections/CallFinal.tsx`  
**Ideia:** fechamento emocional e convite a participar.

- Headline de juntos / Piauí ainda mais longe  
- `NameLockup` + CTA “Quero fazer parte disso”  
- Foto de assinatura + número **10** (urna)  
- Contatos finais  

Não usa `MiniScreensHandoff` — é uma seção clássica de conversão.

---

## 5. Home narrativa (`/historia`)

**Ideia:** contar a origem do mandato como uma **carta** e depois mostrar prova → causa animal.

```
Mensagem (envelope)
  → CompromissoComprovacao (carta + recortes)
  → É Pra Já Pet (vídeo + imprensa)
```

| Seção | Id | Arquivo | Ideia |
|-------|-----|---------|-------|
| Mensagem | `#mensagem` | `Mensagem.tsx` | Envelope abre → carta com a origem do mandato / mensagem da mãe |
| Comprovação | `#env-mand-abertura` | `CompromissoComprovacao.tsx` | Provas visuais (imprensa / marcos) ligadas à carta |
| É Pra Já Pet | `#e-pra-ja-pet` | `EPraJaPet.tsx` | Narrativa OAB → festival / Pacto; vídeo `public/petjadyel.mp4` |

Orquestração: `MandatoAposMensagem.tsx`.  
Sem menu `BottomBar` (`page--content-only`).

---

## 6. Design system (resumo)

### Cores (`src/index.css`)

| Token | Uso |
|-------|-----|
| `--yellow` `#ffbe00` | Identidade / conversão / highlights de campanha |
| `--pink` / `--orange` / `--blue` / `--amber` / `--purple` | Acentos das causas |
| `--ink` / `--ink-muted` / `--ink-soft` | Texto em fundos claros |
| `--dark` / `--dark-ink` | Painéis de números |
| Detalhe em fundo escuro | Preferir `#C8C5BF` (legado/leitura) |

### Tipografia

- UI: **Plus Jakarta Sans**  
- Headline grande, lede mais leve; `Highlight` colore a palavra-chave da causa

### Componentes de marca

- **`NameLockup`** — Deputado Federal + Jadyel / Alencar (cargo alinhado na largura do nome)  
- **`BrandMark`** — versão compacta para handoffs  
- **`SectionTag`** — rótulo de seção  
- **`Highlight`** — palavra de destaque com cor de causa  

### Princípios de layout usados no projeto

- Hero com foto dominante (quando há foto)  
- Uma ideia por painel  
- Menos cards; quando há lista, preferir visual editorial limpo  
- Contato discreto no rodapé das telas  

---

## 7. Estrutura de pastas (o que importa)

```
src/
  App.tsx                 # Rotas / e /historia
  components/
    SectionContact.tsx    # Contatos
    JinglePlayer.tsx      # Áudio da campanha
    MiniScreensHandoff.tsx
    SmoothScroll.tsx
    PageNav.tsx           # Legado (barra ant/prox) — fora do App atual
    sections/             # Todas as seções narrativas
    ui/                   # Button, NameLockup, Highlight…
  assets/                 # Fotos, press, envelopes, previews
  lib/                    # storyPages, ponte Lenis/GSAP
public/                   # Vídeos (petjadyel, hospitaldeamor…)
```

---

## 8. Cadeia de handoff (desktop, home oficial)

```
abertura
  → nmand-abertura → nmand-producao → nmand-espacos → nmand-marcas
  → eca-pratica → eca-importa → eca-mandato → eca-numeros
  → hospital-cta → hospital-referencia → hospital-numeros
  → animal-politica → animal-cuidado → animal-numeros
  → catarata-abertura → catarata-impacto → catarata-vidas
  → infra-abertura → infra-mapa → infra-numeros
  → participar
```

---

## 9. Pendências / pontos de atenção

1. **WhatsApp** — definir `WHATSAPP_NUMBER` em `SectionContact.tsx` (DDI + número, só dígitos).  
2. **PageNav** — componente ainda no repo, mas **não está montado** no `App` (barra amarela anterior/próxima foi removida).  
3. **`/historia`** — fluxo independente; `storyPages.ts` ainda menciona páginas pensadas para navegação da narrativa antiga.  
4. **CTA “Junte-se a nós” / “Quero fazer parte”** — muitos apontam para `#participar`; validar destino final (formulário, WhatsApp, etc.).  

---

## 10. Como editar coisas comuns

| Quero… | Onde |
|--------|------|
| Mudar texto da Abertura | `sections/Abertura.tsx` (+ `Abertura.css`) |
| Mudar entregas do Mandato | `HERO_DELIVERIES` em `NumerosDoMandato.tsx` |
| Mudar capa da Causa Animal | `AnimalPolicy` em `CausaAnimal.tsx` |
| Contatos (IG / e-mail / WA) | `components/SectionContact.tsx` |
| Cores e tipografia | `src/index.css` |
| Itens do menu | `CAUSE_LINKS` em `BottomBar.tsx` |
| Vídeo do Pet | `public/petjadyel.mp4` |

---

*Documento gerado a partir do estado atual do repositório `pagejadyel`. Atualize este arquivo quando a narrativa ou a estrutura de seções mudar de forma relevante.*
