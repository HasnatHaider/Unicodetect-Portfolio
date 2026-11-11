import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "node:fs/promises";

const registryPath = "src/utils/Constant.js";
let registry = await readFile(registryPath, "utf8");
const variants = [];
for (const match of [
  ...registry.matchAll(
    /import (\w+) from "(\.\.\/assets\/images\/[^"\n]+\.(?:png|webp))";/g,
  ),
]) {
  const [, key, relative] = match;
  const original = relative.replace(/-\d+\.webp$/, ".png");
  const source = fileURLToPath(
    new URL(`../src/utils/${original}`, import.meta.url),
  );
  const metadata = await sharp(source).metadata();
  if (metadata.width < 700) continue;
  const prefix = original.replace(/\.png$/, "");
  const widths = [480, 960, 1600].filter((width) => width < metadata.width);
  widths.push(Math.min(metadata.width, 2000));
  const unique = [...new Set(widths)];
  for (const width of unique) {
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(
        fileURLToPath(
          new URL(`../src/utils/${prefix}-${width}.webp`, import.meta.url),
        ),
      );
  }
  const largest = unique.at(-1);
  registry = registry.replace(
    match[0],
    `import ${key} from "${prefix}-${largest}.webp";`,
  );
  variants.push({ key, prefix, widths: unique });
}
await writeFile(registryPath, registry);
let output = "// Generated responsive variants of large raster assets.\n";
for (const { key, prefix, widths } of variants)
  for (const width of widths)
    output += `import ${key}_${width} from "${prefix}-${width}.webp";\n`;
output += "export const responsiveImages = {\n";
for (const { key, widths } of variants)
  output += `  [${key}_${widths.at(-1)}]: ${JSON.stringify(widths).replace(/\[(.*)\]/, "[$1]")}.map((width, i) => [${widths.map((width) => `${key}_${width}`).join(", ")}][i] + ' ' + width + 'w').join(', '),\n`;
output += "};\n";
await writeFile("src/utils/responsiveImages.js", output);
console.log(`Converted ${variants.length} large PNG assets to responsive WebP`);
