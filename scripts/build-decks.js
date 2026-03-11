import fs from "fs";
import path from "path";
import TaleemBuilder from "taleem-builder";

const builderDir = "./public/builder-decks";

const files = fs.readdirSync(builderDir);

for (const file of files) {

  if (!file.endsWith(".js")) continue;

  const slug = file.replace(".js", "");

  const filePath = path.join(builderDir, file);

  const code = fs.readFileSync(filePath, "utf8");

  try {

    const fn = new Function("TaleemBuilder", code);

    const deck = fn(TaleemBuilder);

    const outputPath = path.join(builderDir, `${slug}.json`);

    fs.writeFileSync(
      outputPath,
      JSON.stringify(deck, null, 2)
    );

    console.log(`✔ Built ${slug}.json`);

  } catch (err) {

    console.log(`✖ Error building ${file}`);
    console.log(err.message);

  }

}
