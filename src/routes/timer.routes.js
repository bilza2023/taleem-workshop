import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decksDir = path.join(__dirname, "../../public/workspace/timings");

/* PAGE */

router.get("/", (req, res) => {
  res.render("timings/index");
});


/* SAVE UPDATED TIMINGS */

router.post("/save", (req, res) => {

  const { slug, content } = req.body;

  if(!slug){
    return res.json({ message: "Slug missing." });
  }

  const filePath = path.join(decksDir, `${slug}.json`);

  try{

    JSON.parse(content);

  }catch(err){

    return res.json({ message: "Invalid JSON." });

  }

  fs.writeFileSync(filePath, content);

  res.json({ message: "Timings saved." });

});


export default router;
