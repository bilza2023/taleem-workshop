


const b = new TaleemBuilder({ mode: "desktop" });

b.addDetails({ name: "Number Families — Big Picture" });
b.setBackgroundImage("number-families-2.jpg");
b.setBackgroundColor("#0f172a");
b.setBackgroundOpacity(0.07);

// 🟦 1. Title
b.titleAndSubtitle(5, [
  { name: "title", content: "Number Families", showAt: 0 },
  { name: "subtitle", content: "How Number Families Evolved", showAt: 1 }
]);

b.eq(40, [
  {
    type: "heading",
    content: "Why Number Systems Expanded",
    showAt: 5
  },
  {
    type: "spImage",
    content: "number-families.jpeg"
  },

  // 1️⃣ Simple start (text → image → text)
  {
    type: "text",
    content: "Counting works for basic quantities",
    showAt: 7
  },
  {
    type: "spImage",
    content: "number-families.jpeg"
  },
  {
    type: "spText",
    content: "Natural numbers are used for counting objects."
  },

  // 2️⃣ Caption before + after (balanced)
  {
    type: "text",
    content: "Zero was introduced to represent nothing",
    showAt: 11
  },
  {
    type: "spText",
    content: "A missing quantity needed a clear symbol."
  },
  {
    type: "spImage",
    content: "number-families.jpeg"
  },
  {
    type: "spText",
    content: "This completed the whole number system."
  },

  // 3️⃣ Slight emphasis (2 captions)
  {
    type: "text",
    content: "Negative numbers solved values below zero",
    showAt: 15
  },
  {
    type: "spText",
    content: "Real life includes loss and decrease."
  },
  {
    type: "spImage",
    content: "number-families-2.jpg"
  },
  {
    type: "spText",
    content: "Integers extend numbers in both directions."
  },

  // 4️⃣ Clean (text → image)
  {
    type: "text",
    content: "Fractions allowed representation of parts",
    showAt: 19
  },
  {
    type: "spImage",
    content: "number-families-2.jpg"
  },
  {
    type: "spText",
    content: "Rational numbers include fractions and decimals."
  },

  // 5️⃣ Minimal + punchy
  {
    type: "text",
    content: "Some values could not be written as fractions",
    showAt: 23
  },
  {
    type: "spText",
    content: "Not all numbers follow fraction rules."
  },
  {
    type: "spImage",
    content: "number-families-2.jpg"
  },

  // 6️⃣ Final closure (image → text)
  {
    type: "text",
    content: "Irrational numbers completed the system",
    showAt: 27
  },
  {
    type: "spImage",
    content: "number-families-2.jpg"
  },
  {
    type: "spText",
    content: "Together they form the complete real number system."
  }
]);
b.bulletList(50, [
  { name: "bullet", content: "Numbers evolved as needs grew", showAt: 40 },
  { name: "bullet", content: "Natural → counting", showAt: 41 },
  { name: "bullet", content: "Whole → includes zero", showAt: 42 },
  { name: "bullet", content: "Integers → include negatives", showAt: 43 },
  { name: "bullet", content: "Rational → fractions & decimals", showAt: 44 },
  { name: "bullet", content: "Irrational → not fractions", showAt: 45 },
  { name: "bullet", content: "Real → rational + irrational", showAt: 46 },
  { name: "bullet", content: "Each family solves a limitation", showAt: 47 }
]);

const deck = b.build();

return deck;
