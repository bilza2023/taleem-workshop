
import {
  createTaleemPlayer,
  resolveAssetPaths,
  resolveBackground,
  getDeckEndTime,
  createSilentTimer,
  startLoop
} from "./player/taleem-player-app.js";

const openBtn = document.getElementById("openBtn");
const fileInput = document.getElementById("fileInput");

/* ===============================
   🔵 LOAD FROM URL (NEW)
================================ */

const params = new URLSearchParams(window.location.search);
const deckSlug = params.get("deck");

if (deckSlug) {
  loadDeckFromServer(deckSlug);
}

/* ===============================
   🔵 FILE LOAD (EXISTING)
================================ */

openBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  let parsed;

  try {
    const text = await file.text();
    parsed = JSON.parse(text);
  } catch {
    alert("Invalid JSON file.");
    return;
  }

  let deckObject;

  if (Array.isArray(parsed)) {
    deckObject = {
      version: "deck-v1",
      name: file.name.replace(".json", ""),
      background: {},
      deck: parsed
    };
  } else if (parsed.deck && Array.isArray(parsed.deck)) {
    deckObject = parsed;
  } else {
    alert("Invalid deck format.");
    return;
  }

  startPlayer(deckObject);
});

/* ===============================
   🔵 LOAD DECK FROM SERVER
================================ */

async function loadDeckFromServer(slug) {

  try {

    const res = await fetch(`/content/decks/${slug}.json`);

    if (!res.ok) {
      alert("Deck not found.");
      return;
    }

    const parsed = await res.json();

    let deckObject;

    if (Array.isArray(parsed)) {
      deckObject = {
        version: "deck-v1",
        name: slug,
        background: {},
        deck: parsed
      };
    } else if (parsed.deck && Array.isArray(parsed.deck)) {
      deckObject = parsed;
    } else {
      alert("Invalid deck format.");
      return;
    }

    startPlayer(deckObject);

  } catch (err) {
    alert("Failed to load deck.");
    console.error(err);
  }
}

/* ===============================
   🔵 ASSET PATH HANDLING
================================ */

function obtainAssetsPath() {
  const stored = localStorage.getItem("taleem-user-content-url");

  if (stored && stored.trim() !== "") {
    return stored.trim().replace(/\/$/, "");
  }

  return "";
}

function patchDeck(deckObject) {

  const CONTENT_BASE = obtainAssetsPath();

  const basePath = CONTENT_BASE
    ? `${CONTENT_BASE}/images/`
    : "/content/images/";

  resolveAssetPaths(deckObject, basePath);
  resolveBackground(deckObject, basePath);
}

/* ===============================
   🔵 PLAYER START
================================ */

function startPlayer(deckObject) {

  document.querySelector(".load-screen").style.display = "none";

  document.getElementById("app").style.display = "block";
  document.querySelector(".nav-test").style.display = "flex";

  patchDeck(deckObject);

  const timer = createSilentTimer();

  const player = createTaleemPlayer({
    mount: "#app",
    deck: deckObject
  });

  const duration = getDeckEndTime(deckObject);

  startLoop({
    player,
    timer,
    duration,
    ui: {
      playBtn: document.getElementById("play-btn"),
      pauseBtn: document.getElementById("pause-btn"),
      stopBtn: document.getElementById("stop-btn"),
      scrub: document.getElementById("scrub"),
      timeEl: document.getElementById("time")
    }
  });
}
