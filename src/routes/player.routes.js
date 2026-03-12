import express from "express";

const router = express.Router();

router.get("/", (req, res) => {

  const deck = req.query.deck || null;

  res.render("player/index", {
    deck
  });

});

export default router;