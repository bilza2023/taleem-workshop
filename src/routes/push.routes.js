
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

export default router;