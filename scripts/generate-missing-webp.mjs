/**
 * Generates WebP versions for images not yet converted:
 *  - iconic-phones-group.png  → 200w and 400w WebP
 *  - 9 remaining Tech logo PNGs → 210w and 420w WebP
 *
 * Run once: node scripts/generate-missing-webp.mjs
 */
import sharp from "sharp";
import { existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG = resolve(__dirname, "../src/assets/images");

const jobs = [
  // iconic-phones-group: 2381px wide, shown at ~198px
  { src: "iconic-phones-group.png", widths: [200, 400] },

  // Tech logos: shown at ~210px
  { src: "Tech---AWS_1.0.png",        widths: [210, 420] },
  { src: "Tech---Android_1.0.png",    widths: [210, 420] },
  { src: "Tech---GitHub_1.0.png",     widths: [210, 420] },
  { src: "Tech---Next.js_1.0.png",    widths: [210, 420] },
  { src: "Tech---Node.js_1.0.png",    widths: [210, 420] },
  { src: "Tech---OpenAI_1.0.png",     widths: [210, 420] },
  { src: "Tech---Python_1.0.png",     widths: [210, 420] },
  { src: "Tech---React_1.0.png",      widths: [210, 420] },
  { src: "Tech---iOS_1.0.png",        widths: [210, 420] },
];

for (const { src, widths } of jobs) {
  const input = resolve(IMG, src);
  const base = src.replace(/\.png$/, "");

  for (const w of widths) {
    const out = resolve(IMG, `${base}-${w}.webp`);
    if (existsSync(out)) {
      console.log(`SKIP  ${base}-${w}.webp (already exists)`);
      continue;
    }
    try {
      await sharp(input)
        .resize(w, null, { withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(out);
      console.log(`OK    ${base}-${w}.webp`);
    } catch (err) {
      console.error(`FAIL  ${base}-${w}.webp — ${err.message}`);
    }
  }
}

console.log("\nDone.");
