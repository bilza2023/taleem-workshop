import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decksDir = path.join(__dirname, "../../public/workspace/slides");

fs.mkdirSync(decksDir, { recursive: true });

router.get("/", (req, res) => {

  console.log("editor-ui");
  const slug = req.query.deck;
  let deck = null;

  if (slug && /^[a-z0-9-_]+$/i.test(slug)) {
    const filePath = path.join(decksDir, `${slug}.json`);
    
    console.log("filePath" , filePath);

    if (fs.existsSync(filePath)) {
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        deck = JSON.parse(raw);
        // console.log("deck" , deck);
      } catch (err) {
        console.error("Failed to parse deck:", err);
        deck = null;
      }
    }
  }

  res.render("editor-ui/index", { slug: slug || null, deck });

});


router.post("/save", (req, res) => {
  
  const { slug, deck } = req.body;

  // ✅ validations
  if (!slug) {
    return res.json({ message: "Slug missing." });
  }

  if (!deck || typeof deck !== "object") {
    return res.json({ message: "Deck missing or invalid." });
  }

  if (!/^[a-z0-9-_]+$/i.test(slug)) {
    return res.json({ message: "Invalid slug." });
  }

  // ✅ FIX: define filePath properly
  const filePath = path.join(decksDir, `${slug}.json`);

  console.log("Saving deck to:", filePath);

  try {
    fs.writeFileSync(filePath, JSON.stringify(deck, null, 2));
    return res.json({ message: "Deck saved." });
  } catch (err) {
    console.error("Save error:", err);
    return res.json({ message: "Error saving deck." });
  }
  
});

export default router;