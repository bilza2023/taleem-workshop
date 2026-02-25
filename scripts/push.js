// push.js
import fs from "fs";
import path from "path";

const ROOT = "/home/bilal-tariq/00--TALEEM===>/taleem-workshop";
const ARCHIVE = path.join(ROOT, "archive");
const STAGE = path.join(ROOT, "stage");

const stageDeckDir = path.join(STAGE, "decks");
const stageAudioDir = path.join(STAGE, "audio");
const stageImageDir = path.join(STAGE, "images");

const archiveDeckDir = path.join(ARCHIVE, "decks");
const archiveAudioDir = path.join(ARCHIVE, "audio");
const archiveImageDir = path.join(ARCHIVE, "images");

// 1️⃣ Move decks (.json only)
const stageDecks = fs.readdirSync(stageDeckDir).filter(f =>
  f.endsWith(".json")
);

for (const deckFile of stageDecks) {
  const stagePath = path.join(stageDeckDir, deckFile);
  const archivePath = path.join(archiveDeckDir, deckFile);

  fs.renameSync(stagePath, archivePath);
  console.log("📦 Deck moved:", deckFile);
}

// 2️⃣ Move audio (.mp3 and .opus only)
const stageAudioFiles = fs.readdirSync(stageAudioDir).filter(f =>
  f.endsWith(".mp3") || f.endsWith(".opus")
);

for (const audioFile of stageAudioFiles) {
  const stagePath = path.join(stageAudioDir, audioFile);
  const archivePath = path.join(archiveAudioDir, audioFile);

  fs.renameSync(stagePath, archivePath);
  console.log("🎧 Audio moved:", audioFile);
}

// 3️⃣ Copy images (no overwrite)
const stageImages = fs.readdirSync(stageImageDir);

for (const img of stageImages) {
  const stagePath = path.join(stageImageDir, img);
  const archivePath = path.join(archiveImageDir, img);

  if (!fs.existsSync(archivePath)) {
    fs.copyFileSync(stagePath, archivePath);
    console.log("🖼 Image copied:", img);
  } else {
    console.log("⏭ Skipped existing image:", img);
  }
}

// 4️⃣ Clear stage
function clearFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    fs.unlinkSync(path.join(folderPath, file));
  }
}

clearFolder(stageDeckDir);
clearFolder(stageAudioDir);
clearFolder(stageImageDir);

console.log("🧹 Stage cleared.");
console.log("🚀 Push complete.");