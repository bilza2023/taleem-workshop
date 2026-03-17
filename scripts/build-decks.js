import fs from "fs";
import path from "path";
import TaleemBuilder from "taleem-builder";

const builderDir = "/home/bilal-tariq/00--TALEEM/taleem-workshop/builder-decks";
const outputDir  = "/home/bilal-tariq/00--TALEEM/taleem-workshop/public/content/decks";

const files = fs.readdirSync(builderDir);

for (const file of files) {

  if (!file.endsWith(".js")) continue;

  const slug = file.replace(".js", "");
  const inputPath = path.join(builderDir, file);
  const outputPath = path.join(outputDir, `${slug}.json`);

  // 🚨 PANIC RULE
  if (!fs.existsSync(outputPath)) {
    throw new Error(`PANIC: Missing ${slug}.json in content/decks`);
  }

  const code = fs.readFileSync(inputPath, "utf8");

  try {

    const fn = new Function("TaleemBuilder", code);
    const deck = fn(TaleemBuilder);

    fs.writeFileSync(
      outputPath,
      JSON.stringify(deck, null, 2)
    );

    console.log(`✔ Updated ${slug}.json`);

  } catch (err) {

    console.log(`✖ Error building ${file}`);
    console.log(err.message);

  }

}