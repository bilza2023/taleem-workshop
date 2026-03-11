
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("player/index");
});

export default router;