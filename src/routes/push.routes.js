
import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.get("/push-to-timings", (req, res) => {
  const { deck } = req.query;

  if (!deck) {
    return res.send("❌ Missing deck slug");
  }

  const slidesPath = path.join(
    process.cwd(),
    "public/workspace/slides",
    `${deck}.json`
  );

  const timingsPath = path.join(
    process.cwd(),
    "public/workspace/timings",
    `${deck}.json`
  );

  // check source exists
  if (!fs.existsSync(slidesPath)) {
    return res.send("❌ Deck not found in slides");
  }

  try {
    // move file
    fs.renameSync(slidesPath, timingsPath);

    // redirect to timings stage
    return res.redirect("/?stage=timings");

  } catch (err) {
    return res.send("❌ Push failed: " + err.message);
  }
});
router.get("/push-to-archive", (req, res) => {
  const { deck } = req.query;

  if (!deck) {
    return res.send("❌ Missing deck slug");
  }

  const timingsPath = path.join(
    process.cwd(),
    "public/workspace/timings",
    `${deck}.json`
  );

  const archivePath = path.join(
    process.cwd(),
    "public/workspace/archive",
    `${deck}.json`
  );

  // check source exists (same pattern as above route)
  if (!fs.existsSync(timingsPath)) {
    return res.send("❌ Deck not found in timings");
  }

  try {
    // ✅ MOVE file (NOT copy)
    fs.renameSync(timingsPath, archivePath);

    return res.redirect("/?stage=archive");

  } catch (err) {
    return res.send("❌ Push to archive failed: " + err.message);
  }
});


export default router;