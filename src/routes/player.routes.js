import express from "express";

const router = express.Router();

router.get("/", (req, res) => {

  const deck = req.query.deck || null;
  const source = req.query.source || "workspace"; // ✅ default

  res.render("player/index", {
    deck,
    source
  });

});

export default router;