
// pull.js
import fs from "fs";
import path from "path";

const ROOT = "/home/bilal-tariq/00--TALEEM===>/taleem-workshop";
const ARCHIVE = path.join(ROOT, "archive");
const STAGE = path.join(ROOT, "stage");

const deckName = process.argv[2];

if (!deckName) {
  console.error("❌ Provide deck name. Example: node pull.js my-deck.json");
  process.exit(1);
}

// Ensure stage is empty
function ensureStageEmpty() {
  const folders = ["decks", "audio", "images"];
  for (const folder of folders) {
    const files = fs.readdirSync(path.join(STAGE, folder));
    if (files.length > 0) {
      console.error("❌ Stage not empty. Finish current session first.");
      process.exit(1);
    }
  }
}

// Extract image references from deck JSON
function extractImages(deckPath) {
  const deck = JSON.parse(fs.readFileSync(deckPath, "utf-8"));
  const images = new Set();

  if (!deck.deck) return [];

  for (const slide of deck.deck) {
    if (!slide.data) continue;

    for (const item of slide.data) {
      if (item.content && item.content.match(/\.(png|jpg|jpeg|svg|webp)$/)) {
        images.add(item.content);
      }
    }
  }

  return Array.from(images);
}

ensureStageEmpty();

const archiveDeckPath = path.join(ARCHIVE, "decks", deckName);
const stageDeckPath = path.join(STAGE, "decks", deckName);

if (!fs.existsSync(archiveDeckPath)) {
  console.error("❌ Deck not found in archive.");
  process.exit(1);
}

// MOVE deck
fs.renameSync(archiveDeckPath, stageDeckPath);
console.log("✅ Deck moved to stage");

// MOVE audio if exists
const audioName = deckName.replace(".json", ".mp3");
const archiveAudioPath = path.join(ARCHIVE, "audio", audioName);
const stageAudioPath = path.join(STAGE, "audio", audioName);

if (fs.existsSync(archiveAudioPath)) {
  fs.renameSync(archiveAudioPath, stageAudioPath);
  console.log("✅ Audio moved to stage");
}

// COPY images
const images = extractImages(stageDeckPath);

for (const img of images) {
  const archiveImg = path.join(ARCHIVE, "images", img);
  const stageImg = path.join(STAGE, "images", img);

  if (fs.existsSync(archiveImg)) {
    fs.copyFileSync(archiveImg, stageImg);
    console.log("📷 Copied image:", img);
  } else {
    console.warn("⚠ Image missing in archive:", img);
  }
}

console.log("🚀 Pull complete.");