/**
 * Case study card images: 1024w and 480w WebP from the 1672px PNG masters,
 * plus a 1280w WebP of the AI video workspace image.
 *
 * Run: node scripts/generate-card-webp.mjs
 */
import sharp from "sharp";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const IMG = resolve(import.meta.dirname, "../src/assets/images");
const jobs = [
  ...[
    "CareCompass",
    "BellReserveAIReceptionistDashboard",
    "ContractorConnect",
    "IconicBeauti",
    "DailyDigest",
    "STN",
    "TaskHive",
  ].flatMap((name) =>
    [480, 1024].map((width) => ({ name, width, out: `${name}-card-${width}.webp` })),
  ),
  { name: "AI-Video-Production-Workspace", width: 1280, out: "AI-Video-Production-Workspace-1280.webp", quality: 75 },
];

for (const { name, width, out, quality = 80 } of jobs) {
  const target = resolve(IMG, out);
  if (existsSync(target)) {
    console.log(`SKIP ${out}`);
    continue;
  }
  await sharp(resolve(IMG, `${name}.png`))
    .resize(width, null, { withoutEnlargement: true })
    .webp({ quality })
    .toFile(target);
  console.log(`OK   ${out} ${Math.round(statSync(target).size / 1024)} KB`);
}
