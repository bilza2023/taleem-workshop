import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {validateDeckV1, validatePlayerDeckV1} from "../../node_modules/taleem-player/dist/validation/index.js";

import { getDeckImages }from "./getDeckImages.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decksDir = path.join(__dirname, "../../public/content/decks");

function loadDeck(slug){
  try{
    const file = path.join(decksDir, `${slug}.json`);
    const raw = fs.readFileSync(file, "utf-8");
    return JSON.parse(raw);
  }catch(err){
    console.error("Deck load failed:", slug, err);
    return null;
  }
}
/* -------------------------
dummy tests (replace later)
------------------------- */

function testSlides(slug){
  return false;
}

function testDuration(slug){
  const deck = loadDeck(slug)
  const r = validatePlayerDeckV1(deck)
  return r.ok
}

function testSchema(slug){
  const deck = loadDeck(slug);
  if(!deck) return false;

  const r = validateDeckV1(deck);
  return r.ok;
}

function testImages(slug){
  try{

    const deck = loadDeck(slug);
    if(!deck) return false;

    const images = getDeckImages(deck);

    const imgDir = path.join(__dirname, "../../public/content/images");

    for(const img of images){
      const file = path.join(imgDir, img);
      if(!fs.existsSync(file)){
        return false;
      }
    }

    return true;

  }catch{
    return false;
  }
}
function testBG(slug){
  try{

    const deck = loadDeck(slug);
    if(!deck) return false;

    const bg = deck?.background?.backgroundImage;
    if(!bg) return true;

    const imgDir = path.join(__dirname, "../../public/content/images");

    const file = path.join(imgDir, bg.split("/").pop());

    return fs.existsSync(file);

  }catch{
    return false;
  }
}

function testAudio(slug){
  try{

    const audioDir = path.join(__dirname, "../../public/content/audio");

    const opus = path.join(audioDir, `${slug}.opus`);
    const mp3  = path.join(audioDir, `${slug}.mp3`);

    if(fs.existsSync(opus)) return true;
    if(fs.existsSync(mp3)) return true;

    const deck = loadDeck(slug);

    if(deck && deck.audio){
      const custom = path.join(audioDir, deck.audio);
      if(fs.existsSync(custom)) return true;
    }

    return false;

  }catch{
    return false;
  }
}


/* -------------------------
route
------------------------- */

router.get("/", (req, res) => {

  let slugs = [];

  try {
    slugs = fs
      .readdirSync(decksDir)
      .filter(file => file.endsWith(".json"))
      .map(file => file.replace(".json", ""))
      .sort();
  } catch (err) {
    console.error("Error reading decks:", err);
  }

  const decks = slugs.map(slug => ({
    slug: slug,
    slides: testSlides(slug),
    duration: testDuration(slug),
    schema: testSchema(slug),
    images: testImages(slug),
    bg: testBG(slug),
    audio: testAudio(slug)
  }));

  res.render("dashboard/index", { decks });

});

export default router;