
import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const router = express.Router();

/* recreate __dirname */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* folders */
const imagesDir = path.join(__dirname, "../../public/content/images");
const imagesJson = path.join(imagesDir, "images.json");

fs.mkdirSync(imagesDir, { recursive: true });

/* multer */
const upload = multer({ dest: "uploads/" });

/* allowed image extensions */
const imageExt = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"];

/* extension helper */
function hasValidExt(filename) {
  const ext = path.extname(filename).toLowerCase();
  return imageExt.includes(ext);
}

/* read json helper */
function readImages() {
  if (!fs.existsSync(imagesJson)) return [];
  return JSON.parse(fs.readFileSync(imagesJson, "utf8"));
}

/* write json helper */
function writeImages(data) {
  fs.writeFileSync(imagesJson, JSON.stringify(data, null, 2));
}


/* PAGE */

router.get("/", (req, res) => {
  res.render("images/index", { query: req.query });
});


/* UPLOAD IMAGE WITH DATA */

router.post("/upload", upload.single("image"), (req, res) => {
  try {

    if (!req.file) {
      return res.redirect("/images?msg=No image uploaded");
    }

    if (!hasValidExt(req.file.originalname)) {
      fs.unlinkSync(req.file.path);
      return res.redirect("/images?msg=Invalid image format");
    }

    const filename = req.file.originalname;
    const target = path.join(imagesDir, filename);

    if (fs.existsSync(target)) {
      fs.unlinkSync(req.file.path);
      return res.redirect("/images?msg=ERROR filename already exists");
    }

    fs.renameSync(req.file.path, target);

    const prompt = req.body.prompt || "";
    const tags = (req.body.tags || "")
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);

    const images = readImages();

    images.push({
      filename,
      prompt,
      tags
    });

    writeImages(images);

    res.redirect("/images?msg=Image uploaded");

  } catch (err) {
    console.error(err);
    res.redirect("/images?msg=Upload error");
  }
});


/* DELETE IMAGE */

router.post("/delete", (req, res) => {
  try {

    const filename = req.body.filename?.trim();
    if (!filename) {
      return res.redirect("/images?msg=Filename missing");
    }

    const file = path.join(imagesDir, filename);

    if (!fs.existsSync(file)) {
      return res.redirect("/images?msg=Image not found");
    }

    fs.unlinkSync(file);

    const images = readImages();
    const updated = images.filter(img => img.filename !== filename);

    writeImages(updated);

    res.redirect("/images?msg=Image deleted");

  } catch (err) {
    console.error(err);
    res.redirect("/images?msg=Delete error");
  }
});


/* DOWNLOAD JSON */

router.get("/download", (req, res) => {
  if (!fs.existsSync(imagesJson)) {
    return res.redirect("/images?msg=No images.json yet");
  }

  res.download(imagesJson);
});

export default router;