import express from "express";

const router = express.Router();

router.get("/", (req, res) => {

  const deck = {
    deck: [
      {
        type: "table",
        data: [
          ["A", "B"],
          ["C", "D"]
        ]
      }
    ]
  };

  res.render("editor-ui/index", {
    deck
  });

});

export default router;