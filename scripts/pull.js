

import fs from "fs";
import path from "path";
import { getDeckImages } from "./getDeckImages.js";

const ROOT = "/home/bilal-tariq/00--TALEEM===>/taleem-workshop";
const ARCHIVE = path.join(ROOT, "archive");
const STAGE = path.join(ROOT, "stage");

const archiveDeckDir = path.join(ARCHIVE, "decks");
const archiveAudioDir = path.join(ARCHIVE, "audio");
const archiveImageDir = path.join(ARCHIVE, "images");

const stageDeckDir = path.join(STAGE, "decks");
const stageAudioDir = path.join(STAGE, "audio");
const stageImageDir = path.join(STAGE, "images");

// --------------------------------------------------
// 1️⃣ Ensure stage is clean
// --------------------------------------------------

function ensureStageClean() {
  const folders = [stageDeckDir, stageAudioDir, stageImageDir];

  for (const folder of folders) {
    const files = fs.readdirSync(folder);
    if (files.length > 0) {
      console.error("❌ Stage is not empty. Finish current session first.");
      process.exit(1);
    }
  }
}

// --------------------------------------------------
// 2️⃣ Get audio filename from deck
// --------------------------------------------------

function getAudioFilename(deck) {
  if (!deck.audio || typeof deck.audio !== "string") {
    return null;
  }

  return deck.audio.split("/").pop();
}

// --------------------------------------------------
// MAIN
// --------------------------------------------------

const deckNameArg = process.argv[2];

if (!deckNameArg) {
  console.error("❌ Usage: npm run pull abc");
  process.exit(1);
}

ensureStageClean();

const deckFile = deckNameArg + ".json";

const archiveDeckPath = path.join(archiveDeckDir, deckFile);
const stageDeckPath = path.join(stageDeckDir, deckFile);

if (!fs.existsSync(archiveDeckPath)) {
  console.error("❌ Deck not found in archive:", deckFile);
  process.exit(1);
}

// --------------------------------------------------
// 3️⃣ Move deck
// --------------------------------------------------

fs.renameSync(archiveDeckPath, stageDeckPath);
console.log("📦 Deck moved:", deckFile);

// --------------------------------------------------
// 4️⃣ Parse deck
// --------------------------------------------------

const deck = JSON.parse(fs.readFileSync(stageDeckPath, "utf-8"));

// --------------------------------------------------
// 5️⃣ Move audio (if defined)
// --------------------------------------------------

const audioFile = getAudioFilename(deck);

if (audioFile) {
  const archiveAudioPath = path.join(archiveAudioDir, audioFile);
  const stageAudioPath = path.join(stageAudioDir, audioFile);

  if (fs.existsSync(archiveAudioPath)) {
    fs.renameSync(archiveAudioPath, stageAudioPath);
    console.log("🎧 Audio moved:", audioFile);
  } else {
    console.warn("⚠ Audio referenced but not found:", audioFile);
  }
} else {
  console.log("ℹ No audio defined in deck.");
}

// --------------------------------------------------
// 6️⃣ Copy images
// --------------------------------------------------

const images = getDeckImages(deck);

for (const img of images) {
  const archiveImgPath = path.join(archiveImageDir, img);
  const stageImgPath = path.join(stageImageDir, img);

  if (fs.existsSync(archiveImgPath)) {
    fs.copyFileSync(archiveImgPath, stageImgPath);
    console.log("🖼 Image copied:", img);
  } else {
    console.warn("⚠ Image referenced but not found:", img);
  }
}

console.log("🚀 Pull complete.");