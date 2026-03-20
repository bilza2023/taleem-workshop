

const b = new TaleemBuilder({ mode: "desktop" });

b.addDetails({ name: "Demo Builder Deck" });

b.setBackgroundColor("#0f172a");
b.setBackgroundOpacity(0.15);

b.titleAndSubtitle(10, [
    { name: "title", content: "The Number Family", showAt: 0 },
    { name: "subtitle", content: "Understanding how numbers are grouped", showAt: 1 }
  ]);

  


const deck = b.build();

return deck;