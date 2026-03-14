import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const router = express.Router();

/* recreate __dirname for ES modules */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* content folders */
const decksDir = path.join(__dirname, "../../public/content/decks");
const imagesDir = path.join(__dirname, "../../public/content/images");
const audioDir = path.join(__dirname, "../../public/content/audio");

/* ensure folders exist */
fs.mkdirSync(decksDir, { recursive: true });
fs.mkdirSync(imagesDir, { recursive: true });
fs.mkdirSync(audioDir, { recursive: true });

/* multer temp upload */
const upload = multer({ dest: "uploads/" });

/* allowed extensions */
const deckExt = [".json"];
const audioExt = [".mp3", ".opus"];
const imageExt = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"];

/* extension helper */
function hasValidExt(filename, allowed) {
  const ext = path.extname(filename).toLowerCase();
  return allowed.includes(ext);
}


/* PAGE */

router.get("/", (req, res) => {
  res.render("create/index", { query: req.query });
});


/* CREATE DECK */

router.post("/deck", (req, res) => {
  try {
    const slug = req.body.slug?.trim();

    if (!slug) {
      return res.redirect("/create?msg=Deck slug missing");
    }

    const file = path.join(decksDir, `${slug}.json`);

    if (fs.existsSync(file)) {
      return res.redirect("/create?msg=Deck already exists");
    }

    fs.writeFileSync(file, JSON.stringify({ deck: [] }, null, 2));

    res.redirect("/create?msg=Deck created successfully");

  } catch (err) {
    console.error(err);
    res.redirect("/create?msg=Error creating deck");
  }
});


/* UPLOAD DECK */

router.post("/upload-deck", upload.single("deck"), (req, res) => {
  try {

    if (!req.file) {
      return res.redirect("/create?msg=No deck file uploaded");
    }

    if (!hasValidExt(req.file.originalname, deckExt)) {
      fs.unlinkSync(req.file.path);
      return res.redirect("/create?msg=Deck must be .json");
    }

    const target = path.join(decksDir, req.file.originalname);

    fs.renameSync(req.file.path, target);

    res.redirect("/create?msg=Deck uploaded successfully");

  } catch (err) {
    console.error(err);
    res.redirect("/create?msg=Error uploading deck");
  }
});


/* DELETE DECK */

router.post("/delete-deck", (req, res) => {
  try {

    const slug = req.body.slug;
    const file = path.join(decksDir, `${slug}.json`);

    if (!fs.existsSync(file)) {
      return res.redirect("/create?msg=Deck not found");
    }

    fs.unlinkSync(file);

    res.redirect("/create?msg=Deck deleted");

  } catch (err) {
    console.error(err);
    res.redirect("/create?msg=Error deleting deck");
  }
});


/* UPLOAD IMAGE */

router.post("/upload-image", upload.single("image"), (req, res) => {
  try {

    if (!req.file) {
      return res.redirect("/create?msg=No image uploaded");
    }

    if (!hasValidExt(req.file.originalname, imageExt)) {
      fs.unlinkSync(req.file.path);
      return res.redirect("/create?msg=Invalid image format");
    }

    const target = path.join(imagesDir, req.file.originalname);

    fs.renameSync(req.file.path, target);

    res.redirect("/create?msg=Image uploaded");

  } catch (err) {
    console.error(err);
    res.redirect("/create?msg=Error uploading image");
  }
});


/* DELETE IMAGE */

router.post("/delete-image", (req, res) => {
  try {

    const file = path.join(imagesDir, req.body.filename);

    if (!fs.existsSync(file)) {
      return res.redirect("/create?msg=Image not found");
    }

    fs.unlinkSync(file);

    res.redirect("/create?msg=Image deleted");

  } catch (err) {
    console.error(err);
    res.redirect("/create?msg=Error deleting image");
  }
});


/* UPLOAD AUDIO */

router.post("/upload-audio", upload.single("audio"), (req, res) => {
  try {

    if (!req.file) {
      return res.redirect("/create?msg=No audio uploaded");
    }

    if (!hasValidExt(req.file.originalname, audioExt)) {
      fs.unlinkSync(req.file.path);
      return res.redirect("/create?msg=Audio must be .mp3 or .opus");
    }

    const target = path.join(audioDir, req.file.originalname);

    fs.renameSync(req.file.path, target);

    res.redirect("/create?msg=Audio uploaded");

  } catch (err) {
    console.error(err);
    res.redirect("/create?msg=Error uploading audio");
  }
});


/* DELETE AUDIO */

router.post("/delete-audio", (req, res) => {
  try {

    const file = path.join(audioDir, req.body.filename);

    if (!fs.existsSync(file)) {
      return res.redirect("/create?msg=Audio not found");
    }

    fs.unlinkSync(file);

    res.redirect("/create?msg=Audio deleted");

  } catch (err) {
    console.error(err);
    res.redirect("/create?msg=Error deleting audio");
  }
});


export default router;