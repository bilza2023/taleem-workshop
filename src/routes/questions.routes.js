
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("questions/index");
});

export default router;