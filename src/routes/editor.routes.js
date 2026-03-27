import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

/* recreate __dirname */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ✅ CORRECT decks folder */
const decksDir = path.join(__dirname, "../../public/workspace/slides");

/* ensure folder exists */
fs.mkdirSync(decksDir, { recursive: true });

/* PAGE */
router.get("/", (req, res) => {
  res.render("editor/index");
});

/* SAVE DECK */
router.post("/save", (req, res) => {

  const { slug, content } = req.body;

  if (!slug) {
    return res.json({ message: "Slug missing." });
  }

  if (!content) {
    return res.json({ message: "Content missing." });
  }

  if (!/^[a-z0-9-_]+$/i.test(slug)) {
    return res.json({ message: "Invalid slug." });
  }

  const filePath = path.join(decksDir, `${slug}.json`);

  console.log("filePath" , filePath);
  
  /* validate JSON */
  try {
    JSON.parse(content);
  } catch (err) {
    return res.json({ message: "Invalid JSON." });
  }

  try {
    fs.writeFileSync(filePath, content);
    return res.json({ message: "Deck saved." });
  } catch (err) {
    console.error(err);
    return res.json({ message: "Error saving deck." });
  }

});

export default router;