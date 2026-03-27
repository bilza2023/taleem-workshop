import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ directories
const slidesDir = path.join(__dirname, "../../public/workspace/slides");
const timingsDir = path.join(__dirname, "../../public/workspace/timings");
const decksDir = path.join(__dirname, "../../public/content/decks");

// ✅ helper
function readDirSafe(dir) {
  try {
    return fs
      .readdirSync(dir)
      .filter(file => file.endsWith(".json"))
      .map(file => file.replace(".json", ""))
      .sort();
  } catch (err) {
    console.error("Error reading dir:", dir, err);
    return [];
  }
}

router.get("/", (req, res) => {

  const slides = readDirSafe(slidesDir);
  const timings = readDirSafe(timingsDir);
  const archive = readDirSafe(decksDir);

  res.render("home/index", {
    slides,
    timings,
    archive,
    stage: req.query.stage || "slides"
  });

});

export default router;