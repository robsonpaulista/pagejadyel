/**
 * Captura prints reais do conteúdo de cada tela (não fotos soltas).
 * Usa Google Chrome do sistema.
 *
 * Uso: node scripts/capture-previews.mjs
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../src/assets/previews");
const BASE = process.env.PREVIEW_URL ?? "http://localhost:5174";

/** [seletor do track/seção, nome do arquivo] */
const SHOTS = [
  ["#nmand-abertura", "mandato-conquistas"],
  ["#nmand-producao", "mandato-producao"],
  ["#nmand-espacos", "mandato-espacos"],
  ["#nmand-marcas", "mandato-marcas"],
  ["#eca-pratica", "eca-pratica"],
  ["#eca-importa", "eca-importa"],
  ["#eca-mandato", "eca-mandato"],
  ["#eca-numeros", "eca-numeros"],
  ["#hospital-cta", "hospital-capa"],
  ["#hospital-referencia", "hospital-referencia"],
  ["#hospital-numeros", "hospital-numeros"],
  ["#animal-politica", "animal-politica"],
  ["#animal-cuidado", "animal-cuidado"],
  ["#animal-numeros", "animal-numeros"],
  ["#catarata-abertura", "catarata-abertura"],
  ["#catarata-impacto", "catarata-impacto"],
  ["#catarata-vidas", "catarata-vidas"],
  ["#infra-abertura", "infra-abertura"],
  ["#infra-mapa", "infra-mapa"],
  ["#infra-numeros", "infra-numeros"],
  ["#participar", "call-participar"],
];

const EXTRAS = [
  ["#hospital-numeros", "hospital-alcance"],
  ["#animal-numeros", "animal-pacto"],
  ["#catarata-impacto", "catarata-alcance"],
  ["#infra-numeros", "infra-alcance"],
  ["#participar", "call-juntos"],
  ["#participar", "call-urna"],
  ["#participar", "call-compartilhar"],
];

async function preparePage(page) {
  await page.addStyleTag({
    content: `
      .site-nav, .nav, header, [class*="Nav"] { opacity: 0 !important; pointer-events: none !important; }
      .mini-handoff__band { display: none !important; height: 0 !important; visibility: hidden !important; }
      .mini-handoff {
        height: 900px !important;
        min-height: 900px !important;
      }
      .mini-handoff__pin {
        position: relative !important;
        top: 0 !important;
        height: 900px !important;
        min-height: 900px !important;
        max-height: 900px !important;
        overflow: hidden !important;
      }
      .mini-handoff__stage {
        height: 100% !important;
        overflow: hidden !important;
      }
      .mini-handoff__content {
        position: absolute !important;
        inset: 0 !important;
        height: 100% !important;
        width: 100% !important;
        opacity: 1 !important;
        visibility: visible !important;
        overflow: hidden !important;
      }
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }
    `,
  });
}

async function shotPin(page, trackSelector, fileBase, yShift = 0) {
  const track = page.locator(trackSelector).first();
  await track.waitFor({ state: "attached", timeout: 20000 });
  await track.scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);

  // Preferir o pin (viewport da página); fallback no track
  const pin = track.locator(".mini-handoff__pin").first();
  const target = (await pin.count()) > 0 ? pin : track;
  const box = await target.boundingBox();
  if (!box || box.width < 100 || box.height < 100) {
    throw new Error(`Box inválido: ${trackSelector}`);
  }

  const clip = {
    x: Math.max(0, Math.round(box.x)),
    y: Math.max(0, Math.round(box.y + yShift)),
    width: Math.round(Math.min(box.width, 1440)),
    height: Math.round(Math.min(box.height - yShift, 820)),
  };

  if (clip.height < 200) {
    clip.y = Math.max(0, Math.round(box.y));
    clip.height = Math.round(Math.min(box.height, 820));
  }

  const outPath = path.join(OUT, `${fileBase}.jpg`);
  await page.screenshot({
    path: outPath,
    type: "jpeg",
    quality: 84,
    clip,
  });
  console.log("ok", fileBase, JSON.stringify(clip));
  return outPath;
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 90000 });
  await preparePage(page);
  await page.waitForTimeout(500);

  const manifest = [];
  for (const [selector, name] of SHOTS) {
    try {
      await shotPin(page, selector, name);
      manifest.push({ selector, file: `${name}.jpg` });
    } catch (err) {
      console.error("fail", name, selector, err.message);
    }
  }

  // Recortes com offset vertical para telas sem seção própria
  const shifts = {
    "hospital-alcance": 120,
    "animal-pacto": 120,
    "catarata-alcance": 200,
    "infra-alcance": 120,
    "call-juntos": 80,
    "call-urna": 160,
    "call-compartilhar": 240,
  };

  for (const [selector, name] of EXTRAS) {
    try {
      await shotPin(page, selector, name, shifts[name] ?? 0);
      manifest.push({ selector, file: `${name}.jpg` });
    } catch (err) {
      console.error("fail", name, err.message);
    }
  }

  await writeFile(
    path.join(OUT, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
  await browser.close();
  console.log("done", manifest.length, "prints em", OUT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
