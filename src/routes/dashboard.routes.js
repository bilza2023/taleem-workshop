import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decksDir = path.join(__dirname, "../../public/content/decks");

router.get("/", (req, res) => {

  let decks = [];

  try {
    decks = fs
      .readdirSync(decksDir)
      .filter(file => file.endsWith(".json"))
      .map(file => file.replace(".json", ""))
      .sort();
  } catch (err) {
    console.error("Error reading decks:", err);
  }

  res.render("dashboard/index", { decks });

});

export default router;