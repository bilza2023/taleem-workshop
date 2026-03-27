

const b = new TaleemBuilder({ mode: "desktop" });

b.addDetails({ name: "Demo Builder Deck" });

b.setBackgroundColor("#0f172a");
b.setBackgroundOpacity(0.15);

b.titleAndSubtitle(10, [
  { name: "title", content: "This is the first Demo Deck", showAt: 0 },
  { name: "subtitle", content: "We are using Builder", showAt: 1 }
]);

b.bulletList(15, [
  { name: "bullet", content: "Builder scripts are very easy to write", showAt: 10 },
  { name: "bullet", content: "Bullet no 2 Edited...!!!", showAt: 11 },
  { name: "bullet", content: "Structure remains consistent", showAt: 12 }
]);

// b.imageLeftBulletsRight(20, [
//   { name: "image", content: "image.png", showAt: 15 },
//   { name: "bullet", content: "Images reinforce concepts", showAt: 16 },
//   { name: "bullet", content: "Bullets guide explanation", showAt: 17 }
// ]);

// b.quoteSlide(25, [
//   { name: "quote", content: "Clarity makes learning easier.", showAt: 20 },
//   { name: "author", content: "— Taleem", showAt: 21 }
// ]);

const deck = b.build();

return deck;