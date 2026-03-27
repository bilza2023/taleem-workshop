
const b = new TaleemBuilder({ mode: "desktop" });
b.addDetails({ name: "Number Families — Big Picture" });
b.setBackgroundImage("rational-vs-irrational-numbers.png");
b.setBackgroundColor("#0f172a");
b.setBackgroundOpacity(0.07);

// 🟦 1. Title
b.titleAndSubtitle(5, [
    { name: "title", content: "Rational vs Irrational Numbers", showAt: 0 },
    { name: "subtitle", content: "Numbers with pattern vs numbers without pattern", showAt: 1 }
  ]);

// 🟦 2. Intuition (Pattern vs No Pattern)
b.imageWithTitle(10, [
    { name: "title", content: "Some Numbers Follow Patterns, Some Do Not", showAt: 5 },
    { name: "image", content: "rational-vs-irrational-numbers.png", showAt: 6 },
  ]);
  
  
// 🟦 3. Rational Numbers (Definition)
b.eq(20, [
    {
      name: "line",
      type: "math",
      content: "Rational Number = p / q",
      showAt: 10,
      spItems: [
        { type: "spText", content: "p and q are integers" },
        { type: "spText", content: "q cannot be zero" },
        { type: "spText", content: "Example: 1/2, 3/4, 5 = 5/1" }
      ]
    },
    {
      name: "line",
      type: "math",
      content: "Decimal Form",
      showAt: 13,
      spItems: [
        { type: "spText", content: "Decimal either terminates" },
        { type: "spText", content: "Or repeats in a pattern" },
        { type: "spText", content: "Example: 0.5, 0.333..." }
      ]
    },
    {
      name: "line",
      type: "math",
      content: "Key Idea",
      showAt: 16,
      spItems: [
        { type: "spText", content: "Can always be written as a fraction" },
        { type: "spText", content: "Always shows a clear pattern" }
      ]
    }
  ]);
  
  
const deck = b.build();

return deck;
